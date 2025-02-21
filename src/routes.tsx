import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import StorePage from "./pages/StorePage";
import ReadPage from "./pages/Read";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/store",
    element: <StorePage />,
  },
  {
    path: "/read",
    element: <ReadPage />,
  },
]);
