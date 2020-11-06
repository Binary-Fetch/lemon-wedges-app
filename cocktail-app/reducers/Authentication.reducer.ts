import ActionTypes from '../constants/ActionTypes';
const initialState = {
    isLoading: false,
    isSignout: false,
    userToken: null,
    userDetails: null,
    error: null,
    username: null
};
const authenticationReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case ActionTypes.RESTORE_TOKEN:
            return {
                ...state,
                isLoading: true,
                userToken: action.userToken,
                userDetails: action.userDetails,
            };
        case ActionTypes.SIGN_IN:
            return {
                ...state,
                isLoading: false,
                isSignout: false,
                userToken: action.userToken,
                userDetails: action.userDetails,
                error: null,
                username: null
            };
        case ActionTypes.SIGN_OUT:
            return {
                ...state,
                isSignout: true,
                userToken: null,
                isLoading: false
            };
        case ActionTypes.AUTH_LOADING_START:
            return {
                ...state,
                isLoading: true
            }
        case ActionTypes.AUTH_LOADING_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error,
                username: action.payload.username
            }
        default:
            return state;
    }
}

export default authenticationReducer;
