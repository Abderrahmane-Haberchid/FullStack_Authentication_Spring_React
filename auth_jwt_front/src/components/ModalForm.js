import axios from 'axios';
import { useEffect, useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';

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
    fetchBookById();
  })

  const handleSubmitBtn = (data) => {

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
        Update Book
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form method='POST' onSubmit={handleSubmit(handleSubmitBtn)}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control {...register("name")} type="text" value={book.id} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control {...register("author")} type="text" value={book.id} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Publication Date</Form.Label>
            <Form.Control {...register("publication")} type="date" value={book.id} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control {...register("price")} type="text" value={book.id} />
          </Form.Group>

          <Button variant='success'>Update Book</Button>
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