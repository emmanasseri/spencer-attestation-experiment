import React from "react";
import { Box, Image, Text, Heading } from "@chakra-ui/react";

const Place = () => {
  return (
    <Box
      p={5}
      width="75%"
      mx="auto"
      bg="rgba(0, 0, 0, 0.5)"
      borderRadius="md"
      textAlign="center"
      mt="15px"
      mb="15px"
    >
      <Heading as="h1" mb={4} color="gray.200">
        Sandy Ground
      </Heading>
      <Image
        src="/images/sandy_ground.webp"
        alt="Map of Sandy Ground"
        mb={4}
        borderRadius="md"
        mx="auto"
      />
      <Text fontSize="lg" color="white">
        Sandy Ground is one of the nations founded by freed African Americans,
        established by a cadre of black oystermen from Snow Hill, Maryland, in
        the 1830s. Sandy Ground, established initially by free black farmers and
        joined later by oystermen and their families who came up from Maryland
        in the 1850’Many of these oystermen had regularly travelled to New York
        Harbor, selling their shellfish in Manhattan markets, then harvesting
        Staten Island oyster seed upon their return. Following a wave of
        repressive laws passed by white Marylanders in the 1820s, many of these
        Chesapeake oystermen packed their boats and moved northward, settling on
        a sandy hummock half way between Arthur Kill and Raritan Bay where land
        was relatively cheap. Sandy Ground reached its height of population and
        power during the late 19th century when over 150 African American
        families called the hamlet their home. Buoyed by a booming oyster
        industry, residents owned homes, property, boats, and businesses.
        Farmers worked what had been considered “useless” land into impressive
        hauls of eggplants, asparagus, sweet potatoes, and strawberries.
      </Text>
    </Box>
  );
};

export default Place;
