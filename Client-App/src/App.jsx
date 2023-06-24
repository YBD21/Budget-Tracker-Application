import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppRoutes from "./routes/ AppRoutes";

const route = createBrowserRouter([
  {
    path: "*",
    element: <AppRoutes />,
  },
]);

function App() {
  return <RouterProvider router={route} />;
}

export default App;
