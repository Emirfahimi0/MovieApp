import React, { ReactNode } from "react";
import { MovieProvider } from "../movie-context/MovieContext";
import { DetailProvider } from "../detail-context/DetailContext";
import { GlobalProvider } from "../GlobalState";
import { WatchlistProvider } from "../watchlist-context/WatchlistContext";

export const AppContextProviders = ({ children }: { children: ReactNode }) => {
  return (
    <GlobalProvider>
      <MovieProvider>
        <DetailProvider>
          <WatchlistProvider>{children}</WatchlistProvider>
        </DetailProvider>
      </MovieProvider>
    </GlobalProvider>
  );
};
