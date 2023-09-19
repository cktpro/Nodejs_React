import React, { useEffect } from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { routers, unAuthRouter } from "router/router";
import { useDispatch } from 'react-redux';
import {actionGetMyProfile} from 'store/auth/action'
import { useSelector } from "react-redux/es/hooks/useSelector";

function App() {
  // Post token in header
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("TOKEN");
  useEffect(() => {
    if (token) {
      dispatch(actionGetMyProfile(token))
    }
  }, [token,dispatch]);
  const myProfile=useSelector(state=>state.authReducer.myProfile)
  if (myProfile._id) {
    return (
      <Routes>
        {routers.map((r, idx) => {
          if (r.children && r.children.length > 0) {
            return (
              <Route path={r.path} element={r.element} key={idx}>
                {r.children.map((rc, index) => {
                  if (rc.isRoot) {
                    return <Route index element={rc.element} key={index} />;
                  }

                  return (
                    <Route path={rc.path} element={rc.element} key={index} />
                  );
                })}
              </Route>
            );
          }

          return <Route path={r.path} element={r.element} key={idx} />;
        })}
      </Routes>
    );
  }

  return (
    <Routes>
      {unAuthRouter.map((r, idx) => {
        return <Route path={r.path} element={r.element} key={idx} />;
      })}
    </Routes>
  );
}

export default App;
