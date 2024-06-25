
import React, { useEffect, useState } from 'react'
import '../css/home.css'
import Header from '../components/Header'
import axios from 'axios'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import { Table } from 'react-bootstrap'


function Home() {

  const [user, setUser] = useState([])

  const token = localStorage.getItem("token")
  const decodedToken = jwtDecode(token)

  const fetchUserData = async () => {
      await axios.get(`http://localhost:8080/api/v1/user/${decodedToken.sub}`, 
        {
          headers:{
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      ).then(res => {
          setUser(res.data)
      }
      ).catch(err => {
          toast.error("Please check your connection !")
      })
      
  }

  useEffect(() => {
    fetchUserData();
  }, [])

  return (
    <div className='main'>
      <div className='header-title'>
          <p style={{marginLeft:"-30px"}}>Welcome to dashboard {user.name} !</p>
      </div>
      <div className='header'>
        <Header />
     
      </div>

      <div className='body'>
          <p style={{marginLeft:"120px", fontWeight:"500"}}>Account Information:</p>
          <center>
          <Table style={{width:"70%"}}>
            <tr>
              <td >Name: </td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td>Email: </td>
              <td>{user.username}</td>
            </tr>
            <tr>
              <td>Role: </td>
              <td>{user.role}</td>
            </tr>
            <tr>
              <td>Created At: </td>
              <td>{user.createdAt}</td>
            </tr>
          </Table>
          </center>
      </div>


        
    </div>
  )
}

export default Home