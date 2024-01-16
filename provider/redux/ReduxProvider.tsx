"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import React from "react";

interface ReduxProviderProps {
  children: React.ReactNode;
}

const ReduxProvider: React.FunctionComponent<ReduxProviderProps> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
