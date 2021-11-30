import React, { useState } from "react";
import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import { useGlobalState } from "context/globalState";
import { formatPrice } from "utils/formatPrice";
import BasketItem from "./BasketItem";

function Basket() {
  const [state, setState] = useGlobalState();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  function calculateTotalPrice() {
    return Object.keys(state.basket).reduce(
      (acc, key) => acc + state.prices[key] * state.basket[key],
      0
    );
  }

  function removeAllFromBasket() {
    const emptyBasket: { [key: string]: number } = {};
    Object.keys(state.basket).forEach((key: string) => (emptyBasket[key] = 0));

    const emptyTUL: { [key: string]: { current: number; max: number } } = {};
    Object.keys(state.TUL).forEach(
      (key: string) => (emptyTUL[key] = { ...state.TUL[key], current: 0 })
    );

    setState({ ...state, basket: emptyBasket, TUL: emptyTUL });
  }

  React.useEffect(() => {
    if (state.basket) setTotalPrice(calculateTotalPrice());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.basket]);

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
        Total: {formatPrice(totalPrice, "GBP")}
      </Heading>
      <Stack>
        {state.basket &&
          Object.keys(state.basket).map((key) => {
            const amount = state.basket[key];
            return amount > 0 ? (
              <BasketItem key={key} name={key} amount={amount} />
            ) : null;
          })}
      </Stack>
      {!!totalPrice && (
        <Button
          display="block"
          mx="auto"
          mt={8}
          colorScheme="red"
          size="sm"
          _hover={{
            boxShadow: "rgb(0 0 0 / 20%) 2px 2px 6px 1px",
          }}
          onClick={removeAllFromBasket}
        >
          Remove all
        </Button>
      )}
    </Box>
  );
}

export default Basket;
