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
        handleSubmit,
        formState: {errors}
    } = useForm()

    const token = localStorage.getItem('token')

    const decodedToken = jwtDecode(token)

    console.log(token)

    const handleAddBook = async (data) => {

        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/addBookToStock`, data,
            {
                headers:{
                    "Content-Type": "Application/json",
                    "Authorization" : `Bearer ${token}`
                }
            }
        ).then(res => {
            res.status === 200 && toast.success("Book Added")
        }).catch(err =>{
            err.response.status === 403 && toast.error('Only ADMIN is allowed to add book !')
            setTimeout(() => {
                window.location.reload()
            }, 5000)
        }
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
                    {...register("name", {required: 'Book name is required...'})}
                    type="text" 
                    placeholder="Name..."/>

                {errors.name && <p className='text text-danger mt-1'>{errors.name.message}</p> }        
            </Form.Group>
            

            <Form.Group className='mb-4'>
                <Form.Label>Author Name:</Form.Label>
                <Form.Control 
                    {...register("author", {required: 'Author name is required...'})}
                    type="text" 
                    placeholder="Author..."/>

                {errors.author && <p className='text text-danger mt-1'>{errors.author.message}</p> }          
            </Form.Group>

            <Form.Group className='mb-4'>
                <Form.Label>Publication Date:</Form.Label>
                <Form.Control 
                    {...register("datePublication", {required: 'Publication date is required...'})}
                    type="date" 
                    placeholder="Publication date..."/>

               {errors.datePublication && <p className='text text-danger mt-1'>{errors.datePublication.message}</p> }       
            </Form.Group>  

            <Form.Group>
                <Form.Label>Book Price:</Form.Label>
                <Form.Control 
                    {...register("price", {required: 'Price is required...'})}
                    type="text" 
                    placeholder="Price..."/>
            </Form.Group>
            {errors.price && <p className='text text-danger'>{errors.price.message}</p> }     

            <Button type='submit' style={{width:"550px", marginTop:"20px"}} variant='primary'>Save Book</Button>
        </Form>

        <ToastContainer />
    </div>
  )
}

export default AddBook