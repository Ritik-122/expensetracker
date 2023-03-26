import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "../Card/Card";
import {  useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { authActions } from "../store/redux";
import { CssBaseline } from "@material-ui/core";
import Button from '@material-ui/core/Button';


export default function Login() {
  const dispatch=useDispatch()
  const isLoggedIn=useSelector((state)=>state.auth.token)


  const[isLoading,setisLoding]=useState(false)
  const history = useHistory();
  const email = useRef("");
  const password = useRef("");
  const cnfpassword = useRef("");
  

  const [signUp, setSignUp] = useState(false);
 
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const cnfpasswordValue = cnfpassword.current.value;
    if (passwordValue !== cnfpasswordValue) {
      alert("Password doesn't match");
    } else {
      if (signUp === false) {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBidV1BXfH0QkFRbCo9RYeo2zXEHNTZVWg",
          {
            method: "POST",
            body: JSON.stringify({
              email: emailValue,
              password: passwordValue,
              returnSecureToken: true,
            }),
            mode: "cors",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!res.ok) {
          const d = await res.json();
          alert(d.error.message);
        }
        if (res.ok) {
          const data = await res.json();

          console.log("User registered", data);
        }
      } else {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBidV1BXfH0QkFRbCo9RYeo2zXEHNTZVWg",
          {
            method: "POST",
            body: JSON.stringify({
              email: emailValue,
              password: passwordValue,
              returnSecureToken: true,
            }),
            mode: "cors",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!res.ok) {
          const d = await res.json();
          alert(d.error.message);
        }
        if (res.ok) {
          const data = await res.json();
           localStorage.setItem('Email',data.email)
          localStorage.setItem("Token", data.idToken);
         
       
          dispatch(authActions.login(data.idToken))

          history.replace("/welcome");
        }
      }
    }

    email.current.value = "";
    password.current.value = "";
    cnfpassword.current.value = "";
  };

  const clickHandler = () => {
    if (signUp === false) {
      setSignUp(true);
    } else {
      setSignUp(false);
    }
  };
  //--------------------------------------------forgot password------------------------------------
  const forgotPassword = async () => {
    const emailValue = email.current.value;
    if(emailValue==='' ){
      alert('Write your email and click on forgot password')
    }else{

      if(signUp===true){
        setisLoding(true)
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBidV1BXfH0QkFRbCo9RYeo2zXEHNTZVWg",
      {
        method: "POST",
        body: JSON.stringify({
          email: emailValue,
          requestType:"PASSWORD_RESET"
        }),
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!res.ok) {
      const d = await res.json();
      alert(d.error.message);
    }
    if (res.ok) {
      await res.json();
      setisLoding(false)
     
    }
    }
  }
  };
  //-------------------------------------------return ----------------------------------------
  return (
    <>
    <CssBaseline/>
      <Card>
        <Form onSubmit={handleSubmit}>
         <Form.Group className="mb-3" controlId="formBasicEmail"> 
            <Form.Label>Email</Form.Label>
             <Form.Control
              type="email"
              placeholder="Enter email"
              ref={email}
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={password}
              required
            />
          </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={cnfpassword}
              required
            />
          </Form.Group>
          {!isLoggedIn && (
            <Button variant="contained" color="primary" type="submit">
              {signUp ? "Login" : "SignUp"}
            </Button>
          )}
          <Button variant="contained" color="primary"  className="mx-3">
            {signUp === true ? (
              <p onClick={clickHandler}>Create new account</p>
            ) : (
              <p onClick={clickHandler}>Login with existing account</p>
            )}
          </Button>
          {isLoading ?<Alert>Sending request</Alert>:<span style={{cursor:'pointer',color:'red'}} onClick={forgotPassword}>Forgot Password?</span>
          }        
        </Form>
        
      </Card>
    </>
  );
}
