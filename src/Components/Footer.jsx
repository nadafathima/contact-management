import React from 'react';
import './styles/footer.css'; // Make sure this file is created for footer styles

function Footer() {
  return (
    <>
      <footer className="footer bg-primary text-center text-light  text-lg-start pt-3">
        <div className="container p-0 ">
          <div className="text-center p-3 footer-content">
            © {new Date().getFullYear()} Contact Management | All rights reserved
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
