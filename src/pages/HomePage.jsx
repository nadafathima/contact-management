import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import '../Components/styles/home.css'; // Import the CSS file

function HomePage() {
  return (
    <>
      {/* Intro Section */}
      <div className="intro-section container-fluid mb-5 d-flex align-items-center " style={{ height: "80vh" }}>
        <Row>
          <Col className='mt-5 ' sm={12} md={6}>
            <h2 className='text-center px-5 mt-5'>
              {' '}Contact Management
            </h2>
            <p className='px-5 pt-3' style={{ textAlign: "justify" }}>
              Manage all your contacts efficiently with our easy-to-use Contact Management System. 
              Organize, update, and categorize your contacts effortlessly. Stay connected and 
              maintain important information with just a few clicks. Sign up today and make 
              managing your contacts a breeze!
            </p>
            <div className='d-grid px-5 pt-3'>
              <Link to={'/log'} className='btn btn-primary'>Get Started</Link>
            </div>
          </Col>
          <Col className='py-4' sm={12} md={6}>
            <img src="https://img.freepik.com/free-vector/hand-drawn-flat-design-omnichannel-illustration_23-2149360245.jpg?semt=ais_hybrid" className='img-fluid rounded' alt="introimg" style={{ height: "60vh", width: "600px" }} />
          </Col>
        </Row>
      </div>

      {/* Features Section */}
      <div className='features-section container-fluid mt-5'>
        <h2 className="primary my-3 text-center pt-5 ">Features</h2>
        <div className="p-4 d-flex justify-content-around">

          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" height={"200px"} src="https://cdn.dribbble.com/users/469578/screenshots/3571026/conversation.gif" />
            <Card.Body>
              <Card.Title>Add New Contacts</Card.Title>
              <Card.Text>
                Quickly add new contacts and store essential details like phone numbers, email addresses, and more.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" height={"200px"} src="https://cdn.pixabay.com/animation/2024/01/18/06/03/06-03-15-926_512.gif" />
            <Card.Body>
              <Card.Title>Categorize Contacts</Card.Title>
              <Card.Text>
                Easily categorize your contacts into groups like family, friends, colleagues, and more for better organization.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" height={"200px"} src="https://i.pinimg.com/originals/e2/a6/a5/e2a6a58c5578d620e7d55677598593a0.gif" />
            <Card.Body>
              <Card.Title>View & Edit History</Card.Title>
              <Card.Text>
                Keep track of contact updates and easily review the history of edits and changes made over time.
              </Card.Text>
            </Card.Body>
          </Card>

        </div>
      </div>

    </>
  );
}

export default HomePage;
