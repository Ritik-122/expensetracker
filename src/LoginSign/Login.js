import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "../Card/Card";

export default function Login() {
  const email = useRef("");
  const password = useRef("");
  const cnfpassword = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const cnfpasswordValue = cnfpassword.current.value;
    if (passwordValue !== cnfpasswordValue) {
      alert("Password doesn't match");
    } else {
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
        console.log("User registered");
      }
    }
    email.current.value = "";
    password.current.value = "";
    cnfpassword.current.value = "";
  };
  return (
    <>
      <Card>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
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
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </Card>
    </>
  );
}
