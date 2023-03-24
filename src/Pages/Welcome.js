import React, { useRef, useState, useEffect } from "react";
import classes from "../Pages/Welcome.module.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Table from "react-bootstrap/Table";


export default function Welcome() {
  const [data, setData] = useState([]);

  const [apiData, setApiData] = useState([]);

  const [deleteD, setDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isId, setId] = useState(null);
  const [isEditDone, setEditDone] = useState(false);

  const price = useRef("");
  const desc = useRef("");
  const cat = useRef("");
  let showExpenseList;
  useEffect(() => {
    async function fetching() {
      const res = await fetch(
        "https://expensetracker-1d0d3-default-rtdb.firebaseio.com/details.json",
        {
          method: "GET",
          mode: "cors",
        }
      );
      const d = await res.json();
      if (res.ok) {
        const arr = [];
        for (const key in d) {
          arr.push({
            id: key,
            price: d[key].price,
            des: d[key].description,
            cat: d[key].category,
          });
        }

        setApiData(arr);
      }
    }
    fetching();
  }, [data, deleteD, isEditDone]);

  const submitExpenses = async (e) => {
    e.preventDefault();
    const pVal = price.current.value;
    const dVal = desc.current.value;
    const cVal = cat.current.value;
    const obj = {
      price: pVal,
      description: dVal,
      category: cVal,
    };
    const res = await fetch(
      "https://expensetracker-1d0d3-default-rtdb.firebaseio.com/details.json",
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      setData([...data, obj]);
    }

    price.current.value = "";
    desc.current.value = "";
    cat.current.value = "";
  };
  ///////////////////////////////////////////////EDITDATA/////////////////////////////////////////////////
  const editData = (id, p, d, c) => {
    price.current.value = p;
    desc.current.value = d;
    cat.current.value = c;
    setId(id);
    setEdit(true);
  };

  const putReqHandler = async () => {
    const pVal = price.current.value;
    const dVal = desc.current.value;
    const cVal = cat.current.value;
    const obj = {
      price: pVal,
      description: dVal,
      category: cVal,
    };
    const res = await fetch(
      `https://expensetracker-1d0d3-default-rtdb.firebaseio.com/details/${isId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(obj),
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      console.log("user edited succes");
    }
    if (isEditDone === false) {
      setEditDone(true);
    } else {
      setEditDone(false);
    }
    setEdit(false);
    price.current.value = "";
    desc.current.value = "";
    cat.current.value = "";
  };

  ////////////////////////////////////////////////DELETEDATA///////////////////////////////////////////////
  const deleteData = async (id) => {
    const res = await fetch(
      `https://expensetracker-1d0d3-default-rtdb.firebaseio.com/details/${id}.json`,
      {
        method: "DELETE",
        mode: "cors",
      }
    );
    if (res.ok) {
      console.log("Deleted succesfully");
      if (deleteD === false) {
        setDelete(true);
      } else {
        setDelete(false);
      }
    }
  };

  showExpenseList = apiData.map((i, index) => (
    <tr>
      <td>{index}</td>
      <td>{i.price}</td>
      <td>{i.des}</td>
      <td>{i.cat}</td>
      <td>
        <button onClick={() => editData(i.id, i.price, i.des, i.cat)}>
          Edit
        </button>{" "}
        <button onClick={() => deleteData(i.id)}>Delete</button>
      </td>
    </tr>
  ));

  return (
    <>
      <h4>Welcome to Expense Tracker,</h4>
      <span className={classes.sp}>
        Your profile is incomplete. <Link to="/profile">Complete Now</Link>{" "}
      </span>
      <div className="mx-2 ">
        <Form onSubmit={submitExpenses}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              className={classes.cont}
              ref={price}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter desc"
              className={classes.cont}
              ref={desc}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select size="sm" className={classes.cont} ref={cat}>
              <option>Food</option>
              <option>Petrol</option>
              <option>Salary</option>
              <option>Electricity Bill</option>
            </Form.Select>
          </Form.Group>

          {!edit && (
            <Button variant="primary" type="submit" className="my-2">
              Add Expense
            </Button>
          )}
          {edit && (
            <Button variant="primary" className="my-2" onClick={putReqHandler}>
              Submit Changes
            </Button>
          )}
        </Form>
      </div>
      <div className={classes.btable}>
        <Table striped bordered hover variant="dark" className="my-3 mx-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Change Here</th>
            </tr>
          </thead>
          <tbody>{showExpenseList}</tbody>
        </Table>
      </div>
    </>
  );
}
