import React from "react";

export type ProductType = {
  name: string;
  price: number;
  nutrients: [
    {
      id: string;
      amount: number;
    }
  ];
};

export const initialState = {
  products: [],
  tolerableUpperLimits: [],
  currency: "",
  basket: [],
  totalPrice: 0,
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "POPULATE_STORE": {
      const { products, tolerableUpperLimits, currency } = action.payload;

      const parsedTolerableUpperLimits = tolerableUpperLimits.reduce(
        (obj: any, arrItem: any) => ({
          ...obj,
          [arrItem.id]: { max: arrItem.amount, current: 0 },
        }),
        {}
      );

      return {
        ...state,
        products,
        tolerableUpperLimits: parsedTolerableUpperLimits,
        currency,
      };
    }
    case "ADD_ITEM": {
      const { name, price, nutrients } = action.payload;

      const hasForbiddenElement = nutrients
        .map((item: any) => {
          return (
            state.tolerableUpperLimits[item.id].current + item.amount <=
            state.tolerableUpperLimits[item.id].max
          );
        })
        .some((item: boolean) => item === false);

      let newTolerableUpperLimits = { ...state.tolerableUpperLimits };
      const newBasket = [...state.basket];
      let newTotalPrice = state.totalPrice;

      if (!hasForbiddenElement) {
        nutrients.forEach((nutrient: any) => {
          newTolerableUpperLimits = {
            ...state.tolerableUpperLimits,
            [nutrient.id]: {
              ...state.tolerableUpperLimits[nutrient.id],
              current:
                state.tolerableUpperLimits[nutrient.id].current +
                nutrient.amount,
            },
          };
        });

        const index = newBasket.findIndex((item: any) => item.name === name);
        if (index === -1) {
          newBasket.push({
            name,
            price,
            amount: 1,
            nutrients,
          });
        } else {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount + 1,
          };
        }

        newTotalPrice = state.totalPrice + price;
      }

      return {
        ...state,
        tolerableUpperLimits: newTolerableUpperLimits,
        basket: newBasket,
        totalPrice: newTotalPrice,
      };
    }

    case "REMOVE_ITEM": {
      const { name, price, amount, nutrients } = action.payload;

      const newBasket = state.basket.filter((item: any) => item.name !== name);

      const newTolerableUpperLimits = state.tolerableUpperLimits;
      nutrients.forEach((item: any) => {
        newTolerableUpperLimits[item.id].current = 0;
      });

      return {
        ...state,
        basket: newBasket,
        totalPrice: state.totalPrice - price * amount,
        tolerableUpperLimits: newTolerableUpperLimits,
      };
    }

    case "REMOVE_ALL_ITEMS": {
      return {
        ...state,
        basket: [],
        tolerableUpperLimits: Object.keys(state.tolerableUpperLimits).reduce(
          (obj, key) => {
            return {
              ...obj,
              [key]: { ...state.tolerableUpperLimits[key], current: 0 },
            };
          },
          {}
        ),
        totalPrice: 0,
      };
    }
    default:
      return state;
  }
};

export const Context = React.createContext<any>({});
