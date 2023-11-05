import { ReactNode } from 'react';
import Navbar from '../components/navbar';
import './styles/globals.css';
import React from 'react';
import { AuthProvider } from '../contexts/Authcontext';

type LayoutProps = {
  children: ReactNode;
  showNavbar?: boolean;
};

const Layout = ({ children, showNavbar = true }: LayoutProps) => {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {showNavbar && <Navbar />}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;
