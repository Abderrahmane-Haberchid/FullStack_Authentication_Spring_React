import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import '../css/signup.css'

function SignUp() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit
    } = useForm()

    const handleRegister = async (data) => {
        console.log(data)
        await axios.post("http://localhost:8080/api/v1/register", data,
            {
                Headers:{
                    "Content-Type": "Application/json"
                }
            }
        ).then(res =>{
            if(res.status === 201){
                toast.success("Account created successfully !")
                localStorage.setItem("token", res.data.token)
                console.log(res.data)
                setTimeout(() => {
                    navigate("/home")
                }, 3000)
                navigate("/home")
            } 
        }
        )
        .catch(err =>
            toast.error("An Error has Occured, code: " + err.response.status)
        )
    }

  return (
    
     <div className='registerContainer'>

        <h1>Sign Up</h1>

        <Form method='POST' onSubmit={handleSubmit(handleRegister)} className='form'>
            <Form.Group className='mb-3'>
                <Form.Label>Username:</Form.Label>    
                <Form.Control {...register("name")} type="text" placeholder='Type your name...' />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Email:</Form.Label>    
                <Form.Control {...register("username")} type="email" placeholder='Type your email...' />
            </Form.Group>
            
            <Form.Group className='mb-3'>
                <Form.Label>Password:</Form.Label>    
                <Form.Control {...register("password")} type="password" placeholder='Type your password...' />
            </Form.Group>

            <Form.Group>
                <Form.Label>Role</Form.Label>
                <Form.Select {...register("role")} aria-label="Default select example">
                    <option>Select Role</option>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="MASTER">MASTER</option>
                </Form.Select>
            </Form.Group>
            <Button type="submit" variant='primary' className='btnSubmit'>Register</Button>
        </Form>
        <Link to="/login" className='registerLink'>Already have an account ? Login</Link>
        <ToastContainer />

        </div>    
    
  )
}

export default SignUp