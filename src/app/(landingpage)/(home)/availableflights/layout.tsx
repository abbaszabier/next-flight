import React, { ReactNode } from "react";
import QCProvider from "./providers/queryProvider";
import FlightProviders from "./providers/flightProviders";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <QCProvider>
      <FlightProviders>{children}</FlightProviders>
    </QCProvider>
  );
};

export default Layout;
