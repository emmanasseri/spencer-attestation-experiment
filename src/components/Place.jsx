import React from "react";
import { Box, Image, Text, Heading } from "@chakra-ui/react";

const Place = () => {
  return (
    <Box
      p={5}
      width="66%"
      mx="auto"
      bg="rgba(0, 0, 0, 0.4)"
      borderRadius="md"
      textAlign="center"
    >
      <Heading as="h1" mb={4} color="white">
        Place: Sandy Ground
      </Heading>
      <Image
        src="https://via.placeholder.com/600x400?text=Map+of+Sandy+Ground"
        alt="Map of Sandy Ground"
        mb={4}
        borderRadius="md"
        mx="auto"
      />
      <Text fontSize="lg" color="white">
        Sandy Ground is a beautiful location known for its serene beaches and
        vibrant community. It is a perfect place for relaxation and enjoying
        nature. The area is rich in history and offers a variety of recreational
        activities for visitors.
      </Text>
    </Box>
  );
};

export default Place;
