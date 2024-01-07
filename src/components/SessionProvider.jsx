"use client";

import { createContext } from "react";

export const SessionContext = createContext();

const SessionProvider = ({ children, session }) => {
  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
