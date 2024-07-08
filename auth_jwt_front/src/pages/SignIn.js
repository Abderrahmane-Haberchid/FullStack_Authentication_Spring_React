
import axios from 'axios'
import React, {useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {Form, Button, InputGroup} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css"
import 'react-toastify/dist/ReactToastify.css';
import '../css/signin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


function SignIn() {

    const [data, setData] = useState([])
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handlePasswordEye = () => {
        setShowPassword(prev => !showPassword)
    }
    const {
        register,
        handleSubmit
    } = useForm()

    const loginSubmit = async (data) => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/login`, data,
            {
                headers:{
                    "Content-Type": "Application/json",
                }
            }
        ).then((response) =>
            {
                if(response.status === 200){
                    toast.success("Welcome back !")
                    setData(response.data) 
                    localStorage.setItem("token", response.data.token)
                    setTimeout(() => {
                        navigate('/home') 
                    }, 5000)
                    
            }
        }
        ).catch( err =>
            err.response.status === 404 ? toast.error("Incorrect logins !") : toast.error("Connection to database Failed !")
        )
    }
    console.log(data)

  return (
        <div className='container'>
                <h1>Sigin In</h1>
            
                <p>Welcome To JWT Authentification DEMO</p>
            
            <div className='form'>
                <Form method='POST' onSubmit={handleSubmit(loginSubmit)}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Email Adress:</Form.Label>
                        <Form.Control {...register("login")} 
                                className='form-control'
                                type='email'
                                placeholder='Type your login' />

                        </Form.Group> 
                        <Form.Group>
                        <Form.Label>Password:</Form.Label>   
                            <InputGroup className='passwordText'>         
                                    <Form.Control {...register("password")}
                                            type= {showPassword ? 'text' : 'password'}
                                            placeholder='Type your password' />

                                    <Button onClick={handlePasswordEye} variant='outline-primary'>        
                                        {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye}/>}  
                                </Button>
                            </InputGroup>        
                        </Form.Group>
                    <Button type='submit' variant='primary' className='btnSubmit'>Submit</Button>
                    
                </Form>
                </div>

            <Link to="/register" 
                className="registerLink">
                Register Now
            </Link>

            <ToastContainer />
            
        </div>   
  )
}



export default SignIn