export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  LoginSplash: undefined,
  SignIn: undefined,
  UserRegistration: undefined,
  DetailRecipe: undefined
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
    navigation : any
    doSignout: Function
  }
  export interface state {
    isLoading: boolean, 
    coctailRecipeList: CocktailRecipe[]
  }
}

export namespace DetailRecipeComponent {
  export interface Props {
  route: any,
  navigation: any
  }
  export interface State {
    isLoading: boolean,
    user: User,
    coctailRecipe: CocktailRecipe
  }
}

export namespace CreateRecipeComponent {
  export interface Props {
    authentication: any,
    navigation: any,
    doSignout: Function
  }
  export interface State {
    newRecipe?: CocktailRecipe
    creationMessage?: string
    submissionInProg: boolean
  }
}
export type MyCocktailRecipesResponse = {
  getUser: any
}
export namespace MyRecipeComponent {
  export interface props {
    navigation: any,
    doSignout: Function,
    authentication: any
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

export type UserRegistrationRequest = {
  email: string,
  username: string,
  gender: string,
  name: string,
  password: string
}

export type UserLoginResponse = {
  login: User;
}

export type CocktailRecipe = {
  desc: string
  id?: string
  imageUrl?: string[]
  ingredients?: Ingredients[]
  likes?: number
  name: string
  prepareSteps?: PreparationStep[]
  owner: User
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
