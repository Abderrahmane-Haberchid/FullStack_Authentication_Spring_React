import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'

function MyBooks() {

    const [books, setBooks] = useState([])
    const token = localStorage.getItem("token")

    const decodedToken = jwtDecode(token)

    const fetchBooks = async () => {
        await axios.get(`http://localhost:8080/api/v1/user/${decodedToken.sub}`, 
            {
                headers:{
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then(res => {
            setBooks(res.data.booksSet)
        }).catch(err => {
            if(err.status === 403){
                toast.error("Session Expired")    
            }
            else toast.error("Please check your connection, code: "+ err.status)
        })
    }
    console.log(books)

    useEffect(() => {
        fetchBooks();
    }, [])
  return (
    <div>
        <div className='header-title'>
          <p>Welcome to Dashboard Abdo !</p>
        </div>
        <Header />
        <div style={{display:"flex", justifyContent:"space-between", marginBottom:"20px"}}>

        <p style={{fontSize:"16px", fontWeight:500, textDecoration:"underline"}}>My Books( {books.length} )</p>
        <input type="text" placeholder="Search By Name..." style={{paddingLeft:"10px"}} />

        </div>
        <Table striped bordered hover centered>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Date Publication</th>
                    <th>Price</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    books.map((book) => 
                        <tr>
                    <td>{book.id}</td>        
                    <td>{book.name}</td>
                    <td>{book.author}</td>
                    <td>{book.publication}</td>
                    <td>{book.price}</td>
                    <td>
                        <FontAwesomeIcon icon={faTrash} style={{marginRight:"20px", fontSize:"20px", color:"red", cursor:"pointer"}} />
                    </td>
                </tr>
                    )
                }
            </tbody>
        </Table>

    </div>
  )
}

export default MyBooks