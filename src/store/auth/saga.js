import { put, takeLeading } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import { actionGetMyProfileSuccess, actionGetMyProfileFailed, actionLoginSuccess, actionLoginFailed, actionLogoutSuccess, actionLogoutFailed } from './action';
import axios from 'axios';
function* getMyProfileSaga(action) {
    try {
        const token = action.payload;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res= yield axios.get("http://localhost:3005/auth/profile")
        yield put(actionGetMyProfileSuccess(res.data.payload));
    }
    catch (error) {
        yield put(actionGetMyProfileFailed(error));
    }
}
function* loginSaga(action) {
    try {
        
        const res = yield axios.post("http://localhost:3005/auth/login", action.payload);
        yield localStorage.setItem('TOKEN', res.data.payload.token);
        yield localStorage.setItem('REFRESH_TOKEN', res.data.payload.refreshToken);
        yield put(actionLoginSuccess());
    }
    catch (error) {
        yield put(actionLoginFailed(error));
    }
}
function* logoutSaga() {
    try {
        // remove bearer token
        yield delete axios.defaults.headers.common['Authorization'];
        yield localStorage.removeItem('TOKEN');
        yield localStorage.removeItem('REFRESH_TOKEN');
        yield put(actionLogoutSuccess());
    }
    catch (error) {
        yield put(actionLogoutFailed(error));
    }
}
export default function* profileSaga() {
    yield takeLeading(actionTypes.LOGIN, loginSaga);
    yield takeLeading(actionTypes.GET_MY_PROFILE, getMyProfileSaga);
    yield takeLeading(actionTypes.LOGOUT, logoutSaga);
  };