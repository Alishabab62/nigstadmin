import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Private({children }) {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
  if (user === null) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
