import { ReactNode } from 'react';
import Navbar from '../components/navbar';
import './styles/globals.css';
import React from 'react';
import { AuthProvider } from '../contexts/Authcontext';
import { LocationProvider } from '../contexts/Locationcontext';

type LayoutProps = {
  children: ReactNode;
  showNavbar?: boolean;
};

const Layout = ({ children, showNavbar = true }: LayoutProps) => {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LocationProvider>
            {showNavbar && <Navbar />}
            {children}
          </LocationProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;
