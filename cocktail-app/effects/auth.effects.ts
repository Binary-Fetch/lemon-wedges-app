import { takeLatest, put, call } from 'redux-saga/effects';
import ActionTypes from '../constants/ActionTypes';
import Config from '../constants/Config';
import AuthService from '../services/auth';
import { AsyncStorage } from 'react-native';

export default function* watchAuthProcess() {
    yield takeLatest(ActionTypes.AUTH_LOADING_START, validateAuthData);
    yield takeLatest(ActionTypes.RESTORE_TOKEN, checkExistingAuthSession);
}
function* validateAuthData(action: any) {
    try {
        const userVerificationData = yield AuthService.validateLogin(action.payload.username, action.payload.password);
        const userDetails = (userVerificationData && userVerificationData.data && userVerificationData.data.login) ? 
            userVerificationData.data.login : null;
        const userToken = (userDetails && userDetails.token) ? userDetails.token : null;
        if(userToken) {
            AsyncStorage.setItem(Config.storageKeyForAuth, userToken);
            AsyncStorage.setItem(Config.storageKeyForUserDetails, JSON.stringify(userDetails));
            yield(put({type: ActionTypes.SIGN_IN, userDetails, userToken}));
        }else{
            yield(put({type: ActionTypes.AUTH_LOADING_FAILED, error: Config.loginFailedMessage}));
        }
    }catch(error) {
        yield(put({type: ActionTypes.AUTH_LOADING_FAILED, error}));
    }
}

function* checkExistingAuthSession() {
    try{
        const userToken = yield AsyncStorage.getItem(Config.storageKeyForAuth);
        const userDetails = yield AsyncStorage.getItem(Config.storageKeyForUserDetails);
        if(userToken && userDetails) {
            yield(put({type: ActionTypes.SIGN_IN, userDetails, userToken: JSON.parse(userDetails)})); 
        }
    }catch(error) {
        console.log(error);
    }
}