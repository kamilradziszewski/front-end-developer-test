import React, { useReducer } from "react";
import { Context, initialState, reducer } from "./stores/store";
import Home from "pages/Home";

function App() {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ store, dispatch }}>
      <Home />
    </Context.Provider>
  );
}

export default App;
