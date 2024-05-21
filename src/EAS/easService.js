import { ethers } from 'ethers';
import { EAS } from '@ethereum-attestation-service/eas-sdk';

// Initialize the EAS instance
const EASContractAddress = '<EAS_CONTRACT_ADDRESS>'; // Replace with actual EAS contract address
const provider = new ethers.providers.Web3Provider(window.ethereum);
const eas = new EAS(EASContractAddress, provider);

// Export the EAS instance
export default eas;


export const createAttestation = async (walletAddress, locationName) => {
    const signer = provider.getSigner();
    const timestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  
    const schemaId = '<YOUR_SCHEMA_ID>'; // Replace with your schema ID
  
    const data = {
      schemaId,
      recipient: walletAddress,
      data: ethers.utils.defaultAbiCoder.encode(
        ['address', 'string', 'uint256'],
        [walletAddress, locationName, timestamp]
      ),
    };
  
    // Create the attestation
    const tx = await eas.createAttestation(data, { from: await signer.getAddress() });
    await tx.wait();
  
    return tx;
  };
  
