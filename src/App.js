import NIGSTAdmin from './Dashboard/NIGSTAdmin';
import { HashRouter , Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './Dashboard/Login'
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='admin' element={<NIGSTAdmin/>}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
