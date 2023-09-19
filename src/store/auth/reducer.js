import * as actionTypes from './actionTypes';
// initialState
const initialState = {
    isLoading: false,
    myProfile: {},
    isLogin: false,
    isLogout: false,
    error: null
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVING_MY_PROFILE:
            return {
                ...state,
                myProfile: action.payload,
            };
        case actionTypes.GET_MY_PROFILE: 
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.GET_MY_PROFILE_SUCCESS:
            return {
                ...state,
                myProfile: action.payload,
                ísLoading: false,
            };
        case actionTypes.GET_MY_PROFILE_FAILED:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case actionTypes.LOGIN:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLogin: true,
            };
        case actionTypes.LOGIN_FAILED:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLogout: true,
            };
        case actionTypes.LOGOUT_FAILED:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        default: return state;
    }
};
export default authReducer;
