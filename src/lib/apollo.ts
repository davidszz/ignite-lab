import { ApolloClient, InMemoryCache } from "@apollo/client"

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4ooovoa0ixr01xng1hs1ex0/master',
  cache: new InMemoryCache()
});