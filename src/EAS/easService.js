import { ethers } from "ethers";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";

let eas;

export const initializeEAS = async () => {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []); // Request user to connect their MetaMask account

    // Get the signer from the provider
    const signer = await provider.getSigner();

    // Initialize EAS with the signer
    const EASContractAddress = process.env.NEXT_PUBLIC_EAS_CONTRACT_ADDRESS; // Ensure this is set in your environment variables
    eas = new EAS(EASContractAddress);
    await eas.connect(signer);

    return eas;
  } catch (error) {
    console.error("Error initializing EAS:", error);
    throw error;
  }
};

export const createAttestation = async (walletAddress, locationName) => {
  try {
    if (!eas) {
      throw new Error("EAS is not initialized");
    }

    const schemaId = process.env.NEXT_PUBLIC_SCHEMA_ID; // Ensure this is set in your environment variables
    const timestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds

    const schemaEncoder = new SchemaEncoder(
      "address walletAddress,string locationName,uint256 timestamp,uint256 uniqueId"
    );
    const encodedData = schemaEncoder.encodeData([
      { name: "walletAddress", value: walletAddress, type: "address" },
      { name: "locationName", value: locationName, type: "string" },
      { name: "timestamp", value: timestamp.toString(), type: "uint256" },
      { name: "uniqueId", value: "1", type: "uint256" }, // Unique ID, can be modified as needed
    ]);

    const tx = await eas.attest({
      schema: schemaId,
      data: {
        recipient: walletAddress,
        expirationTime: 0,
        revocable: true,
        data: encodedData,
      },
    });

    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    console.error("Error creating attestation:", error);
    throw error;
  }
};
