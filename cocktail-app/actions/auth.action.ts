import ActionTypes from "../constants/ActionTypes";

export const authLoading = () => ({
    type: ActionTypes.AUTH_LOADING_START
})

export const authSingIn = (username: string, password: string) => ({
    type: ActionTypes.AUTH_LOADING_START,
    payload: {
        username,
        password 
    }
});

export const authSingOut = () => ({
    type: ActionTypes.SIGN_OUT,
});

export const authRestore = (userToken: string) => ({
    type: ActionTypes.RESTORE_TOKEN,
    userToken
});