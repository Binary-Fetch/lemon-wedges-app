import { gql } from '@apollo/client';
import { UserLoginResponse } from '../types';
import getApolloGQLClient from './apollo-gql-client-config';

export default {
    validateLogin: async (username: string, password: string) => {
        const client = await getApolloGQLClient(false);
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