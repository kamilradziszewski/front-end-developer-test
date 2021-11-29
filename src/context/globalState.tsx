import React, { createContext, useContext } from "react";

export const GlobalStateContext = createContext<any>(undefined);

export const GlobalStateProvider = (props: any) => {
  const [value, setValue] = React.useState<any>({
    basket: [],
  });

  return (
    <GlobalStateContext.Provider value={[value, setValue]}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);

  if (context === undefined) {
    throw new Error("useUserContext was used outside of its Provider");
  }

  return context;
};
