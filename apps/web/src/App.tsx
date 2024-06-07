import RootLayout from '@/layouts/RootLayout';
import { Fragment } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from './components/ui/toaster';
import Authentication from './pages/Authentication';
import Dashboard from './pages/Dashboard';

function App() {
  const loggedIn = localStorage.getItem('token');

  return (
    <RootLayout>
      <Routes>
        {loggedIn ? (
          <Fragment>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Fragment>
        ) : (
          <Route path="/login" element={<Authentication />} />
        )}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </RootLayout>
  );
}

export default App;
