import { createBrowserRouter } from "react-router";
import Store from "./pages/Store";
import SKU from "./pages/SKU";
import Planning from "./pages/Planning";
import Charts from "./pages/Charts";
import DashboardLayout from "./layout/DashboardLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
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
    ],
  },
]);

export default router;
