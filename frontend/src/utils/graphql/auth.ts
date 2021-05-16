import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation ($email: String!, $password: String!) {
    signup(data: { email: $email, password: $password }) {
      accessToken
      refreshToken
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      accessToken
      refreshToken
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;
