import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import AddContact from '../Components/AddContact'; // Component for adding contacts
import ContactTable from '../Components/ContacsTable'; // Component to show contacts in table format
import ContactCategory from '../components/CategorySection'; // Component for categories
import { Link } from 'react-router-dom';
import DeletedContact from '../Components/DeletedContact';
import '../Components/styles/contacts.css'; // Import the CSS file

function ContactSection() {
  const [addResponse, setAddResponse] = useState(""); // To trigger update on contact addition
  const [username, setUserName] = useState("");

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('userData')); // Retrieve user data from session storage
    setUserName(user?.username);
  }, []);

  // Handler to be passed to AddContact
  const handleAddResponse = (response) => {
    setAddResponse(response); // Update state with the response from AddContact
  };

  return (
    <>
      <h2 className='mt-5'>Welcome {username} manage your contacts</h2>
      <div className='contact-section-header d-flex justify-content-between'>
        {/* <h1 className='text-center'>Contacts</h1> */}
      </div>
            <AddContact onResponse={handleAddResponse} /> {/* Pass the correct handler function */}
          

      <div className='container-fluid'>
        <Row>
          <Col sm={12} md={8}>
            <div className='contact-table'>
              <ContactTable add={addResponse} /> {/* Table component showing list of contacts */}
            </div>
          </Col>
          <Col sm={12} md={4}>
            <div className='contact-category'>
              <ContactCategory /> {/* Component to handle contact categories */}
            </div>
          </Col>
        </Row>
      </div>
      <div className='deleted-contact'>
        <DeletedContact/>
      </div>
    </>
  );
}

export default ContactSection;
