import { Route, Routes, useLocation, Navigate } from "react-router-dom";

import Home from './components/Home'
import Layout from './Layout'
import { useState } from 'react';
import Login from './Login';
import Registration from './Registration';
import Explore from "./pages/Explore";
import FAQ from './components/faq'
import './css/index.css'
import './css/index.scss'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { YourEquipment } from "./pages/YourEquipment";
import Request from "./components/Request";
import Career from "./components/Career";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  const location = useLocation();
  return (
    
    <div className="App">
       <PayPalScriptProvider options={{ clientId: "AQGNrHPuNKeyhzSzzXzX1GP0eLqb-fqYHOEF9i7aVaBUqGc1wGKBKs7MUkrac6bmCXhQIOLgdwkDv4fk", components: "buttons", currency: "CAD" }}>
    <ToastContainer />
    <Routes key={location.pathname} location={location}>
      <Route exact path='/' element={<Layout />}> 
        <Route index element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/your-equipment" element={<YourEquipment/>} />
        <Route path="/your-request" element={<Request/>} />
        <Route path="/your-request" element={<Request/>} />
        <Route path="/FAQ" element={<FAQ/>} />
        <Route path="/Careers" element={<Career/>} />
        <Route path="/AboutUs" element={<AboutUs/>} />
        <Route path="/ContactUs" element={<ContactUs/>} />
      </Route>
    </Routes>
    </PayPalScriptProvider>
    </div>
  );
}

export default App;