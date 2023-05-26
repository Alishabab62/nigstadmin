import NIGSTAdmin from './Dashboard/NIGSTAdmin';
import { HashRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './Dashboard/Login'
import FacultyAdmin from './Dashboard/FacultyAdmin'
import Faculty from './Dashboard/Faculty';
import Private from './Dashboard/Private';
import ChangePassword from './Dashboard/ChangePassword';
import ForgotPassword from './Dashboard/ForgotPassword';

function App() {

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/admin' element={
            <Private path={"NIGST Admin"}><NIGSTAdmin/></Private>
          }></Route>
          <Route path='/facultyadmin' element={
            <Private path={"Faculty Admin"}><FacultyAdmin/></Private>
          }></Route>
          <Route path='/faculty' element={
            <Private path={"faculty"}><Faculty/></Private>
          }></Route>
          <Route path='/password/:token' element={<ChangePassword/>}></Route>
          <Route path='/forgot' element={<ForgotPassword/>}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
