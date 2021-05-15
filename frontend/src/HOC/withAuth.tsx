import { useQuery } from "@apollo/client";
import { Spinner } from "@chakra-ui/spinner";
import { Container } from "next/app";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { UserResult } from "../types/UserTypes";
import { ME } from "../utils/graphql/user";

export function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => {
    const { loading, data, error } = useQuery<UserResult>(ME);
    const router = useRouter();

    if (loading) {
      return (
        <Container>
          <Spinner size="xl" />
        </Container>
      );
    }

    if (error) {
      // router.replace("auth/login");
      console.log(error);
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
