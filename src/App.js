import NIGSTAdmin from './Dashboard/NIGSTAdmin';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './Dashboard/Login'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='admin' element={<NIGSTAdmin/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
