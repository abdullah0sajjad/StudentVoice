import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './scss/style.scss';
import Dashboard from './Component/Dashboard';
import Navbar from './Component/OtherComponent/navbar';
import Sidebar from './Component/OtherComponent/Sidebar';


function App() {
  return (
   <Router>
      <Navbar />
      <Sidebar>
        <Routes>
          <Route path='/' exact Component={Dashboard} />
        </Routes>
      </Sidebar>
   </Router>
  );
}

export default App;
