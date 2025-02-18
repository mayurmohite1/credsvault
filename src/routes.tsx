import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import StorePage from "./pages/StorePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/store",
    element: <StorePage />,
  },
]);
