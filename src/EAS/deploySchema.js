import { ethers } from "ethers";
import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";

// Initialize the Ethereum provider (MetaMask)
const provider = new ethers.providers.Web3Provider(window.ethereum);

// Create a SchemaRegistry instance
const schemaRegistry = new SchemaRegistry(provider);

async function deploySchema() {
  // Get the signer from the provider
  const signer = provider.getSigner();

  // Define the schema
  const schema = {
    properties: [
      { name: "walletAddress", type: "address" },
      { name: "locationName", type: "string" },
      { name: "timestamp", type: "uint256" },
    ],
  };

  // Deploy the schema
  try {
    const tx = await schemaRegistry.createSchema(schema, {
      from: await signer.getAddress(),
    });
    const receipt = await tx.wait();

    console.log("Schema deployed successfully");
    console.log("Schema ID:", receipt.events[0].args.schemaId);
  } catch (error) {
    console.error("Error deploying schema:", error);
  }
}

// Request account access if needed
async function requestAccountAccess() {
  if (!window.ethereum) {
    console.error("MetaMask is not installed");
    return;
  }

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    deploySchema();
  } catch (error) {
    console.error("Error requesting account access:", error);
  }
}

// Start the process
requestAccountAccess();
