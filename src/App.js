import NIGSTAdmin from './Dashboard/NIGSTAdmin';
import { HashRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './Dashboard/Login'
import FacultyAdmin from './Dashboard/FacultyAdmin'
import Faculty from './Dashboard/Faculty';
import Private from './Dashboard/Private';
import ChangePassword from './Dashboard/ChangePassword';
function App() {

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/admin' element={
            <Private><NIGSTAdmin/></Private>
          }></Route>
          <Route path='/facultyadmin' element={
            <Private><FacultyAdmin/></Private>
          }></Route>
          <Route path='/faculty' element={
            <Private><Faculty/></Private>
          }></Route>
          <Route path='/password' element={<ChangePassword/>}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
