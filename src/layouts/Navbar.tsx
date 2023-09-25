import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setUser } from "../redux/features/user/userSlice";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const { user } = useAppSelector((state: any) => state.user);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    console.log("logout");
    signOut(auth).then(() => {
      dispatch(setUser(null));
    });
  };
  return (
    <>
      <div className="fixed z-50 top-0 left-0 text-white navbar bg-opacity-70 backdrop-blur-2xl bg-lime-900">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <Link to="/">
            <a className="text-white font-bold text-xl">BOOK WORM</a>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <div className="menu menu-horizontal px-1">
            {!user.email && (
              <>
                <Link className="mr-9" to="/">
                  <a>Last Added</a>
                </Link>
                <Link className="mr-9" to="/all-books">
                  <a>All Books</a>
                </Link>
                <Link className="mr-9" to="/signup">
                  <a>Sign up</a>
                </Link>
              </>
            )}
            {user.email && (
              <>
                <Link className="mr-9" to="/">
                  <a>Last Added</a>
                </Link>
                <Link className="mr-9" to="/all-books">
                  <a>All Books</a>
                </Link>
                <Link className="mr-9" to="/add-new-book">
                  <a>Add New Book</a>
                </Link>
                <Link className="mr-9" to="/wish-list">
                  <a>Wish List</a>
                </Link>
                <Link className="mr-9" to="/read-list">
                  <a>Read List</a>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {!user.email && (
                <>
                  <Link className="text-black" to="/signup">
                    <a>Sign Up</a>
                  </Link>
                  <Link className="text-black" to="/signin">
                    <a>Sign In</a>
                  </Link>
                </>
              )}
              {user.email && (
                <>
                  <li className="text-black" onClick={handleLogout}>
                    <a>Sign Out</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
