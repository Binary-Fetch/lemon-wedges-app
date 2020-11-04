
import { gql } from '@apollo/client';
import { CocktailRecipe, CocktailRecipeResponse, MyCocktailRecipesResponse, UserRegistrationRequest } from '../types';
import getApolloGQLClient from './apollo-gql-client-config';

export default function RecipesService() {
    const GET_MY_RECIPES = gql`
    query getUserRecipes{
        getUser{
            name
            username
            email
            gender
            active
            recipes{
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
    }
`;
    const getRecipes = async () => {
        const client = await getApolloGQLClient();
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
        const client = await getApolloGQLClient();
        return await client.mutate<any>({
            mutation: gql`
            mutation saveRecipe($recipe: RecipeInput){
                saveRecipe(recipe: $recipe){
                  success
                  message
                }
              }
            `,
            variables: { recipe: recipe }
        });
    }
    const createUser = async (user: UserRegistrationRequest) => {
        const client = await getApolloGQLClient(false);
        return await client.mutate<any>({
            mutation: gql`
            mutation saveUser($user: UserInput){
                saveUser(user: $user){
                  success
                  message
                }
              }
            `,
            variables: { user: user }
        });
    }
    const getMyRecipes = async () => {
        const client = await getApolloGQLClient();
        return await client.query<MyCocktailRecipesResponse>({
            query: GET_MY_RECIPES
        });
    }

    return {
        getRecipes,
        createRecipe,
        getMyRecipes,
        createUser
    }
}