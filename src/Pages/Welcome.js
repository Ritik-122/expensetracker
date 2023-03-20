import React, { useRef, useState } from "react";
import classes from "../Pages/Welcome.module.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ExpenseList from "./ExpenseList";
import Table from 'react-bootstrap/Table';
export default function Welcome() {
  const [data,setData]=useState([])
  
  const price=useRef('')
  const desc=useRef('')
  const cat=useRef('')
let showExpenseList
  const submitExpenses=(e)=>{
    e.preventDefault();
    const pVal=price.current.value
    const dVal=desc.current.value
    const cVal=cat.current.value
    const obj={
        price:pVal,
        description:dVal,
        category:cVal       
    }
    
    setData([...data,obj])
    
    e.preventDefault();
   price.current.value=''
    desc.current.value=''
    cat.current.value=''

  }
  console.log(data)
  showExpenseList=data.map((i,index)=><ExpenseList price={i.price} desc={i.description} cat={i.category} count={index}/>)
  return (
    <>
      
        <h4  >Welcome to Expense Tracker,</h4>
        <span className={classes.sp}>
          Your profile is incomplete. <Link to="/profile">Complete Now</Link>{" "}
        </span>
        <div className="mx-2 ">
        <Form onSubmit={submitExpenses}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Enter Price" className={classes.cont} ref={price}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Enter desc"  className={classes.cont} ref={desc}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select size="sm"  className={classes.cont} ref={cat}>
              <option >Food</option>
              <option >Petrol</option>
              <option >Salary</option>
              <option >Electricity Bill</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit" className="my-2">
            Add Expense
          </Button>
        </Form>
     </div>
     <Table striped bordered hover variant="dark" className="my-3">
    <thead>
      <tr>
        <th>#</th>
        <th>Price</th>
        <th>Description</th>
        <th>Category</th>
      </tr>
    </thead>
    <tbody>{showExpenseList}</tbody>
    
  </Table>
     
    </>
  );
}
