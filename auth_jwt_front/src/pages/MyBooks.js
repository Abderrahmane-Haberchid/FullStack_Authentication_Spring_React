import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify'
import ModalConfirmation from '../components/ModalConfirmation'

function MyBooks() {

    const [books, setBooks] = useState([])

    const [filtered, setFiltered] = useState([])

    const token = localStorage.getItem("token")

    const [modalDeleteShow, setModalDeleteShow] = useState(false);
    const [bookId, setBookId] = useState("")
    

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
            setFiltered(res.data.booksSet)
        }).catch(err => {
            if(err.status === 403){
                toast.error("Session Expired")    
            }
            else toast.error("Please check your connection, code: "+ err.status)
        })
    }
    
    // Delete one book from List

    const handleDeleteMyBook = async (idBook) => {

        await axios.get(`http://localhost:8080/api/v1/deleteMyBook/${decodedToken.sub}/${idBook}`, 
                {
                    headers:{
                        "Content-Type": "Application/json",
                        "Authorization" : `Bearer ${token}`
                    }
                }
        ).then((res => {
            toast.warning('Book id:' +idBook+ ' deleted From your List')
            setTimeout(() => {
                window.location.reload()
            }, 5000)

        })).catch(err => {
            toast.error('An error has occured ')

        })
    }

    useEffect(() => {
        fetchBooks();
    }, [])

    const handleDeleteBtn = (id) => {
        setModalDeleteShow(true)
        setBookId(id)
    }

    const handleSearch = (e) => {
        let query = e.target.value
        let filterResult = books.filter(b => b.name.toLowerCase().includes(query.toLowerCase()))
        setFiltered(filterResult)
    }
    const username = decodedToken.sub
    let name = username.split("@")
  return (
    <div>
        <div className='header-title'>
          <p>Welcome to Dashboard {name[0].toUpperCase()} !</p>
        </div>
        <Header />
        <div style={{display:"flex", justifyContent:"space-between", marginBottom:"20px"}}>

        <p style={{fontSize:"16px", fontWeight:500, textDecoration:"underline"}}>My Books({filtered.length})</p>

        <input type="text" placeholder="Search By Name..." style={{paddingLeft:"10px"}} onChange={handleSearch} />

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
                    filtered.map((book) => 
                        <tr>
                    <td>{book.id}</td>        
                    <td>{book.name}</td>
                    <td>{book.author}</td>
                    <td>{book.publication}</td>
                    <td>{book.price}</td>
                    <td>
                        <FontAwesomeIcon icon={faTrash} 
                                        style={{marginRight:"20px", fontSize:"20px", color:"red", cursor:"pointer"}} 
                                        onClick={() => handleDeleteBtn(book.id)}
                                        />
                    </td>
                </tr>
                    )
                }
            </tbody>
        </Table>

        <ModalConfirmation
        show={modalDeleteShow}
        onHide={() => setModalDeleteShow(false)}
        bodyText="Would you like to delete this book from your List ?"
        btnConfirmation="Delete"
        handleSubmit={() => handleDeleteMyBook(bookId)}
      />

      <ToastContainer />

    </div>
  )
}

export default MyBooks