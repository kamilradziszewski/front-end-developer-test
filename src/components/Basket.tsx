import React, { useContext } from "react";
import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import { formatPrice } from "utils/formatPrice";
import BasketItem from "./BasketItem";
import { Context } from "stores/store";

function Basket() {
  const { store, dispatch } = useContext(Context);

  return (
    <Box
      bg="#c6c8e2"
      position="fixed"
      right="0"
      minH="100vh"
      w="20rem"
      h="100%"
      p={8}
      overflow="scroll"
    >
      <Heading as="h2" size="lg" mb={4}>
        Your basket
      </Heading>
      <Heading as="h3" size="md" mb={8}>
        {store.totalPrice !== undefined &&
          store.currency !== "" &&
          `Total: ${formatPrice(store.totalPrice, store.currency)}`}
      </Heading>
      <Stack>
        {store.basket.map((item: any) => (
          <BasketItem
            key={item.name}
            name={item.name}
            amount={item.amount}
            price={item.price}
            nutrients={item.nutrients}
          />
        ))}
      </Stack>
      {store.basket.length > 0 && (
        <Button
          display="block"
          mx="auto"
          mt={8}
          colorScheme="red"
          size="sm"
          _hover={{
            boxShadow: "rgb(0 0 0 / 20%) 2px 2px 6px 1px",
          }}
          onClick={() => dispatch({ type: "REMOVE_ALL_ITEMS" })}
        >
          Remove all
        </Button>
      )}
    </Box>
  );
}

export default Basket;
