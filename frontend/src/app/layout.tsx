import { ReactNode } from 'react';
import Navbar from '../components/navbar';
// import '/Users/andrewjaehahn/github/HackSC/frontend/src/app/globals.css';
// /Users/andrewjaehahn/github/HackSC/frontend/src/app/globals.css
// import type { AppProps } from 'next/app';
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
