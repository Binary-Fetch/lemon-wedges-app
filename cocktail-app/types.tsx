export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  LoginSplash: undefined,
  SignIn: undefined
};

export type BottomTabParamList = {
  HomeScreen: undefined;
  MyAccount: undefined;
  UploadRecipe: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
};

export type TabTwoParamList = {
  MyAccount: undefined;
};
export type UploadRecipeParamList = {
  UploadRecipe: undefined;
};

export namespace HomeComponent {
  export interface props {

  }
  export interface state {
    isLoading: boolean, 
    coctailRecipeList: CocktailRecipe[]
  }
}

export namespace CreateRecipeComponent {
  export interface Props {

  }
  export interface State {
    newRecipe: CocktailRecipe
    creationMessage: string
  }
}
export type MyCocktailRecipesResponse = {
  getUser: any
}
export namespace MyRecipeComponent {
  export interface props {

  }
  export interface state {
    isLoading: boolean,
    user: User,
    coctailRecipeList: CocktailRecipe[]
  }
}


export type CocktailRecipeResponse = {
  coctailRecipe: CocktailRecipe[]
}

export type User = {
  firstName?: string,
  lastName?: string,
  email?: string,
  username: string,
  gender?: string,
  name: string,
  token: string
}

export type UserLoginResponse = {
  login: User;
}

export type CocktailRecipe = {
  desc: string
  id: string
  imageUrl?: string[]
  ingredients?: Ingredients[]
  likes?: number
  name: string
  prepareSteps?: PreparationStep[]
}

export type Ingredients = {
  amount: number
  id: string
  quantity: number
  ingredient: RawIngredient
  type: any
  unit: any
} 

export type RawIngredient = {
  detail: string
  name: string
}

export type PreparationStep = {
  description: string 
  id: string 
  imageUrl: string[]
  order: number
} 

export namespace AppRoot {
  export interface State {
    isLoading: boolean
    isSignout: boolean
    userToken: string
  }

  export interface AppAuthContext{
    signIn: Promise<void>,
    signOut: Function,
    signUp: Promise<void>
  }
}
