import {ReactNode} from 'react';
import {Navigate} from 'react-router';

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath?: string;
  children: ReactNode;
}

export const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/',
  children,
}: ProtectedRouteProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
