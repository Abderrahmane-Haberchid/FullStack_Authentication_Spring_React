import React from 'react'
import '../css/home.css'
import Card from '../components/Card'
import {faBook, faHouse } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='header'>

      <Link to={"/"} style={{textDecoration:"none"}}> <Card title="Home" icon={faHouse} /> </Link>

      <Link to={"/all_books"} style={{textDecoration:"none"}}> <Card title="Books" icon={faBook} /> </Link>

      <Link to={"/my_books"} style={{textDecoration:"none"}}> <Card title="My Books" icon={faBook} /></Link>

      <Link to="/add_book" style={{textDecoration:"none"}}><Card title="Add Book" icon={faBook} /> </Link>

      <Link to="/add_book" style={{textDecoration:"none"}}><Card title="Log Out" icon={faBook}/> </Link>

    </div>
  )
}

export default Header