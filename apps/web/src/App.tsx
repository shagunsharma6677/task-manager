import RootLayout from '@/layouts/RootLayout';
import { Fragment, useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import './App.css';
import { Toaster } from './components/ui/toaster';
import Authentication from './pages/Authentication';
import Dashboard from './pages/Dashboard';

function App() {
  const [isAuth, setisAuth] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem('token');
    if (loggedIn) {
      setisAuth(true);
    } else {
      setisAuth(false);
      navigate('/login');
    }
  }, [location.pathname]);

  return (
    <RootLayout>
      <Routes>
        {isAuth ? (
          <Fragment>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Fragment>
        ) : (
          <Route path="/login" element={<Authentication />} />
        )}
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Authentication />} />
      </Routes>
      <Toaster />
    </RootLayout>
  );
}

export default App;
