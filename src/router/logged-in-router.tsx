import { gql } from "@apollo/client";
import React from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Header } from "../components/header";
import Loading from "../components/Loading";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { Restaurants } from "../pages/client/restaurants";
import { Search } from "../pages/client/search";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";

const CommonRoutes = [
  { path: "confirm", element: <ConfirmEmail /> },
  { path: "edit-profile", element: <EditProfile /> },
  { path: "search", element: <Search /> },
];

const ClientRoutes = [{ path: "", element: <Restaurants /> }];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  return loading || !data || error ? (
    <Loading />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route element={<Header />}>
          {CommonRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          {data?.me?.role === "Client" &&
            ClientRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
