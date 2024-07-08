import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner';
import { toast, ToastContainer } from 'react-toastify'
import { jwtDecode } from "jwt-decode";
import ModalForm from '../components/ModalForm'
import ModalConfirmation from '../components/ModalConfirmation'

function Books() {

    const [modalUpdateShow, setModalUpdateShow] = useState(false);
    const [modalDeleteShow, setModalDeleteShow] = useState(false);
    const [modalAddShow, setModalAddShow] = useState(false);
    
    const [bookId, setBookId] = useState("")
    const [books, setBooks] = useState([])

    const [spinner, setSpinner] = useState(true)

    const [filteredBooks, setFilteredBooks] = useState([])

    const token = localStorage.getItem("token")

    const decodedToken = jwtDecode(token)

    const fetchBooks = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/all`,         
            {
                headers:{
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then(res => {
            setBooks(res.data.sort((a,b) => b.id-a.id))
            setFilteredBooks(res.data)
            setSpinner(false)
        }).catch(err => {
            if(err.status === 403){
                toast.error("Session Expired")    
            }
            else toast.error("Please check your connection, code: "+ err.status)
        })
    }

    // Add book to user

    const handleAddBookToUser = async (idBook) => {
        //toast.success(idBook)
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/addBookToUser/${decodedToken.sub}/${idBook}`, 
                {
                    headers:{
                        "Content-Type": "Application/json",
                        "Authorization" : `Bearer ${token}`
                    }
                }
        ).then((res => {
            res.status === 200 && toast.success('Book added to your List')

        })).catch(err => {
            toast.error('An error has occured '+ err.response.status)

        })
    }

   
    // Update Book

    // const handleUpdateBook = async (bookId) => {
    //     await axios.put(`http://localhost:8080/api/v1/book/update/${bookId}`,
    //         {
    //             headers:{
    //                 "Content-Type": "Application/json",
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         }
    //      ).then(res =>{
    //         res.status === 200 && toast.success("Book Updated !")

    //      }).catch(err => {
    //         toast.error("An error has occured")

    //      })

    // }
     // Delete Book

     const handleDeleteBook = async (bookId) => {

        await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/book/delete/${bookId}`,
            {
                headers:{
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
         ).then(res =>{
            res.status === 200 && toast.success("Book Deleted !")
            setTimeout(() => {
                window.location.reload();
            }, 5000)

         }).catch(err => {
            toast.error("Only ADMIN is Allowed to Delete")
            setModalDeleteShow(false)

            setTimeout(() => {
                window.location.reload();
            }, 5000)
         })
        }

    
    const filterBooks =  (e) => {

        const search = e.target.value
        let filtered = books.filter((b) => b.name.toLowerCase().includes(search.toLowerCase())  )
        setFilteredBooks(filtered)
    }

    useEffect(() => {
        fetchBooks();
    }, [])

    //Showing confirmation alert dialog and Modal form to update
    const handleDeleteBtn = (bId) => {
        setModalDeleteShow(true)
        setBookId(bId)
    }

    const handleUpdateBtn = (bId) => {
        setModalUpdateShow(true)
        setBookId(bId)
    }
    //=============
    
    const username = decodedToken.sub
    let name = username.split("@")
  return (
    <div>
        <div className='header-title'>
          <p>Welcome to Dashboard {name[0].toUpperCase()} !</p>
        </div>
        <Header />
        <div style={{display:"flex", justifyContent:"space-between", marginBottom:"20px"}}>

        <p style={{fontSize:"16px", fontWeight:500, textDecoration:"underline"}}>All Books({filteredBooks.length})</p>
        <input type="text" placeholder="Search By Name..." style={{paddingLeft:"10px"}} onChange={filterBooks} />

        </div>
        { spinner === true ? <Spinner animation="grow" /> :
        <Table striped bordered hover centered>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Date Publication</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    filteredBooks.map((book) => 
                    <tr>
                    <td>{book.id}</td>        
                    <td>{book.name}</td>
                    <td>{book.author}</td>
                    <td>{book.publication}</td>
                    <td>{book.price}</td>
                    <td>
                        <FontAwesomeIcon icon={faPlus} 
                                        style={{marginRight:"20px", fontSize:"25px", color:"blue", cursor:"pointer"}} 
                                        onClick={() => handleAddBookToUser(book.id)}/>
                        <FontAwesomeIcon icon={faPenToSquare} 
                                        style={{marginRight:"20px", fontSize:"20px", color:"green", cursor:"pointer"}}
                                        onClick={() => handleUpdateBtn(book.id)} />
                        <FontAwesomeIcon icon={faTrash} 
                                        style={{marginRight:"20px", fontSize:"20px", color:"red", cursor:"pointer"}} 
                                        onClick={() => handleDeleteBtn(book.id)}/>
                    </td>
                </tr>

                    )
                }
            </tbody>
        </Table>
        }
        <ToastContainer />

        <ModalForm
        show={modalUpdateShow}
        onHide={() => setModalUpdateShow(false) }
        id={bookId}    
      />
      <ModalConfirmation
        show={modalDeleteShow}
        onHide={() => setModalDeleteShow(false)}
        bodyText="Continue Deleting this book !"
        btnConfirmation="Delete"
        handleSubmit={() => handleDeleteBook(bookId)}
      />

      <ModalConfirmation
        show={modalAddShow}
        onHide={() => setModalAddShow(false)}
        bodyText="Would you like to add this book to your List ?"
        btnConfirmation="Add"
        handleSubmit={() => handleAddBookToUser(bookId)}
      />
    </div>
  )
}

export default Books