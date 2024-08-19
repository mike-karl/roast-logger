import './App.css';

import Home from './Components/Home/Home';
import RoastLogForm from './Components/RoastLogForm/Add-RoastLog/Add-RoastLog'
import Layout from './Components/Layout';
import RoastLog from './Components/RoastLogForm/RoastLog'
import Login from './Components/Login';
import Signup from './Components/Signup';
import Unauthorized from './Components/Unauthorized'
import Missing from './Components/Missing'
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import RequireAuth from './Components/RequireAuth';
import PersistLogin from './Components/PersistLogin';

function App() {

  
  return (
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* public routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* Protected routes */}
          <Route element={<PersistLogin />} >
            <Route element={<RequireAuth />}>
              <Route path='/' element={<Home />} />
            </Route>

            <Route element={<RequireAuth />}>
            <Route path='/mantraCoffee/add-roast-log' element={<RoastLogForm />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path='/mantraCoffee/:id' element={<RoastLog />} />
            </Route>
            {/* Catch All */}
            <Route path='*' element={<Missing />} />
          </Route>
        </Route>
      </Routes>
  );
}

export default App;
