import React, { useRef } from "react";
import "./ProfilePage.css";
export default function ProfilePage() {
  const name = useRef("");
  const url = useRef("");
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
  return (
    <>
      <h2 className="my-3">Contact Details</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input ref={name} req></input>
        <label>Profile Photo Url:</label>
        <input ref={url} req></input>
        <button className="button-10" type="submit">
          Update
        </button>
      </form>
    </>
  );
}
