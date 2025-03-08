import { createBrowserRouter } from "react-router";
import Store from "./pages/Store";
import SKU from "./pages/SKU";
import Planning from "./pages/Planning";
import Charts from "./pages/Charts";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Store />,
  },
  {
    path: "/sku",
    element: <SKU />,
  },
  {
    path: "/planning",
    element: <Planning />,
  },
  {
    path: "/charts",
    element: <Charts />,
  },
]);

export default router;
