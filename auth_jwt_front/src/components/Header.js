import React from 'react'
import '../css/home.css'
import Card from '../components/Card'
import {faBook, faHouse, faSquarePlus, faRightFromBracket, faListCheck } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

function Header() {
  return (
    <div className='header'>

      <Link to={"/"} style={{textDecoration:"none"}}> <Card title="Home" icon={faHouse} /> </Link>

      <Link to={"/all_books"} style={{textDecoration:"none"}}> <Card title="Books" icon={faBook} /> </Link>

      <Link to={"/my_books"} style={{textDecoration:"none"}}> <Card title="My Books" icon={faListCheck} /></Link>

      <Link to="/add_book" style={{textDecoration:"none"}}><Card title="Add Book" icon={faSquarePlus} /> </Link>

      <Link to="/logout" style={{textDecoration:"none"}} 
            onClick={() => { 
              localStorage.setItem("token", "")
               }}
               >
              
              <Card title="Log Out" icon={faRightFromBracket}/> 
              
      </Link>

      <ToastContainer />           
    </div>
  )
}

export default Header