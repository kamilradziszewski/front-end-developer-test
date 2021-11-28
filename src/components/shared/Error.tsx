import React from "react";
import { Alert, AlertIcon, AlertTitle, Center } from "@chakra-ui/react";

function Error() {
  return (
    <Center w="100vw" h="6rem">
      <Alert status="error" w="20rem">
        <AlertIcon />
        <AlertTitle>Error fetching data</AlertTitle>
      </Alert>
    </Center>
  );
}

export default Error;
