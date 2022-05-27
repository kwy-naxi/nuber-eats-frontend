import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import {
  createRestaurant,
  createRestaurantVariables,
} from "../../__generated__/createRestaurant";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      error
      ok
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
}

export const AddRestaurant = () => {
  const [createRestaurantMutation, { loading, data }] = useMutation<
    createRestaurant,
    createRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION);
  const {
    register,
    getValues,
    formState: { isValid },
    handleSubmit,
  } = useForm<IFormProps>({
    mode: "onChange",
  });
  const onSubmit = () => {
    console.log(getValues());
  };
  return (
    <div className="container">
      <Helmet>
        <title>Add Restaurant | Nuber Eats</title>
      </Helmet>
      <h1>Add Restaurant</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input"
          placeholder="Name"
          {...register("name", {
            required: "Email is required.",
          })}
        ></input>
        <input
          className="input"
          placeholder="Address"
          {...register("address", {
            required: "Address is required.",
          })}
        ></input>
        <input
          className="input"
          placeholder="Category Name"
          {...register("categoryName", {
            required: "Category Name is required.",
          })}
        ></input>
        <Button
          loading={loading}
          canClick={isValid}
          actionText="Create Restaurant"
        />
      </form>
    </div>
  );
};
