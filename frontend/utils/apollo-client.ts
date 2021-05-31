import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import getConfig from "next/config";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const httpLink = new HttpLink({
  uri: serverRuntimeConfig.CMS_URL || publicRuntimeConfig.CMS_URL
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache()
});

export default client;
