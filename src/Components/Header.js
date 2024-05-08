import React from 'react';
import { Link } from "react-router-dom";
// import { Modal } from 'bootstrap';
import './Header.css';

// const link = document.createElement('link');
// link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap';
// link.rel = 'stylesheet';
// document.head.appendChild(link);

class Header extends React.Component {
  render() {
    return (
      <div className='navbar'>
        <div className='navLinks'>
          <Link to="/beranda" className='link'>Beranda</Link>
          <Link to="/tentangsaya" className='link'>Tentang Saya</Link>
          <Link to="/karya" className='link'>Karya</Link>
          <Link to="/kontak" className='link'>Kontak</Link>
          <Link to="/gallery" className='link'>Gallery</Link>
          <Link to="/cart" className='link'>Cart</Link>

        </div>
      </div>
    );
  }
}

export default Header;