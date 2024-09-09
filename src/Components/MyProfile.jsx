import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Image } from 'react-bootstrap';
import { FaCamera } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './styles/myprofile.css'; // Import the custom CSS

function MyProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    photoUrl: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUser({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        photoUrl: userData.photoUrl || 'https://via.placeholder.com/150'
      });
    } else {
      toast.error("User data not found. Please log in.");
    }
  }, []);

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      sessionStorage.setItem('userData', JSON.stringify(user));
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <Container className="my-profile-container mt-4">
      <h2 className="mb-4">My Profile</h2>
      <div className="profile-header d-flex align-items-center mb-4">
        <div className="profile-pic-container  me-3">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKNwJz-vhaZVskyf7rLnoAVlsZSQz7oYkA4XrR_-PD53HLb1-UT2IC4q6V-s_rmPrelMo&usqp=CAU"
            roundedCircle
            className="profile-pic"
          />
          <label htmlFor="profilePicUpload" className="profile-pic-upload">
            <FaCamera />
          </label>
          <input
            type="file"
            id="profilePicUpload"
            className="d-none"
            accept="image/*"
            onChange={handleProfilePicChange}
          />
        </div>
        {/* <div>
          <h4>{user.name}</h4>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </div> */}
      </div>
      <Form onSubmit={handleSubmit} className="profile-form">
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your phone number"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3" disabled={!editMode}>
          Save Changes
        </Button>
        <Button
          variant="secondary"
          className="mt-3 ms-2"
          onClick={() => setEditMode(prev => !prev)}
        >
          {editMode ? 'Cancel' : 'Edit'}
        </Button>
      </Form>
    </Container>
  );
}

export default MyProfile;
