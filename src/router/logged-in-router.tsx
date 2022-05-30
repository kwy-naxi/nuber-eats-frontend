import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Header } from "../components/header";
import Loading from "../components/Loading";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { Category } from "../pages/client/category";
import { Restaurant } from "../pages/client/restaurant";
import { Restaurants } from "../pages/client/restaurants";
import { Search } from "../pages/client/search";
import { AddRestaurant } from "../pages/owner/add-restaurants";
import { MyRestaurant } from "../pages/owner/my-restaurant";
import { MyRestaurants } from "../pages/owner/my-restaurants";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";
import { AddDish } from "../pages/owner/add-dish";

const CommonRoutes = [
  { path: "confirm", element: <ConfirmEmail /> },
  { path: "edit-profile", element: <EditProfile /> },
];

const ClientRoutes = [
  { path: "", element: <Restaurants /> },
  { path: "search", element: <Search /> },
  { path: "category/:slug", element: <Category /> },
  { path: "restaurants/:id", element: <Restaurant /> },
];

const restaurantRoutes = [
  { path: "", element: <MyRestaurants /> },
  { path: "add-restaurant", element: <AddRestaurant /> },
  { path: "restaurants/:id", element: <MyRestaurant /> },
  { path: "restaurants/:id/add-dish", element: <AddDish /> },
];

//const OwnerRoutes = [{ path: "", element: <Restaurants /> }];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  return loading || !data || error ? (
    <Loading />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route element={<Header />}>
          {data?.me?.role === "Client" &&
            ClientRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}

          {data?.me?.role === "Owner" &&
            restaurantRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}

          {CommonRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
