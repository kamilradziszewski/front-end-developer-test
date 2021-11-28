import React from "react";
import { Center, Spinner as ChakraSpinner } from "@chakra-ui/react";

function Spinner() {
  return (
    <Center w="100vw" h="100vh">
      <ChakraSpinner
        thickness="4px"
        speed="0.9s"
        emptyColor="yellow.100"
        color="yellow.300"
        size="xl"
      />
    </Center>
  );
}

export default Spinner;
