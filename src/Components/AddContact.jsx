import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addContact } from '../AllApi'; // This is your API service for adding contacts
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Components/styles/addcontact.css'; // Import the CSS file

function AddContact({ onResponse }) {
  const [show, setShow] = useState(false);
  const [contact, setContact] = useState({
    name: "", email: "", phone: "", photoUrl: ""
  });

  const handleAddContact = async () => {
    const { name, email, phone, photoUrl } = contact;
    if (!name || !email || !phone || !photoUrl) {
      toast.warning("Please enter valid input!");
    } else {
      try {
        const res = await addContact(contact);
        if (res.status == 201) {
          console.log(res);
          toast.success("Contact added successfully!");
          handleClose();
          onResponse(res);
        } else {
          toast.error("Failed to add contact.");
          console.log(res);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to add contact.");
      }
    }
  };

  const handleClose = () => {
    setShow(false);
    setContact({ name: "", email: "", phone: "", photoUrl: "" });
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <button className='btn' onClick={handleShow}>
        Add New Contact
        <i className="fa-solid fa-circle-plus" />
      </button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
            <Form.Control 
              type="text" 
              placeholder="John Doe" 
              onChange={(e) => setContact({ ...contact, name: e.target.value })} 
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
            <Form.Control 
              type="email" 
              placeholder="example@email.com" 
              onChange={(e) => setContact({ ...contact, email: e.target.value })} 
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingPhone" label="Phone Number" className="mb-3">
            <Form.Control 
              type="tel" 
              placeholder="123-456-7890" 
              onChange={(e) => setContact({ ...contact, phone: e.target.value })} 
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingPhoto" label="Photo URL" className="mb-3">
            <Form.Control 
              type="text" 
              placeholder="https://example.com/photo.jpg" 
              onChange={(e) => setContact({ ...contact, photoUrl: e.target.value })} 
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleAddContact}>
            Add Contact
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer className="toast-container" />
    </>
  );
}

export default AddContact;
