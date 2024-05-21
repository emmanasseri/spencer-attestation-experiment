import React, { useState, useEffect } from "react";
import { Box, Button, Text, VStack, useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import { createAttestation } from "../EAS/easService";

const targetNetworkId = "80002";

const AttestationForm = () => {
  const [userAddress, setUserAddress] = useState("");
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
  const [locationName, setLocationName] = useState("Sandy Ground");
  const toast = useToast();

  useEffect(() => {
    checkMetaMask();
  }, []);

  const checkMetaMask = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();

        if (network.chainId.toString() === targetNetworkId) {
          setIsCorrectNetwork(true);
          const [account] = await provider.send("eth_requestAccounts", []);
          setUserAddress(account);
        } else {
          setIsCorrectNetwork(false);
        }
      } catch (error) {
        console.error(error);
        alert(
          "An error occurred. Please make sure MetaMask is installed and you are logged in."
        );
      }
    } else {
      alert(
        "MetaMask is not installed. Please install MetaMask to interact with the blockchain."
      );
    }
  };

  const switchNetwork = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x" + parseInt(targetNetworkId).toString(16),
              chainName: "Polygon Amoy Testnet",
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
              },
              rpcUrls: ["https://rpc-amoy.polygon.technology/"],
              blockExplorerUrls: ["https://www.oklink.com/amoy"],
            },
          ],
        });
        checkMetaMask();
      } catch (switchError) {
        console.error(switchError);
        alert("Failed to switch network. Please try manually in MetaMask.");
      }
    }
  };

  const handleAttest = async () => {
    if (!isCorrectNetwork) {
      toast({
        title: "Wrong network",
        description: "Please switch to the Polygon Amoy Testnet.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const tx = await createAttestation(userAddress, locationName);
      toast({
        title: "Attestation created.",
        description: `Transaction hash: ${tx.hash}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
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
    <Box p={5} width="75%" mx="auto" textAlign="center" mt="15px" mb="15px">
      <Text fontSize={"xl"} mb={4} color="black">
        This form allows you to attest that the collectively owned wallet owns
        the location "Sandy Ground". To do so, please ensure you are connected
        to the Polygon Amoy Testnet. If not, you can switch networks using the
        button below.
      </Text>
      <VStack mt={4}>
        <Button colorScheme="teal" onClick={handleAttest} mb={4}>
          Attest Ownership
        </Button>
        <Button colorScheme="blue" onClick={switchNetwork}>
          Switch Network
        </Button>
      </VStack>
    </Box>
  );
};

export default AttestationForm;
