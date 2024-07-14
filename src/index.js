import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import { ChakraProvider } from "@chakra-ui/react";

export const Context = createContext(null);

ReactDOM.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      device: new DeviceStore(),
    }}
  >
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Context.Provider>,
  document.getElementById("root")
);
