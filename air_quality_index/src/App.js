import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Mainpage from './components/mainpage/mainpage';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapPage from './components/mappage/mappage';
import Chatbot from './components/chatbot/chatbot';
import Test from './components/test/test';
 //import searchbar from './components/Header/searchbar/searchbar';
import Header from './components/Header/header';
import Aqiranking from './components/aqiranking/aqiranking';

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
          <Route path="/test" element={<Test/>}/>
          <Route path="/searchbar" element={<searchbar/>}/>
          <Route path="/header" element={<Header/>}/>
          <Route path='/aqiranking' element={<Aqiranking/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
