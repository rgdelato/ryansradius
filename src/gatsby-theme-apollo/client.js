import fetch from "isomorphic-fetch";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/link-context";
import { WebSocketLink } from "@apollo/link-ws";
import { getToken } from "../utils/auth";

const isBrowser = typeof window !== "undefined";

const wsLink = isBrowser
  ? new WebSocketLink({
      uri: `wss://ryansradius.herokuapp.com/v1/graphql`,
      options: {
        lazy: true,
        reconnect: true,
        connectionParams: async () => {
          const token = await getToken();
          return {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          };
        },
      },
    })
  : null;

const httpLink = createHttpLink({
  uri: "https://ryansradius.herokuapp.com/v1/graphql",
  fetch,
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const link = isBrowser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    )
  : httpLink;

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token
  const token = await getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

export default client;
