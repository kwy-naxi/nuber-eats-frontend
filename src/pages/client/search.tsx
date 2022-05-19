import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  searchRestaurant,
  searchRestaurantVariables,
} from "../../__generated__/searchRestaurant";

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface CustomizedState {
  searchTerm: string;
}

export const Search = () => {
  const location = useLocation();
  const state = location.state as CustomizedState;
  const { searchTerm } = state;

  const navigate = useNavigate();
  const [queryReadyToStart, { loading, data, called }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);
  useEffect(() => {
    if (!searchTerm) {
      return navigate("/", { replace: true });
    }
    queryReadyToStart({
      variables: {
        input: {
          page: 1,
          query: searchTerm,
        },
      },
    });
  }, [navigate, location]);
  console.log(loading, data, called);
  return (
    <div>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
      <h1>Search page</h1>
    </div>
  );
};
