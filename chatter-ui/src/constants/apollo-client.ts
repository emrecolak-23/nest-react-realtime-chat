import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { onError } from "@apollo/client/link/error";

import { exludedRoutes } from "./excluded-routes";
import { logOut } from "../utils/logout";

import { WEB_SOCKET_URL } from "./urls";
import { getMainDefinition } from "@apollo/client/utilities";

const logoutLink = onError((error) => {
  if (
    error.graphQLErrors?.length &&
    (error.graphQLErrors[0].extensions?.originalError as any)?.statusCode ===
      401
  ) {
    if (!exludedRoutes.includes(window.location.pathname)) {
      logOut();
    }
  }
});

const httpLink = new HttpLink({ uri: `/graphql` });
const wsLink = new GraphQLWsLink(
  createClient({ url: `${WEB_SOCKET_URL}/graphql` })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `/graphql`,
  link: logoutLink.concat(splitLink),
});

export default client;
