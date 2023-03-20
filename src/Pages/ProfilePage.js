import React, { useEffect, useRef, useState } from "react";
import "./ProfilePage.css";
export default function ProfilePage() {
  
const [preVal,setPreVal]=useState([])
const name = useRef('');
const url = useRef('');

const [verify,setVerify]=useState(null)

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
    // console.log(data)
    setPreVal(data.users[0].providerUserInfo[0])
    
}
fetchData()
    }, [])
    console.log(preVal)
   
 
   
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
  return (
    <>
      <h2 className="my-3">Contact Details</h2>
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
