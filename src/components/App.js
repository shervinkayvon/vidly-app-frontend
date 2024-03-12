import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link as RouterLink, useLocation } from "react-router-dom";
import { Tabs, Tab, AppBar, Button, LinearProgress } from "@mui/material";

import LoginPage from "../components/LoginPage/LoginPage";
import HomePage from "../components/HomePage/HomePage";
import CustomersPage from "./CustomersPage/CustomersPage";
import RentalsPage from "./RentalsPage/RentalsPage";
import ReturnsPage from "./ReturnsPage/ReturnsPage";
import UsersPage from "./UsersPage/UsersPage";
import GenresPage from "./GenresPage/GenresPage";
import MoviesPage from "./MoviesPage/MoviesPage";
import './App.css';

function AppBarWithTabs() {
  const location = useLocation();

  const routes = [
    '/',
    '/customers',
    '/rentals',
    '/returns',
    '/users',
    '/genres',
    '/movies',
  ];

  if (location.pathname === '/login') {
    return null; // Do not render the AppBar and Tabs on the login page
  }

  return (
    <div style={{ position: 'relative' }}>
      <AppBar color='transparent'>
        <div style={{ position: 'relative', width: '100%', maxWidth: 1200, margin: '0 auto' }}>
          <Tabs
            // style={{ maxWidth: 1200, margin: '0 auto' }} 
            value={location.pathname}
            indicatorColor="primary"
            textColor="primary"
          >
            {routes.map((route) => (
              <Tab
                value={route}
                key={route}
                component={RouterLink}
                to={route}
                label={route === '/' ? 'Home' : route.replace('/', '')}
              />
            ))}
          </Tabs>
          <Button 
            style={{ position: 'absolute', right: 0, top: 6, marginRight: 30 }}
            variant="outlined"
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
          >
            Logout
          </Button>
        </div>
      </AppBar>
    </div>
  );
}

function App() {
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token && window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className="App">
      {token ?
        <BrowserRouter>
          <AppBarWithTabs />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/rentals" element={<RentalsPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/genres" element={<GenresPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      :
        <LoginPage />
      }
    </div>
  );
}


export default App;
