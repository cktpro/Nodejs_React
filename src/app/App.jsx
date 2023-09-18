import React, { useEffect } from 'react';
import './App.scss';
import { Routes,Route} from 'react-router-dom';
import {routers} from 'router/router'
import axios from 'axios';

function App() {
// Post token in header
  useEffect(() => {
      axios.defaults.headers.common["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTUwMzQ2OTEsIl9pZCI6IjY0YzlmOTMzMGMxZGVjZWM4ZDE2N2QxOCIsImZpcnN0TmFtZSI6IkPDoXAiLCJsYXN0TmFtZSI6IktpbSBUcuG6p20iLCJwaG9uZU51bWJlciI6Ijg0MDM1NzA4MTE4NiIsImFkZHJlc3MiOiJRdeG6o25nIFRy4buLIiwiZW1haWwiOiJja3Rwcm9AZ21haWwuY29tIiwiYmlydGhkYXkiOiIxOTk5LTAzLTI0VDE3OjAwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA4LTEwVDEyOjI5OjM4LjUzMFoiLCJhbGdvcml0aG0iOiJIUzI1NiIsImV4cCI6MTY5NTEyMTA5MX0.0osfCt_3TDTVV7O4m1cswtPOIecxE8I5z3ak8zxXZME`;
      console.log('◀◀◀ Token Active ▶▶▶');
    }, []);

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

export default App;
