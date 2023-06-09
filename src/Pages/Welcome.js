import React, { useRef, useState, useEffect } from "react";
import classes from "../Pages/Welcome.module.css";
import { Link } from "react-router-dom";
import { authActions } from "../store/redux";
import Form from "react-bootstrap/Form";
import { saveAs } from 'file-saver';
import { useHistory } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions, premiumAccountActions } from "../store/redux";
import { AppBar, CssBaseline, Toolbar, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
export default function Welcome() {
const history=useHistory()
  const dispatch=useDispatch()
  const apiData=useSelector((state)=>state.expense.data)
  const isPremium=useSelector((state)=>state.premiumAccount.showPremium)
  const isPremiumActivated=useSelector((state)=>state.premiumAccount.toggle)
  

  const [data, setData] = useState([]);



  const [deleteD, setDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isId, setId] = useState(null);
  const [isEditDone, setEditDone] = useState(false);

  const price = useRef("");
  const desc = useRef("");
  const cat = useRef("");
  let showExpenseList;
  let email_id=localStorage.getItem('Email')
      email_id=email_id.replace('@','')
      email_id=email_id.replace('.','')
      console.log(email_id)
  
  useEffect(() => {
    async function fetching() {
    
      const res = await fetch(
        `https://expensetracker-1d0d3-default-rtdb.firebaseio.com/details/${email_id}.json`,
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

        dispatch(expenseActions.addData(arr));
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
      `https://expensetracker-1d0d3-default-rtdb.firebaseio.com/details/${email_id}.json`,
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
      `https://expensetracker-1d0d3-default-rtdb.firebaseio.com/details/${email_id}/${isId}.json`,
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
      `https://expensetracker-1d0d3-default-rtdb.firebaseio.com/details/${email_id}/${id}.json`,
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
  let c=0
 let t= apiData.map((i)=>c+=Number(i.price))
 if(c>=10000){
  dispatch(premiumAccountActions.showPremiumButton(true))
 }else{
  dispatch(premiumAccountActions.showPremiumButton(false))
 }

 const applyDarkTheme=()=>{

  dispatch(premiumAccountActions.toggleButton(true))

 }

  showExpenseList = apiData.map((i, index) => (
    <tr>
      <td>{index+1}</td>
      <td>{i.price}</td>
      <td>{i.des}</td>
      <td>{i.cat}</td>
      <td>
        <Button variant="contained" color="primary" size='small' startIcon={<EditIcon />} onClick={() => editData(i.id, i.price, i.des, i.cat)}>
          Edit
        </Button>{" "}
        <Button variant="contained"
        color="secondary" size='small' startIcon={<DeleteIcon />} onClick={() => deleteData(i.id)}>Delete</Button>
      </td>
    </tr>
  ));
  /////////////////////////////////////////////////////DOWNLOAD//////////////////////////////////////
  const onDownloadClickHandler = () => {
    const csv = Object.entries(apiData).map((expense) => {
     
      return [expense[1].price, expense[1].des, expense[1].cat];
    });

    console.log(csv);
    const makeCSV = (rows) => {
      return rows.map((r) => r.join(",")).join("\n");
    };

    const blob1 = new Blob([makeCSV(csv)]);

    
    const temp = URL.createObjectURL(blob1)
    saveAs(temp, "file1.csv")
  };
  ///////////////////////////////////////////////DOWNLOAD////////////////////////////////////////////////
  const logout=()=>{
    dispatch(authActions.logout())
     history.replace('/')
   
   }
  return (
    <>
    <CssBaseline/>
    <AppBar color='transparent' position="relative">
    <Toolbar>
    <Typography align="left" variant="h4" style={{marginRight:'650px'}} >Welcome to Expense Tracker</Typography>
    <Button variant="contained" color="primary" size="small" style={{marginRight:'40px'}} onClick={logout}>Log Out</Button>
    <Button  variant="contained" color="primary" size="small" onClick={onDownloadClickHandler}>Download Expenses</Button>

    
    </Toolbar>
    
    </AppBar>
    
    <Typography align="right"  variant="subtitle1"  >
      Your profile is incomplete.<Link to="/profile">Complete Now</Link>{" "}
      </Typography>
      
      
     
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
            <Button variant="contained" color="primary" type="submit" className="my-2">
              Add Expense
            </Button>
          )}
          {edit && (
            <Button  variant="contained" color="primary" className="my-2" onClick={putReqHandler}>
              Submit Changes
            </Button>
          )}
        </Form>
      </div>
      <div className={classes.btable}>
        <Table striped bordered hover variant={isPremiumActivated ? "dark":''} className="my-3 mx-4" >
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
         {isPremium && <Button onClick={applyDarkTheme}>{isPremiumActivated?"Deactivate Premium" :'Activate Premium'}</Button>}
        </Table>
      </div>
    </>
  );
}
