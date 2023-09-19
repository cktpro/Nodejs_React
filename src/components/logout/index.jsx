import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { actionLogout } from 'store/auth/action';
function Logout(props) {
    const dispatch = useDispatch();
    dispatch(actionLogout())
    const isLogout = useSelector((state) => state.authReducer.isLogout);
    if (isLogout) {
     return  window.location.replace('/')
    }
    return (
        <div>
            Logout is processing
        </div>
    )
}

export default Logout;