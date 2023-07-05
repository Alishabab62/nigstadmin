import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Private({children , path }) {
    const user = JSON.parse(localStorage.getItem("user"));
  if (user === null) {
    return <Navigate to="/" />;
  } else {
    if(path === user.type){
      return children;
    }
    else{
      localStorage.clear("user")
    return <Navigate to="/" />;
    }
  }
}
