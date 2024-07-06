import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import TipCalculator from './components/TipCalculation';
import Registration from './components/UserRegistration';
import TipsRetrieval from './components/TipsRetrieval';
import './App.css';

function App() {
  return (
    <div className="container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tip-calculator" element={<TipCalculator />} />
          <Route path="/tip-retrieval" element={<TipsRetrieval />} />
        </Routes>
      </Router>
    </div>
  );
}

function Home() {
  return <h2>Welcome to Tip Manager!</h2>;
}

export default App;
