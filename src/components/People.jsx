import React from "react";
import { Box, SimpleGrid, Tooltip, Icon } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

const People = () => {
  // Generate an array of 50 dummy wallet addresses
  const walletAddresses = Array.from(
    { length: 50 },
    (_, i) => `0x${(i + 1).toString(16).padStart(40, "0")}`
  );

  return (
    <Box p={10} width="80%" mv="10" mx="auto" align="center" justify="center">
      <SimpleGrid columns={[2, null, 5]} spacing={6}>
        {walletAddresses.map((address, index) => (
          <Tooltip
            key={index}
            label={address}
            aria-label={`Wallet address ${index + 1}`}
          >
            <Box>
              <Icon as={FaUser} boxSize={10} color="darkgreen" />
            </Box>
          </Tooltip>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default People;
