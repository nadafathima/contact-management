import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import { deleteContact, viewContactDetails } from '../AllApi'; // Adjust the API services
import '../Components/styles/list.css'

function ContactList({ contact, response }) {
  const [show, setShow] = useState(false);
  const [contactDetails, setContactDetails] = useState(null);

  // Handle drag start event
  const handleDragStart = (e, contact) => {
    e.dataTransfer.setData("contact", JSON.stringify(contact));
  };
  
  const handleDelete = async () => {
    try {
      const res = await deleteContact(contact.id);
      if (res.status === 200) {
        toast.success("Contact deleted successfully");
        response(res);
      } else {
        toast.error("Failed to delete contact");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting contact");
    }
  };

  const handleShow = async () => {
    setShow(true);
    try {
      const res = await viewContactDetails(contact.id);
      if (res.status === 200) {
        setContactDetails(res.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching contact details");
    }
  };

  const handleClose = () => setShow(false);

  return (
    <>
      <tr draggable onDragStart={handleDragStart}>
        <td>
          <img
            src={contact.photoUrl}
            alt="Contact"
            className="contact-image"
          />
        </td>
        <td>{contact.name}</td>
        <td>{contact.phone}</td>
        <td>{contact.email}</td>
        <td className="table-buttons">
          <Button variant="info" size="sm" onClick={handleShow}>
            View
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete}>
            <i className="fa-solid fa-trash"></i>
          </Button>
        </td>
      </tr>

      {/* Modal to show contact details */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{contact.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {contactDetails ? (
            <>
              <p><strong>Email:</strong> {contactDetails.email}</p>
              <p><strong>Phone:</strong> {contactDetails.phone}</p>
              <p><strong>Photo URL:</strong> {contactDetails.photoUrl}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-right" className="toast-container" />
    </>
  );
}

export default ContactList;
