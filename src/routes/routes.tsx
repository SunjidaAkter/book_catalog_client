import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Signup from "../pages/SignUp";
import Signin from "../pages/SignIn";
import NotFound from "../pages/NotFound";
import Details from "../pages/Details";
import AddBook from "../pages/AddBook";
import EditBook from "../pages/EditBook";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/details",
        element: <Details />,
      },
      {
        path: "/add-new-book",
        element: <AddBook />,
      },
      {
        path: "/edit-book",
        element: <EditBook />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
