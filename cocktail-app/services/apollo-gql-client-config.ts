import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import { AsyncStorage } from 'react-native';
import Config from '../constants/Config';
import AppConfiguration from '../constants/Config';

export default async function getApolloGQLClient(authRequired: boolean = true) {
    let authToken: string = authRequired ? await getauthTokenFromStorage() : "";
    const httpLink = createHttpLink({
        uri: AppConfiguration.GQLBackendUrl, 
    });
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
    
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    });
    const authLink = setContext((_, { headers }) => {
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: authToken,
        }
      }
    });
    
  const params = {
    link: ApolloLink.from([
      errorLink,
      authLink,
      httpLink,
    ]),
    cache: new InMemoryCache()
  };
    
  return new ApolloClient(params);
}

const getauthTokenFromStorage = async () : Promise<string> => {
    const token = await AsyncStorage.getItem(Config.storageKeyForAuth);
    if (!token) {
        throw new Error('Required auth token missing, please login');
    }
    return `Bearer ${token}`;
}