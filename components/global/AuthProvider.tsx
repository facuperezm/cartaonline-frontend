import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { type TokenPayload } from "@/schemas/AuthSchema";
export interface IAuthContext {
  user: TokenPayload | null;
  setUser: React.Dispatch<React.SetStateAction<TokenPayload | null>>;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<TokenPayload | null>(null);
  const [validating, setValidating] = useState(true);

  const router = useRouter();

  const PROTECTED_ROUTES = ["/"];

  const validateRoutes = (user: TokenPayload | null) => {
    if (!user && PROTECTED_ROUTES.includes(router.pathname)) {
      void router.push("/login");
    }
    if (user && router.pathname === "/login") {
      void router.push("/");
    }
    setTimeout(() => {
      setValidating(false);
    }, 50);
  };

  useEffect(() => {
    const userFromLS = localStorage.getItem("user");
    const userForState = userFromLS ? JSON.parse(userFromLS) : null;
    setUser(userForState);
    validateRoutes(userForState);
  }, []);

  if (validating) {
    return <h1>Loading...</h1>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
