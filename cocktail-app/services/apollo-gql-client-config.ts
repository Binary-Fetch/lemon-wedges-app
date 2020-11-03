import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AsyncStorage } from 'react-native';
import Config from '../constants/Config';
import AppConfiguration from '../constants/Config';

export default async function getApolloGQLClient(authRequired: boolean = true) {
    let authToken: string = authRequired ? await getauthTokenFromStorage() : "";
    const httpLink = createHttpLink({
        uri: AppConfiguration.GQLBackendUrl,
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
    
    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });
    return client;
}

const getauthTokenFromStorage = async () : Promise<string> => {
    const token = await AsyncStorage.getItem(Config.storageKeyForAuth);
    if (!token) {
        throw new Error('Required auth token missing, please login');
    }
    return `Bearer ${token}`;
}