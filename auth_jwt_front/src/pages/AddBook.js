import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Header from '../components/Header'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { jwtDecode } from "jwt-decode";

function AddBook() {

    const {
        register,
        handleSubmit
    } = useForm()

    const token = localStorage.getItem('token')

    const decodedToken = jwtDecode(token)

    console.log(token)

    const handleAddBook = async (data) => {

        await axios.post("http://localhost:8080/api/v1/addBookToStock", data,
            {
                headers:{
                    "Content-Type": "Application/json",
                    "Authorization" : `Bearer ${token}`
                }
            }
        ).then(res => {
            res.status === 200 && toast.success("Book Added")
        }).catch(err =>
            toast.error('Please check your connection !')
        )
    }
    const username = decodedToken.sub 
    let name = username.split("@")
  return (
    <div >
        <div className='header-title'>
          <p>Welcome to Dashboard {name[0].toUpperCase()} !</p>
      </div>
        <Header />

        <p style={{marginLeft:"400px", fontSize:"16px", fontWeight:"500"}}>Please fill this Form</p>

        <Form className='addBookForm' 
              style={{backgroundColor:"white", borderRadius:"10px", padding:"25px", maxWidth:"600px", marginLeft:"150px"}}
              onSubmit={handleSubmit(handleAddBook)}
              method="POST">

            <Form.Group className='mb-4'>
                <Form.Label>Book Name:</Form.Label>
                <Form.Control 
                    {...register("name")}
                    type="text" 
                    placeholder="Name..."/>
            </Form.Group>

            <Form.Group className='mb-4'>
                <Form.Label>Author Name:</Form.Label>
                <Form.Control 
                    {...register("author")}
                    type="text" 
                    placeholder="Author..."/>
            </Form.Group>

            <Form.Group className='mb-4'>
                <Form.Label>Publication Date:</Form.Label>
                <Form.Control 
                    {...register("datePublication")}
                    type="date" 
                    placeholder="Publication date..."/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Book Price:</Form.Label>
                <Form.Control 
                    {...register("price")}
                    type="text" 
                    placeholder="Price..."/>
            </Form.Group>

            <Button type='submit' style={{width:"550px", marginTop:"20px"}} variant='primary'>Save Book</Button>
        </Form>

        <ToastContainer />
    </div>
  )
}

export default AddBook