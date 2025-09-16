import { createContext, useContext, type ReactNode } from "react";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";

const AuthContext = createContext<ReturnType<typeof useFirebaseAuth> | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useFirebaseAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
