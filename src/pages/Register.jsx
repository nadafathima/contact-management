import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../AllApi';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    const { username, email, password, confirmPassword } = user;
    if (!username || !email || !password || !confirmPassword) {
      toast.warning("Please fill all fields");
    } else if (password !== confirmPassword) {
      toast.warning("Passwords do not match");
    } else {
      try {
        const result = await signUpUser(user);
        if (result.status === 201) {
          toast.success("Registration Successful");
          setUser({ username: '', email: '', password: '', confirmPassword: '' });
          navigate('/'); // Redirect to login page after successful registration
        }
      } catch (error) {
        toast.error("Registration Failed");
        console.error(error);
      }
    }
  };

  return (
    <>
      <MDBContainer fluid>
        <MDBCard className='primary m-5' style={{ borderRadius: '25px' }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput 
                    label='Your Name' 
                    id='form1' 
                    type='text' 
                    className='w-100' 
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <MDBInput 
                    label='Your Email' 
                    id='form2' 
                    type='email' 
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <MDBInput 
                    label='Password' 
                    id='form3' 
                    type='password'
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size='lg' />
                  <MDBInput 
                    label='Repeat your password' 
                    id='form4' 
                    type='password'
                    value={user.confirmPassword}
                    onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                  />
                </div>

                <div className='mb-4'>
                  <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                </div>

                <MDBBtn className='mb-4' size='lg' onClick={handleRegister}>Register</MDBBtn>

                <div className='text-center'>
                  <p>Already a user? <Link to="/log">Login here</Link></p>
                </div>
              </MDBCol>

              <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
}

export default Register;
