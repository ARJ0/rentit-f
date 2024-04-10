import React, { useState, useEffect } from 'react';

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import MessageIcon from '@mui/icons-material/Message';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HistoryIcon from '@mui/icons-material/History';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.svg';
import AddToCart from '../pages/AddToCart';
import { accountType, getlocalStorage } from '../services/helper';
import UploadEquipment from './UploadEquipment';
import RequestSideBar from '../pages/RequestSideBar';
import History from '../pages/History';
import '../css/_header.css'

const Header = () => {
  const flag = accountType();
  const userData = getlocalStorage("loggedUser");
  const navigate = useNavigate();
  const handleLogout = () => {
    if (userData?._id) {
      navigate("/")
    } else {
      navigate("/login")
    }
    localStorage.clear();
  }

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);

  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRequestSideBar, setRequestSideBar] = useState(false);
  const [isHistory, setIsHistory] = useState(false);

  const historySidebar = () => {
    setIsHistory(true);
  };

  const closeHistorySidebar = () => {
    setIsHistory(false);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openRequestSideBar = () => {
    setRequestSideBar(true);
  };

  const closeRequestSideBar = () => {
    setRequestSideBar(false);
  };

  useEffect(() => {
    const mobileNav = document.querySelector(".hamburger");
    const navbar = document.querySelector(".menubar");
    
    const toggleNav = () => {
      navbar.classList.toggle("active");
      mobileNav.classList.toggle("hamburger-active");
    };
    mobileNav.addEventListener("click", () => toggleNav());
  }, [])
  


  return (
    <>
     <nav className="brand-bg">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <ul className="align-items-center text-white">
          {userData?._id && (
            <>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/explore">Explore</a>
              </li>
            </>
          )}
          {flag.company && userData?._id && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/your-equipment">Your Equipment</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/your-request">Your Request</a>
              </li>
            </>
          )}
          {flag.company && (
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={() => { setIsOpen(true) }}>
                Add Equipment <ControlPointIcon sx={{ fontSize: 20 }} />
              </button>
            </li>
          )}
          {flag.user && userData?._id && (
            <>
              <li className='nav-item'>
                <button className='btn text-white border-0' value='bag icon' onClick={() => { openSidebar() }}>
                <ShoppingBagIcon sx={{ fontSize: 30 }} />
                <a style={{fontSize:'20px', marginLeft:'5px'}}>Cart</a>
                </button>
              </li>
              <li className="nav-item">
                <button className="btn text-white border-0" onClick={() => { openRequestSideBar() }}>
                  <MessageIcon sx={{ fontSize: 30 }} />
                  <a style={{fontSize:'20px', marginLeft:'5px'}}>Request</a>
                </button>
              </li>
              <li className="nav-item">
                <button className="btn text-white border-0" onClick={() => { historySidebar() }}>
                  <HistoryIcon sx={{ fontSize: 30 }} />
                  <a style={{fontSize:'20px', marginLeft:'5px'}}>History</a>
                </button>
              </li>
            </>
          )}
          <li className="nav-item">
            <button className="btn btn-outline-light" onClick={handleLogout}>{userData?._id ? "Logout" : "Login"}</button>
          </li>
        </ul>
        <div className="hamburger">
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </nav>
      <div className="menubar">
        <ul className="align-items-center">
          {userData?._id && (
            <>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/explore">Explore</a>
              </li>
            </>
          )}
          {flag.company && userData?._id && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/your-equipment">Your Equipment</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/your-request">Your Request</a>
              </li>
            </>
          )}
          {flag.company && (
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={() => { setIsOpen(true) }}>
                Add Equipment <ControlPointIcon sx={{ fontSize: 20 }} />
              </button>
            </li>
          )}
          {flag.user && userData?._id && (
            <>
              <li className='nav-item'>
                <button className='btn border-0' value='bag icon' onClick={() => { openSidebar() }}>
                  <ShoppingBagIcon sx={{ fontSize: 30 }} />
                </button>
              </li>
              <li className="nav-item">
                <button className="btn border-0" onClick={() => { openRequestSideBar() }}>
                  <MessageIcon sx={{ fontSize: 30 }} />
                </button>
              </li>
              <li className="nav-item">
                <button className="btn border-0" onClick={() => { historySidebar() }}>
                  <HistoryIcon sx={{ fontSize: 30 }} />
                </button>
              </li>
            </>
          )}
          <li className="nav-item">
            <button className="btn btn-outline-light text-dark" onClick={handleLogout}>{userData?._id ? "Logout" : "Login"}</button>
          </li>
        </ul>
      </div>
      {isSidebarOpen && (
          <AddToCart closeSidebar={closeSidebar}/>
      )}
      {isRequestSideBar && (
        <RequestSideBar closeSidebar={closeRequestSideBar}/>
      )}
      {isHistory &&  (
        <History  closeSidebar={closeHistorySidebar}/>
      )}
      {isOpen && <UploadEquipment closeModal={closeModal}/>}
    </>
  )
}

export default Header;
