import React, { useEffect, useState } from 'react';
import { getDeletedContacts } from '../AllApi'; // Import your API function
import { FaTrashRestore } from 'react-icons/fa'; // Optional icon for restoring contacts
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DeletedContact() {
  const [deletedContacts, setDeletedContacts] = useState([]);

  useEffect(() => {
    const fetchDeletedContacts = async () => {
      try {
        const result = await getDeletedContacts();
        if (result.status === 200) {
          setDeletedContacts(result.data);
        }
      } catch (error) {
        console.error('Error fetching deleted contacts:', error);
        toast.error("Failed to fetch deleted contacts");
      }
    };
    fetchDeletedContacts();
  }, []);

  const handleRestoreClick = async (contactId) => {
    try {
      await axios.patch(`${baseURL}/contacts/${contactId}`, { deleted: false });
      toast.success("Contact restored successfully!");
      // Remove the restored contact from the deleted list
      setDeletedContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
    } catch (error) {
      console.error("Error restoring contact:", error);
      toast.error("Failed to restore contact");
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="mb-4">Deleted Contacts</h2>
      
      {deletedContacts.length > 0 ? (
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
              {deletedContacts.map(contact => (
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
                    <button 
                      className="btn btn-outline-success"
                      onClick={() => handleRestoreClick(contact.id)}
                    >
                      <FaTrashRestore /> Restore
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-muted">No deleted contacts available</p>
      )}
    </div>
  );
}

export default DeletedContact;
