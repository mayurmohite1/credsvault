import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  projectId as rawProjectId,
  metadata,
  networks,
  wagmiAdapter,
} from "./config";

const projectId = rawProjectId || "defaultProjectId";
const queryClient = new QueryClient();
const generalConfig = {
  projectId,
  metadata,
  networks,
};
createAppKit({
  adapters: [wagmiAdapter],
  ...generalConfig,
  themeVariables: {
    "--w3m-accent": "#00ae95",
    "--w3m-color-mix": "#00ae95",
    "--w3m-color-mix-strength": 35,
  },
});

export function App() {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
