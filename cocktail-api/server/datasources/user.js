const { gql } = require("apollo-server-express");
const { GraphQLDataSource } = require("apollo-datasource-graphql");
const constants = require("../constants");

const VERIFY_USER_DETAILS = gql`
query MyQuery($username: String, $password: String) {
  queryUser(filter: {username: {eq: $username}, password: {eq: $password}}) {
    active
    email
    gender
    name
    username
  }
}
`;

const GET_USER_DETAILS = gql`
query getUserDetails($username: String!, $first: Int, $offset: Int) {
  getUser(username: $username) {
    active
    email
    gender
    name
    username
    recipes(first: $first, offset: $offset) {
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
}
`;

const SAVE_USER_DETAILS = gql`
mutation saveUserDetails($input: [AddUserInput!]!) {
  addUser(input: $input) {
    numUids
  }
}
`;

class UserAPI extends GraphQLDataSource {
  baseURL = constants.slashGraphQLUrl;

  constructor() {
    super();
  }

  initialize(config) {
    this.context = config.context
  }

  async getUsers(username, first, offset) {
    try {
      // const user = this.context ?
      //   this.context.username : 'Username ID Not FOund';
      // console.log("User found from token ==>", user);
      const response = await this.query(GET_USER_DETAILS, {
        variables: {
          username: username,
          first: first,
          offset: offset
        },
      });
      return response.data.getUser;
    } catch (error) {
      console.error(error);
    }
  }

  async verifyUserDetails(username, password) {
    try {
      const response = await this.query(VERIFY_USER_DETAILS, {
        variables: {
          username: username,
          password: password
        },
      });
      let user = '';
      if(response.data.queryUser.length != 0) {
        user = response.data.queryUser[0];
      }
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  async saveUsers(userDetails) {
    let success = false;
    let message = "Error occured!";
    try {
      const response = await this.mutation(SAVE_USER_DETAILS, {
        variables: {
          input: [userDetails.user],
        },
      });
      success = response.data.addUser.numUids !== 0 ? true : false;
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

module.exports = UserAPI;