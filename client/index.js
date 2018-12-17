import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { hasSubscription } from "@jumpn/utils-graphql";

import absintheSocketLink from "./absinthe-socket-link";

const serverURL = () => {
  if (__DEV__) {
    return "http://localhost:4000/api/graphql"
  } else {
    return "https://golf.gigalixirapp.com/api/graphql"
  }
}

const link = new ApolloLink.split(
  operation => hasSubscription(operation.query),
  absintheSocketLink,
  createHttpLink({uri: serverURL})
);

export default new ApolloClient({
  link,
  cache: new InMemoryCache()
});
