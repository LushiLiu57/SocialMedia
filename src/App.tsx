import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Main } from './pages/main/main';
import { Login } from './pages/login';
import { Nav } from './component/nav';
import { CreatePost } from './pages/createpost/createpost';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav/>
        <Routes>
          <Route path ='/' element={<Main/>}></Route>
          <Route path ='/login' element={<Login/>}></Route>
          <Route path='/createpost' element={<CreatePost/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
