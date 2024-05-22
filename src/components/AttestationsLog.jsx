import React, { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { fetchRecentAttestations } from "../EAS/easService";

const AttestationsLog = () => {
  const [attestations, setAttestations] = useState([]);

  useEffect(() => {
    const getAttestations = async () => {
      try {
        const data = await fetchRecentAttestations();
        setAttestations(data);
      } catch (error) {
        console.error("Error fetching attestations:", error);
      }
    };

    getAttestations();
    const interval = setInterval(getAttestations, 60000); // Fetch every minute

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <Box
      p={5}
      width="75%"
      mx="auto"
      bg="rgba(0, 0, 0, 0.9)"
      borderRadius="md"
      textAlign="center"
      color="white"
      mt="15px"
      mb="15px"
    >
      <VStack spacing={4}>
        {attestations.length === 0 ? (
          <Text>No attestations yet.</Text>
        ) : (
          attestations.map((attestation, index) => (
            <Text key={index}>
              {attestation.attester} attesting that{" "}
              {attestation.data.walletAddress} owns{" "}
              {attestation.data.locationName}
            </Text>
          ))
        )}
      </VStack>
    </Box>
  );
};

export default AttestationsLog;
