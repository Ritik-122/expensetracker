import React from 'react'


export default function ExpenseList(props) {
  return (
    <>
      <tr>
        <td>{props.count}</td>
        <td>{props.price}</td>
        <td>{props.desc}</td>
        <td>{props.cat}</td>
      </tr>
      
 </>
  )
}
