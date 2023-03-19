import React from 'react'
import classes from '../Pages/Welcome.module.css'
import {Link} from 'react-router-dom'
export default function Welcome() {
  return (
<>
<span className={classes.sp}>Welcome to Expense Tracker</span>
<p className={classes.pa}>Your profile is incomplete. <Link to='/profile'>Complete Now</Link> </p>
</>
 )
}
