import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { loginUser } from '../AllApi';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

const LoginPage = ({ setIsLoggedIn }) => {
  const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  // const loginUser = async (email, password) => {
  //   return await axios.get(`http://localhost:3000/users?email=${email}&password=${password}`);
  // };

  const handleLogin = async () => {
    const { email, password } = user;
    if (!email || !password) {
      toast.warning('Please fill all fields');
    } else {
      try {
        const result = await loginUser(email, password);
        if (result.data.length > 0) {
          sessionStorage.setItem('userData', JSON.stringify(result.data[0]));
          setIsLoggedIn(true); // Update the authentication state in parent component
          toast.success('Login Successful');
          navigate('/contacts');
        } else {
          toast.warning('Invalid email or password');
        }
      } catch (error) {
        toast.error('Login Failed');
        console.error(error);
      }
    }
  };

  return (
    <MDBContainer fluid>
      <MDBCard className="primary m-5" style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md="10" lg="6" className="order-2 order-lg-1 d-flex flex-column align-items-center">
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size="lg" />
                <MDBInput
                  label="Your Email"
                  id="form1"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-100"
                />
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size="lg" />
                <MDBInput
                  label="Password"
                  id="form2"
                  type="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
              </div>
              <MDBBtn className="mb-4" size="lg" onClick={handleLogin}>Login</MDBBtn>
              <div className='text-center'>
                  <p>New user? <Link to="/reg">Register here</Link></p>
                </div>

            </MDBCol>
            
            <MDBCol md="10" lg="6" className="order-1 order-lg-2 d-flex align-items-center">
              <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default LoginPage;
