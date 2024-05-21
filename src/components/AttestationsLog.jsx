import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

const AttestationsLog = () => {
  const attestations = [
    {
      attester: "0x1234567890abcdef1234567890abcdef12345678",
      owner: "0xabcdefabcdefabcdefabcdefabcdefabcdef12345678",
    },
    {
      attester: "0xabcdefabcdefabcdefabcdefabcdefabcdef12345678",
      owner: "0x1234567890abcdef1234567890abcdef12345678",
    },
    {
      attester: "0x1234567890abcdef1234567890abcdef12345678",
      owner: "0xabcdefabcdefabcdefabcdefabcdefabcdef12345678",
    },
    {
      attester: "0xabcdefabcdefabcdefabcdefabcdefabcdef12345678",
      owner: "0x1234567890abcdef1234567890abcdef12345678",
    },
    {
      attester: "0x1234567890abcdef1234567890abcdef12345678",
      owner: "0xabcdefabcdefabcdefabcdefabcdefabcdef12345678",
    },
    {
      attester: "0xabcdefabcdefabcdefabcdefabcdefabcdef12345678",
      owner: "0x1234567890abcdef1234567890abcdef12345678",
    },
  ];

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
        {attestations.map((attestation, index) => (
          <Text key={index}>
            {attestation.attester} attesting that {attestation.owner} owns Sandy
            Ground
          </Text>
        ))}
      </VStack>
    </Box>
  );
};

export default AttestationsLog;
