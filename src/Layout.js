import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

export default function Layout({ children }) {
  return (
    <>
      <Header /> {/* Renders the header component */}
      <Outlet /> {/* Renders the child components */}
      <Footer /> {/* Renders the footer component */}
    </>
  );
}
