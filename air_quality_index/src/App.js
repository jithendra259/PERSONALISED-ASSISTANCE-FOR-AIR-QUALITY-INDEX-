import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Mainpage from './components/mainpage/mainpage';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapPage from './components/mappage/mappage';
import Chatbot from './components/chatbot/chatbot';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mainpage" element={<Mainpage />} />
          <Route path="" element={<Navigate to="/header" />} />
          <Route path="/mappage" element={<MapPage/>}/>
          <Route path="/chatbot" element={<Chatbot/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
