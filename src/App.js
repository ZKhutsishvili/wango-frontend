import './App.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import Topbar from './components/Topbar';
import React, { useEffect } from 'react';
import Homepage from './pages/homepage/Homepage.jsx';
import NoPage from './pages/no-page/NoPage.jsx';
import RegisterPage from './pages/register/Register.jsx';
import LoginPage from './pages/login/Login.jsx';
import { useCookies } from 'react-cookie';
import { backendAxiosClient } from './utilities/apiClients.js';
import Parking from './pages/parking/Parking.jsx';

function App() {
  const [cookies] = useCookies();
  useEffect(() => {
    const token = cookies['token']
    if (token) {
      backendAxiosClient.interceptors.request.use(
        config => {
          config.headers.Authorization = `Bearer ${token}`
          return config
        },
        error => Promise.reject(error)
      )
    }
  }, [cookies])
  return (<Row className='col-12 m-0 p-0 vh-100 bg-light'>
      <BrowserRouter>
      <Col className="col-12 m-0 p-0">
        <Topbar />
        <Row className='m-0 p-0 vh-95'>
          <Col className="col-12 m-0 p-0">
                <Routes>
                  <Route path="/" element={<Outlet/>}>
                    <Route path='' element={<Homepage />} />
                    <Route path='home' element={<Homepage />} />
                    <Route path='register' element={<RegisterPage />} />
                    <Route path='parking' element={<Parking />} />
                    <Route path='login' element={<LoginPage />} />
                    <Route path="*" element={<NoPage />} />
                  </Route>
                </Routes>
          </Col>
        </Row>
      </Col>
      </BrowserRouter>
    </Row>
  );
}

export default App;
