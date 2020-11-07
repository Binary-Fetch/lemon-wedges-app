# cocktail-api

## Sample Quary

- Fetch all cocktail recipe

```
query fetchAllRecipe{
  coctailRecipe(first:Int,offset:Int) {
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
```

- Fetch details of user

```
query {
    getUser(username:String!,first:Int,offset:Int) {
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
```
- Login (Sample Requests, Response)
```
query {
  login(username:String,password:String) {
    token
    username
    email
    name
    gender
  }
}
```
```
{
  "data": {
    "login": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkdXR0IiwiZW1haWwiOiJheWFuXzk0QHJlZGlmZm1haWwuY29tIiwiaWF0IjoxNjAzOTY2ODA0LCJleHAiOjE2MDM5NzA0MDR9.DWf1VSmZI4fcSlqPXA4ZIReK11rOo09ENhSAC0JF7-0",
      "username": "adutt",
      "email": "ayan_94@rediffmail.com",
      "name": "Ayan Dutta",
      "gender": "Male"
    }
  }
}
```
- Save user (Sample Requets, Success Response & Failure Response)
```
mutation {
  saveUser(user:{username:"sroy",email:"subham.roy@xyz.com",name:"Subham Roy",gender:"Male",active:ACTIVE}){
    success
    message
  }
}
```
```
{
  "data": {
    "saveUser": {
      "success": true,
      "message": "Data saved successfully."
    }
  }
}
```
```
{
  "data": {
    "saveUser": {
      "success": false,
      "message": "couldn't rewrite query for mutation addUser because id sroy already exists for type User"
    }
  }
}
```
- Save Recipe (Sample Requets & Sample Response)
```
mutation{
  recipeImageUpload(file:Upload!) {
    filename
    mimetype
    encoding
    url
  }
}
```
```
mutation {
  saveRecipe(recipe:{
      desc: "Create cocktail by following easy steps",
      imageUrl: [
         "https://www.recipegirl.com/wp-content/uploads/2007/09/Sea-Breeze-1.jpg"
      ],
      name: "Flip flop",
      prepareSteps: [
         {
            description: "In an old-fashioned glass almost filled with ice cubes, combine all of the ingredients. Stir well.",
            imageUrl: [
               "https://www.recipegirl.com/wp-content/uploads/2007/09/Sea-Breeze-1.jpg"
            ],
            order: 1
         },
		 {
            description: "Shake ingredients together in a mixer with ice. Strain into glass, garnish and serve.",
            imageUrl: [
               "https://www.recipegirl.com/wp-content/uploads/2007/09/Sea-Breeze-1.jpg"
            ],
            order: 2
         }
      ],
      owner: {
         username: "sday"
      },
      ingredients: [
         {
            amount: "1 parts",
            ingredient: {
               name: "Vodka"
            },
            quantity: 30,
            type: "Liquor",
            unit: "ml"
         },
		 {
            amount: "2 parts",
            ingredient: {
               name: "Water"
            },
            quantity: 60,
            type: "Liquor",
            unit: "ml"
         }
      ]
   }){
    success
    message
  }
}
```
```
{
  "data": {
    "saveRecipe": {
      "success": true,
      "message": "Data saved successfully."
    }
  }
}
```