"use client"
import React, { createContext } from "react";
import store from "./store";

export const StoreContext = createContext();

export default function StoreProvider(props) {
  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
}
