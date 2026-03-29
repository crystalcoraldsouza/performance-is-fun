import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./components/layout/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "about",
        element: <div>About us</div>,
      },
      {
        path: "contact-us",
        element: <div>Contact us</div>,
      },
    ],
  },
]);
