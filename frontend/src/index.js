import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

//REACT ROUTER DOM
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from './pages/404';
import 'react-toastify/dist/ReactToastify.css';
import Overview from './pages/dashboard pages/Overview';
import VaccinatedPeople from './pages/dashboard pages/VaccinatedPeople';
import Dashboard from './pages/Dashboard';
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='register' element={<Register />} />
      <Route path='login' element={<Login />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route index element={<Overview />} />
      <Route path='vaccinatedpeople' element={<VaccinatedPeople />}>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
