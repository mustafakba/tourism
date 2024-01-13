"use client";

import { Provider } from "react-redux";
import { store } from "@/provider/redux/store";
import React from "react"; // React'i import edin

// TypeScript için children'ın tipini belirtin
interface ReduxProviderProps {
  children: React.ReactNode;
}

const ReduxProvider: React.FunctionComponent<ReduxProviderProps> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
