import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Signup from "../pages/SignUp";
import Signin from "../pages/SignIn";
import NotFound from "../pages/NotFound";
import Details from "../pages/Details";
import AddBook from "../pages/AddBook";
import EditBook from "../pages/EditBook";
import AllBooks from "../pages/AllBooks";
import PrivateRoute from "./PrivateRoute";
import WishList from "../pages/WishList";
import ReadList from "../pages/ReadList";

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
        path: "/all-books",
        element: <AllBooks />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
      {
        path: "/wish-list",
        element: <WishList />,
      },
      {
        path: "/read-list",
        element: <ReadList />,
      },
      {
        path: "/add-new-book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-book/:id",
        element: (
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        ),
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
