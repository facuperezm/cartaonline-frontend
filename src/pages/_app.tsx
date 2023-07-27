import { type AppType } from "next/dist/shared/lib/utils";
import "@/styles/globals.css";
import { AuthProvider } from "@/components/global/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default MyApp;
