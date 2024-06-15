import { useMutation } from "@apollo/client";
import { User } from "../models/User";
import { graphql } from "../gql";

interface CreateUserInput {
  createUserInput: {
    email: string;
    username: string; 
    password: string;
  };
}

const createUserDocument = graphql(`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
    }
  }
`);

export const useCreateUser = () => {
  return useMutation<User, CreateUserInput>(createUserDocument);
};
