import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaUser, FaSignInAlt, FaSignOutAlt, FaAddressBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './styles/navstyle.css'

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('userData');
    setIsLoggedIn(false);
    toast.success('Logged out successfully');
    navigate('/log');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#contacts" className="d-flex align-items-center">
          <FaAddressBook className="me-2" style={{ fontSize: '1.5rem' }} /> 
          <span className="fw-bold">Contacts</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link href="/profile" className="text-light">
                  <FaUser className="me-2" style={{ fontSize: '1.2rem' }} /> 
                  My Profile
                </Nav.Link>
                <Nav.Link href="/" onClick={handleLogout} className="text-light">
                  <FaSignOutAlt className="me-2" style={{ fontSize: '1.2rem' }} /> 
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link href="/log" className="text-light">
                <FaSignInAlt className="me-2" style={{ fontSize: '1.2rem' }} /> 
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
