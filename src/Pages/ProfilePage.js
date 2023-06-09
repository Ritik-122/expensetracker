import React, { useEffect, useRef, useState } from "react";

import Button from '@material-ui/core/Button';
import "./ProfilePage.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/redux";
import { AppBar, CssBaseline, Toolbar, Typography } from "@material-ui/core";
export default function ProfilePage() {
  const history=useHistory()
const [preVal,setPreVal]=useState([])
const name = useRef('');
const url = useRef('');

const [verify,setVerify]=useState(null)
const dispatch=useDispatch()

//------------------------------------------------useEffect-----------------------------------------------
    useEffect(() => {
     async function fetchData(){
    const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBidV1BXfH0QkFRbCo9RYeo2zXEHNTZVWg", {
      method: "POST",
      body: JSON.stringify({
        idToken: localStorage.getItem("Token")
      }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
   
    
    setPreVal(data.users[0].providerUserInfo[0])
    
}
fetchData()
    }, [])
    
   
 //----------------------------post request------------------------------------------------------------
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameVal = name.current.value;
    const urlVal = url.current.value;
    const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBidV1BXfH0QkFRbCo9RYeo2zXEHNTZVWg", {
      method: "POST",
      body: JSON.stringify({
        idToken: localStorage.getItem("Token"),
        displayName: nameVal,
        photoUrl: urlVal,
        returnSecureToken: true,
      }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data)

    name.current.value = "";
    url.current.value = "";
  };
  //------------------------------------------verifyEmail-----------------------------------------------
  const verifyEmail=async()=>{
    const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBidV1BXfH0QkFRbCo9RYeo2zXEHNTZVWg", {
      method: "POST",
      body: JSON.stringify({
      requestType:"VERIFY_EMAIL",  
      idToken: localStorage.getItem("Token"),
        
      }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data)
    localStorage.setItem('email',data.email)
   
    setVerify(data.email)
  }
  const logout=()=>{
   dispatch(authActions.logout())
    history.replace('/')
  
  }
  //----------------------------------------------return here----------------------------------------------
  return (
    <>
    <CssBaseline/>
    <AppBar position="relative">
    <Toolbar>
    <Typography variant="h4"  style={{marginRight:'1000px'}}>Contact Details</Typography>
    <Button variant="contained" color="default" className="my-3" onClick={logout}>Log Out</Button>
    </Toolbar>
     </AppBar>
     
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input ref={name} value={preVal.displayName} req></input>
        <label>Profile Photo Url:</label>
        <input ref={url} value={preVal.photoUrl} req></input>
        <button className="button-10" type="submit">
          Update
        </button>
      { !verify && !localStorage.getItem('email') ? <button className="button-10 mx-4" onClick={verifyEmail}>
          Verify Email
        </button>:''}  
     
          
      </form>
    
    </>
  );
}
