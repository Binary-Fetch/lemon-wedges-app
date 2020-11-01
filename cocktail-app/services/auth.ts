import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import AppConfiguration from '../constants/Config';
import { UserLoginResponse } from '../types';

const client = new ApolloClient({
    uri: AppConfiguration.GQLBackendUrl,
    cache: new InMemoryCache(),
});

export default {
    validateLogin: async (username: string, password: string) => {
        return await client.query<UserLoginResponse>({
            query: gql`
                query getUser($username: String!, $password: String!) {
                    login(username:$username,password:$password) {
                        token
                        username
                        email
                        name
                        gender
                    }
                }
            `,
            variables: { username, password }
        });
    }
}