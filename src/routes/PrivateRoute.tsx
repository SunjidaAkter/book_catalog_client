import { useAppSelector } from "../redux/hook";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const location = useLocation();

  if (isLoading) {
    return <p>loading...</p>;
  }
  console.log(user);
  if (!user.email && !isLoading) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}
