import { useState, useEffect, useContext } from 'react';
import { NavLink } from "react-router-dom";
import useCustomizer from '../hooks/useCustomizer';
import { CartContext } from '../context/CartContext';
import { FaShoppingBag } from "react-icons/fa";

const baseUrl = import.meta.env.VITE_WP_BASEURL;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mobileMenu } = useCustomizer();
  const { cart } = useContext(CartContext); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const mobile = document.querySelector(".nav-links");
    if (isOpen && mobile) {
      mobile.style.backgroundColor = mobileMenu;
    } else {
      mobile.style.backgroundColor = 'transparent';
    } 
  }, [isOpen, mobileMenu])
  
 
  return (
    <header>
      <nav className= {`navbar ${isOpen ? "menu-open" : ""}`} >
        <NavLink to="/" className="logo">
          <img src="/kys_logo.png" alt='kys Logo' />
        </NavLink>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`bar bar1 ${isOpen ? "toggle" : ""}`}></div>
          <div className={`bar bar2 ${isOpen ? "toggle" : ""}`}></div>
          <div className={`bar bar3 ${isOpen ? "toggle" : ""}`}></div>
        </div>

        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li>
            <NavLink to="/" onClick={closeMenu} className={({ isActive }) => (isActive ? "active-link" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/whatwedo' onClick={closeMenu} className={({isActive}) => (isActive ? 'active-link' : '')}>
              What We Do
            </NavLink>
          </li>
          <li>
            <NavLink to='/ourteam' onClick={closeMenu} className={({isActive}) => (isActive ? 'active-link' : '')}>
              Our Team
            </NavLink>
          </li>
          <li>
            <NavLink to='/contact' onClick={closeMenu} className={({isActive}) => (isActive ? 'active-link' : '')}>
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to='/ProductList' onClick={closeMenu} className={({isActive}) => (isActive ? 'active-link' : '')}>
              Shop
            </NavLink>
          </li>

          {/* Conditionally render the Cart link only if the cart has items */}
          {cart.length > 0 && (
            <li>
              <NavLink to='/Cart' onClick={closeMenu} className={({isActive}) => (isActive ? 'active-link' : '')}>
              <p><FaShoppingBag /></p> ({cart.reduce((acc, item) => acc + item.quantity, 0)})
              </NavLink>
            </li>
          )}
          
        </ul>
      </nav>
      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
    </header>
  );
};

export default Navbar;
