const { gql } = require("apollo-server");

const typeDefs = gql`
  # Queries
  type Query {
    getUser(first: Int, offset: Int): User
    coctailRecipe(first: Int, offset: Int): [CoctailRecipe]
    login(username: String!, password: String!): LoginResponse
  }

  # Mutation
  type Mutation {
    saveUser(user: UserInput): UserUpdateResponse!
    saveRecipe(recipe: RecipeInput): RecipeUpdateResponse!
    singleUpload(file: Upload!): File!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  # User Model
  type User {
    username: String!
    email: String!
    name: String!
    gender: String!
    active: UserStatus
    recipes: [CoctailRecipe]
  }

  enum UserStatus {
    ACTIVE
    INACTIVE
  }

  input UserInput {
    username: String!
    password: String!
    email: String!
    name: String!
    gender: String!
    active: UserStatus
  }

  type UserUpdateResponse {
    success: Boolean!
    message: String
  }

  #Recipe Model
  type RawIngredient {
    name: ID!
    detail: String
  }

  type Ingredient {
    id: ID
    type: String
    ingredient: RawIngredient
    quantity: Int
    unit: String
    amount: String
  }

  type PrepareStep {
    id: ID
    description: String
    order: Int
    imageUrl: [String]
  }
  type Comment {
    id: ID
    text: String
  }

  type CoctailRecipe {
    id: ID
    name: String
    desc: String
    imageUrl: [String]
    ingredients: [Ingredient]
    prepareSteps: [PrepareStep]
    owner: User
    likes: Int
    comments: [Comment]
  }

  type RecipeUpdateResponse {
    success: Boolean!
    message: String
  }

  type LoginResponse {
    token: String
    username: String
    email: String
    name: String
    gender: String
  }

  input RecipeInput {
    desc: String!
    imageUrl: [String!]
    name: String!
    prepareSteps: [PrepareStepsInput]
    owner: UserInput
    ingredients: [IngredientsInput]
  }

  input IngredientsInput {
    amount: String
    ingredient: RawIngredientInput
    quantity: Int
    type: String
    unit: String
  }

  input RawIngredientInput {
    name: String
    details: String
  }

  input PrepareStepsInput {
    description: String!
    imageUrl: [String!]
    order: Int
  }
`;

module.exports = typeDefs;
