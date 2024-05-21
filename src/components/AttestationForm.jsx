import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { createAttestation } from "@/EAS/easService";

const AttestationForm = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [locationName, setLocationName] = useState("Sandy Ground");
  const toast = useToast();

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        toast({
          title: "Error connecting wallet.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "No wallet found.",
        description: "Please install MetaMask.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAttest = async () => {
    try {
      const tx = await createAttestation(walletAddress, locationName);
      toast({
        title: "Attestation created.",
        description: `Transaction hash: ${tx.hash}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error creating attestation.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      form
      <FormControl id="walletAddress">
        <FormLabel>Wallet Address</FormLabel>
        <Input value={walletAddress} isReadOnly />
        <Button mt={2} colorScheme="teal" onClick={handleConnectWallet}>
          Connect Wallet
        </Button>
      </FormControl>
      <FormControl id="locationName" mt={4}>
        <FormLabel>Location Name</FormLabel>
        <Input value={locationName} isReadOnly />
      </FormControl>
      <Button mt={4} colorScheme="teal" onClick={handleAttest}>
        Attest Ownership
      </Button>
    </Box>
  );
};

export default AttestationForm;
