import React from 'react'
import classes from '../Card/Card.module.css'

export default function Card(props) {
  return (
    <div className={classes.content}>
        {props.children}
    </div>
  )
}
