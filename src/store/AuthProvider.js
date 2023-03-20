import AuthContext from "./context";

import React, { useState } from "react";

export default function AuthProvider(props) {
const [token,setToken]=useState(null)

let userLogIn=localStorage.getItem('Token') ? true:false

const addUser=(t)=>{
  setToken(t)

}

const removeUser=()=>{
  localStorage.clear()
  setToken(null)
}


  const state = {
    isLoggedIn: userLogIn,
    token:token,
    addUser:addUser,
    removeUser:removeUser,
    
   
  };
  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
}
