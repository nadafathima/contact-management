import { useState, useEffect } from 'react';
import './bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import MyProfile from './Components/MyProfile';
import Header from './Components/Header';
import Footer from './Components/Footer';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import ContactSection from './pages/ContactSection';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from 'react-toastify';
import DeletedContact from './Components/DeletedContact';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // State to manage login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check session storage on component mount to persist login state
  useEffect(() => {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('userData');
    setIsLoggedIn(false);
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/log" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/contacts" element={<ContactSection />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/dltcntcts" element={<DeletedContact />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
