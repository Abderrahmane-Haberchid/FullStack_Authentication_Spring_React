import axios from 'axios';
import { useEffect, useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function ModalForm(props) {

  const [book, setBook] = useState([])

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue
  } = useForm();

  const token = localStorage.getItem("token")

  const fetchBookById = async () => {
    await axios.get(`http://localhost:8080/api/v1/book/${props.id}`, 
      {
        headers:{
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    ).then(res => {
        setBook(res.data)
        console.log(res.data)

    }).catch(err => {

    })
  }

  useEffect(() => {
    fetchBookById()
  }, [props.id])

  const handleSubmitBtn = async (data) => {
      await axios.put(`http://localhost:8080/api/v1/book/update/${props.id}`, data, 
        {
          headers:{
            'Content-Type': 'Application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      ).then(res => {
          toast.success("Book "+props.id+" Updated !")
          setTimeout(() => {
            window.location.reload()
          }, 5000)
          
      }).catch(err => {
            err.response.status === 403 && toast.error("Only ADMIN is allowed to update !")
      })
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Update Book {props.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form method='POST' onSubmit={handleSubmit(handleSubmitBtn)}>
          
                <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control {...register("name", {required:"Name is required..."})} 
                              type="text" 
                              {...setValue('name', book.name)} />
                </Form.Group>
                {errors.name && <p className='text text-danger mt-2'>{errors.name.message}</p>}

                <Form.Group>
                <Form.Label>Author</Form.Label>
                <Form.Control {...register("author", {required: 'Athor name is required...'})} 
                              type="text" 
                              {...setValue('author', book.author)} />
                </Form.Group>
                {errors.author && <p className='text text-danger mt-2'>{errors.author.message}</p>}

                <Form.Group>
                <Form.Label>Publication Date</Form.Label>
                <Form.Control {...register("datePublication", {required: 'Publication date required...'})} 
                              type="date" 
                              {...setValue('datePublication', book.datePublication)} />
                </Form.Group>
                {errors.datePublication && <p className='text text-danger mt-2'>{errors.datePublication.message}</p>}

                <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control {...register("price", {required: 'Price is required...'})} 
                              type="text" 
                              {...setValue('price', book.price)} />
                </Form.Group>
                {errors.price && <p className='text text-danger mt-2'>{errors.price.message}</p>}
          <Button type='submit' variant='success'>Update Book</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalForm

//render(<App />);