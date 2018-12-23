import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { setContext } from 'apollo-link-context';
import { createHttpLink } from "apollo-link-http";
import { hasSubscription } from "@jumpn/utils-graphql";
import { AsyncStorage } from 'react-native'

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
  createHttpLink({
    uri: serverURL,
  })
);

const authLink = setContext(async () => {
  const token = await AsyncStorage.getItem('golf:userToken');
  if (token != null) {
    const authToken = JSON.parse(token)
    return {
      headers: {
        authorization: token ? `Bearer ${authToken}` : null,
      }
    };
   }
});

export default new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
});
