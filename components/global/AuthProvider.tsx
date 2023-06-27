import { useRouter } from "next/router";
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

export interface IAuthContext {
  user: TokenPayload;
  setUser: Dispatch<SetStateAction<TokenPayload>>;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [validating, setValidating] = useState(true);

  const router = useRouter();
  console.log({ router });

  const PROTECTED_ROUTES = ["/"];

  const validateRoutes = (user: unknown) => {
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
  console.log({ validating });

  if (validating) return <h1>hola</h1>;

  console.log("POST VALIDATING");

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
