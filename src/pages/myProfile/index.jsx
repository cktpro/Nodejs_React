import React from "react";
import { useSelector } from "react-redux";
function MyProfile(props) {
const profile=useSelector(state=>state.authReducer.myProfile)
  return (
    <div>
       Welcome {profile?.email}!
    </div>
  );
}

export default MyProfile;
