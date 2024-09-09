import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import ContactCard from './ContactList'; // Assuming this is the component for individual contacts
import { getContacts } from '../AllApi'; // Assuming this API function exists

function AllContacts({ add }) {
  const [contacts, setContacts] = useState([]);
  const [delResponse, setDelResponse] = useState("");

  // Fetch contacts when component mounts or when `add` or `delResponse` changes
  useEffect(() => {
    fetchContacts();
  }, [add, delResponse]);

  // Fetch contacts from the API
  const fetchContacts = async () => {
    const res = await getContacts();
    if (res.status === 200) {
      setContacts(res.data);
    } else {
      console.log("Failed to fetch contacts", res);
    }
  };

  return (
    <div className="border border-3 shadow p-5 mb-3">
      {contacts.length > 0 ? (
        <Row className="g-4"> {/* Add spacing between rows */}
          {contacts.map((contact) => (
            <Col key={contact.id} xs={12} sm={6} md={4} lg={3}> {/* Adjust columns for responsiveness */}
              <ContactCard contact={contact} response={setDelResponse} />
            </Col>
          ))}
        </Row>
      ) : (
        <h2 className="text-center text-danger">No Contacts Available!!</h2>
      )}
    </div>
  );
}

export default AllContacts;
