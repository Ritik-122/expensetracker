import { CssBaseline } from '@material-ui/core'
import React from 'react'
import classes from '../Card/Card.module.css'

export default function Card(props) {
  return (
    <>
    <CssBaseline/>
    <div className={classes.content}>
        {props.children}
    </div>
    </>
  )
}
