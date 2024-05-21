import { ethers } from "ethers";
import { EAS } from "@ethereum-attestation-service/eas-sdk";

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
    const EASContractAddress = "<EAS_CONTRACT_ADDRESS>"; // Replace with actual EAS contract address
    eas = new EAS(EASContractAddress, { signer });

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

    const signer = await eas.signer;
    const timestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds

    const schemaId = "<YOUR_SCHEMA_ID>"; // Replace with your schema ID

    const data = {
      schemaId,
      recipient: walletAddress,
      data: ethers.utils.defaultAbiCoder.encode(
        ["address", "string", "uint256"],
        [walletAddress, locationName, timestamp]
      ),
    };

    // Create the attestation
    const tx = await eas.createAttestation(data, {
      from: await signer.getAddress(),
    });
    await tx.wait();

    return tx;
  } catch (error) {
    console.error("Error creating attestation:", error);
    throw error;
  }
};
