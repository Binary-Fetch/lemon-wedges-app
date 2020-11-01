import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import AppConfiguration from '../constants/Config';
import { CocktailRecipe, CocktailRecipeResponse } from '../types';
import { AsyncStorage } from 'react-native';
import Config from '../constants/Config';

export default function RecipesService() {
    const getRecipes = async () => {
        const token = await AsyncStorage.getItem(Config.storageKeyForAuth);
        if (!token) {
            throw new Error('Required auth token missing, please login');
        }
        const client = new ApolloClient({
            uri: AppConfiguration.GQLBackendUrl,
            cache: new InMemoryCache(),
            headers: {
                authorization: "Bearer " + token
            }
        });
        return await client.query<CocktailRecipeResponse>({
            query: gql`
                query fetchAllRecipe{
                    coctailRecipe {
                        desc
                        id
                        imageUrl
                        likes
                        name
                        ingredients {
                            amount
                            id
                            quantity
                            type
                            unit
                            ingredient {
                            detail
                            name
                            }
                        }
                        prepareSteps {
                            description
                            id
                            imageUrl
                            order
                        }
                    }
                }
            `
        });
    }
    const createRecipe = async (recipe: CocktailRecipe) => {
        return new Promise<string>((resolve, reject) => {
            resolve('Success');
        });
    }

    return {
        getRecipes,
        createRecipe
    }
}