require("dotenv").config({ path: "../../.env.local" });
const { ethers } = require("ethers");
const { SchemaRegistry } = require("@ethereum-attestation-service/eas-sdk");

const deploySchema = async () => {
  try {
    const provider = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL
    );

    const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
    const wallet = new ethers.Wallet(privateKey, provider);

    const schemaRegistryContractAddress =
      "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0";
    const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);

    schemaRegistry.connect(wallet);

    const schema =
      "address walletAddress,string locationName,uint256 timestamp,uint256 uniqueId";
    const resolverAddress = "0x0000000000000000000000000000000000000000";
    const revocable = true;

    console.log("Schema:", schema);
    console.log("Resolver Address:", resolverAddress);
    console.log("Revocable:", revocable);

    const transaction = await schemaRegistry.register({
      schema,
      resolverAddress,
      revocable,
      gasLimit: 500000, // Manually set a high gas limit
    });

    const receipt = await transaction.wait();

    console.log("Transaction receipt:", receipt);

    // Log the entire receipt for debugging
    console.log("Full Transaction Receipt:", JSON.stringify(receipt, null, 2));

    // Access the schema ID from the receipt
    const schemaId = receipt.events[0]?.args?.schemaId;
    if (schemaId) {
      console.log("Schema deployed successfully");
      console.log("Schema ID:", schemaId);
    } else {
      throw new Error("Schema ID not found in the transaction receipt");
    }
  } catch (error) {
    console.error("Error deploying schema:", error);
    if (error.transaction) {
      console.error(
        "Transaction data:",
        JSON.stringify(error.transaction, null, 2)
      );
    }
    if (error.reason) {
      console.error("Error reason:", error.reason);
    }
  }
};

deploySchema();
