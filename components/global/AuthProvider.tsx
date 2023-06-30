import { useRouter } from "next/router";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { TokenPayload } from "schemas/AuthSchema";

export interface IAuthContext {
  user: TokenPayload;
  setUser: Dispatch<SetStateAction<TokenPayload>>;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TokenPayload>(null);
  const [validating, setValidating] = useState(true);

  const router = useRouter();

  const PROTECTED_ROUTES = ["/"];

  const validateRoutes = (user: TokenPayload) => {
    if (!user && PROTECTED_ROUTES.includes(router.pathname)) {
      void router.push("/login");
    }
    if (!!user && router.pathname === "/login") {
      void router.push("/");
    }
    setTimeout(() => {
      setValidating(false);
    }, 50);
  };

  useEffect(() => {
    const userFromLS = localStorage.getItem("user");
    const userForState = !!userFromLS ? JSON.parse(userFromLS) : null;
    setUser(userForState);
    validateRoutes(userForState);
  }, []);

  if (validating) return <p>validating...</p>;

  console.log("POST VALIDATING");

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
