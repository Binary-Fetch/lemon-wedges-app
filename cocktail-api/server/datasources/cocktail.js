const { gql } = require("apollo-server-express");
const { GraphQLDataSource } = require("apollo-datasource-graphql");
const constants = require("../constants");

const COCKTAIL_DETAILS = gql`
  query getAllCocktail($first: Int, $offset: Int) {
    queryCoctailRecipe(first: $first, offset: $offset) {
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
      owner {
        name
      }
    }
  }
`;

const SAVE_RECIPE_DETAILS = gql`
  mutation saveRecipeDetails($input: [AddCoctailRecipeInput!]!) {
    addCoctailRecipe(input: $input) {
      numUids
    }
  }
`;

class CocktailAPI extends GraphQLDataSource {
  baseURL = constants.slashGraphQLUrl;

  constructor() {
    super();
  }

  async getCocktailDetails(first, offset) {
    try {
      const response = await this.query(COCKTAIL_DETAILS, {
        variables: {
          first: 50,
          offset: 0,
        },
      });
      return response.data.queryCoctailRecipe;
    } catch (error) {
      console.error(error);
    }
  }

  async saveRecipe(recipeDetails) {
    let success = false;
    let message = "Error occured!";
    try {
      const response = await this.mutation(SAVE_RECIPE_DETAILS, {
        variables: {
          input: [recipeDetails.recipe],
        },
      });
      success = response.data.addCoctailRecipe.numUids !== 0 ? true : false;
      message = "Data saved successfully.";
      if (!success) {
        message = response.errors
          ? response.errors[0].message
          : "Error occured!";
      }
      return {
        success: success,
        message: message
      };
    } catch (error) {
      console.error(error);
      return {
        success: success,
        message: message
      };
    }
  }
}

module.exports = CocktailAPI;
