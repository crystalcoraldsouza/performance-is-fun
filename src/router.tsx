import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./features/dashboard/Dashboard";
import ContactUs from "./features/contact/ContactUs";

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
        element: <ContactUs />,
      },
    ],
  },
]);
