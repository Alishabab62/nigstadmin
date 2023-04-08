import NIGSTAdmin from './Dashboard/NIGSTAdmin';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './Dashboard/Login'
import FacultyAdmin from './Dashboard/FacultyAdmin'
import Faculty from './Dashboard/Faculty';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/admin' element={<NIGSTAdmin/>}></Route>
          <Route path='/facultyadmin' element={<FacultyAdmin/>}></Route>
          <Route path='/faculty' element={<Faculty/>}></Route>
        </Routes>
      </BrowserRouter>
      {/* <FacultyAdmin/> */}
    </div>
  );
}

export default App;
