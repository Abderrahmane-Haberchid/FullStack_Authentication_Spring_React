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
    handleSubmit
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
      await axios.post(`http://localhost:8080/api/v1/book/update/${props.id}`, data, 
        {
          headers:{
            'Content-Type': 'Application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      ).then(res => {
          res === 200 && toast.success("Book "+props.id+" Updated !")
      }).catch(err => {
        toast.error("An error has occured !")
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
            <Form.Control {...register("name")} type="text" value={book.name} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control {...register("author")} type="text" value={book.author} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Publication Date</Form.Label>
            <Form.Control {...register("datePublication")} type="date" value={book.publication} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control {...register("price")} type="text" value={book.price} />
          </Form.Group>

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