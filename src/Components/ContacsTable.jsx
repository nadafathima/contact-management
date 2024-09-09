// ContactsTable.jsx
import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { getContacts, updateContact, deleteContact } from '../AllApi'; // Update the path as needed
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button, Form } from 'react-bootstrap';
import '../Components/styles/table.css'

function ContacsTable() { // Corrected the component name
  const [contacts, setContacts] = useState([]); // List of contacts
  const [filteredContacts, setFilteredContacts] = useState([]); // Filtered contacts based on search
  const [showEditModal, setShowEditModal] = useState(false); // State for Edit Modal
  const [contactToEdit, setContactToEdit] = useState(null); // Contact to edit
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for Delete Modal
  const [contactToDelete, setContactToDelete] = useState(null); // Contact to delete
  const [contactForm, setContactForm] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    photoUrl: ''
  });
  const [searchTerm, setSearchTerm] = useState(''); // Search term

  // Fetch contacts from the API
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const result = await getContacts();
        if (result.status === 200) {
          setContacts(result.data); // Assuming result.data contains an array of contacts
          setFilteredContacts(result.data); // Initialize filtered contacts
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
        toast.error("Failed to fetch contacts");
      }
    };

    fetchContacts();
  }, []);

  // Handle search input change
  useEffect(() => {
    setFilteredContacts(
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, contacts]);

  // Handle Edit Button Click
  const handleEditClick = (contact) => {
    setContactToEdit(contact);
    setContactForm(contact); // Pre-fill form with contact data
    setShowEditModal(true); // Show edit modal
  };

  // Handle Delete Button Click
  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setShowDeleteModal(true); // Show delete confirmation modal
  };

  // Handle Edit Form Change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle Edit Form Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!contactForm.id) {
        toast.error("No contact ID found");
        return;
      }

      const response = await updateContact(contactForm.id, contactForm);
      if (response && response.status === 200) {
        toast.success("Contact updated successfully!");

        // Update the contact in the UI state immediately
        setContacts(prevContacts =>
          prevContacts.map(contact =>
            contact.id === contactForm.id ? { ...contactForm } : contact
          )
        );

        setShowEditModal(false); // Close the modal
      } else {
        toast.error("Failed to update contact.");
        console.error('Update failed:', response); // Log the response when update fails
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      toast.error("Error updating contact.");
    }
  };

  // Handle Confirm Delete
  const handleConfirmDelete = async () => {
    try {
      if (!contactToDelete) {
        toast.error("No contact to delete");
        return;
      }

      const result = await deleteContact(contactToDelete.id);
      if (result.status === 200) {
        setContacts(contacts.filter(contact => contact.id !== contactToDelete.id));
        toast.success("Contact deleted successfully");
        setShowDeleteModal(false); // Close delete modal
        setContactToDelete(null); // Clear contact to delete
      } else {
        toast.error("Failed to delete contact");
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error("Failed to delete contact");
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="mb-4">Contacts List</h2>

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredContacts.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map(contact => (
                <tr key={contact.id}>
                  <td>
                    {contact.photoUrl ? (
                      <img
                        src={contact.photoUrl}
                        alt={contact.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }}
                      />
                    ) : (
                      <span>No Photo</span>
                    )}
                  </td>

                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>
                    <Button 
                      variant="outline-primary" 
                      className="me-2"
                      onClick={() => handleEditClick(contact)}
                    >
                      <FaEdit />
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      onClick={() => handleDeleteClick(contact)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-muted">No contacts available</p>
      )}

      {/* Edit Contact Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formContactName">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter name" 
                name="name"
                value={contactForm.name} 
                onChange={handleFormChange} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formContactEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                name="email"
                value={contactForm.email} 
                onChange={handleFormChange} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formContactPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control 
                type="tel" 
                placeholder="Enter phone number" 
                name="phone"
                value={contactForm.phone} 
                onChange={handleFormChange} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formContactPhotoUrl">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter photo URL" 
                name="photoUrl"
                value={contactForm.photoUrl} 
                onChange={handleFormChange} 
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Update Contact
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {contactToDelete && (
            <p>
              Are you sure you want to delete the contact: <strong>{contactToDelete.name}</strong>?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete Contact
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ContacsTable;
