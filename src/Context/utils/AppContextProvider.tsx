import React, { ReactNode } from "react";
import { MovieProvider } from "../movie-context/MovieContext";
import { DetailProvider } from "../detail-context/DetailContext";
import { GlobalProvider } from "../GlobalState";

export const AppContextProviders = ({ children }: { children: ReactNode }) => {
  return (
    <GlobalProvider>
      <MovieProvider>
        <DetailProvider>{children}</DetailProvider>
      </MovieProvider>
    </GlobalProvider>
  );
};
