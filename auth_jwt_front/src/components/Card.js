import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../css/home.css'

function Card(props) {
  return (
        <div className='card'>
          <ul>
            <li><FontAwesomeIcon icon={props.icon} /></li>
            <li><p>{props.title}</p></li>
          </ul>
        </div>
  )
}

export default Card