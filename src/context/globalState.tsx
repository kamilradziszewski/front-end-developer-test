import React, { createContext, useContext } from "react";

export const GlobalStateContext = createContext<any>(undefined);

export const GlobalStateProvider = (props: any) => {
  const [state, setState] = React.useState<any>({});

  return (
    <GlobalStateContext.Provider value={[state, setState]}>
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
