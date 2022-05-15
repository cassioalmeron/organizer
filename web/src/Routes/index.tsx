/* eslint-disable @typescript-eslint/no-empty-function */
import { Routes as RoutesDom, Route, Navigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Document from '../pages/Document';
import Test from '../pages/Test';
import SearchResult from '../pages/SearchResult';
import { useAuth } from '../hooks/auth';

export default function Routes(): React.ReactElement {
  const { auth, signOut } = useAuth();

  useEffect(() => {}, [auth]);

  const getElement = useCallback(
    (element: React.ReactElement, isPrivate = false) => {
      const expiredToken = auth && isExpired(getExpirationDate(auth.token));

      if (expiredToken) {
        signOut();
        return <Navigate to="Login" />;
      }

      if (auth) {
        if (!isPrivate) return <Navigate to="/" />;
      } else if (isPrivate) return <Navigate to="/Login" />;

      return element;
    },
    [signOut, auth],
  );

  return (
    <RoutesDom>
      <Route path="/" element={getElement(<Home />, true)} />
      <Route path="/Login" element={getElement(<Login />)} />
      <Route path="/Document" element={getElement(<Document />, true)} />
      <Route
        path="/SearchResult"
        element={getElement(<SearchResult />, true)}
      />
      <Route path="/Test" element={getElement(<Test />)} />
    </RoutesDom>
  );
}

const getExpirationDate = (jwtToken?: string): number | null => {
  if (!jwtToken) {
    return null;
  }

  const jwt = JSON.parse(atob(jwtToken.split('.')[1]));

  // multiply by 1000 to convert seconds into milliseconds
  return (jwt && jwt.exp && jwt.exp * 1000) || null;
};

const isExpired = (exp?: number | null) => {
  if (!exp) {
    return false;
  }

  return Date.now() > exp;
};
