import * as actionTypes from './actionTypes'
export const actionSaveProfile = (payload) => ({
    type: actionTypes.SAVING_MY_PROFILE,
    payload
})
export const actionGetMyProfile = (payload) => ({
    type: actionTypes.GET_MY_PROFILE,
    payload
})
export const actionGetMyProfileSuccess = (payload) => ({
    type: actionTypes.GET_MY_PROFILE_SUCCESS,
    payload
})
export const actionGetMyProfileFailed = (payload) => ({
    type: actionTypes.GET_MY_PROFILE_FAILED,
    payload
})
export const actionLogin = (payload) => ({
    type: actionTypes.LOGIN,
    payload
})
export const actionLoginSuccess = (payload) => ({
    type: actionTypes.LOGIN_SUCCESS,
    payload
})
export const actionLoginFailed = (payload) => ({
    type: actionTypes.LOGIN_FAILED,
    payload
})
export const actionLogout = (payload) => ({
    type: actionTypes.LOGOUT,
    payload
})
export const actionLogoutSuccess = (payload) => ({
    type: actionTypes.LOGOUT_SUCCESS,
    payload
})
export const actionLogoutFailed = (payload) => ({
    type: actionTypes.LOGOUT_FAILED,
    payload
})

