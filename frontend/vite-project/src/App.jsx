import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import Register from './pages/Register';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import BookDetails from './pages/BookDetails';
import EditBook from './pages/EditBook';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className='grid grid-cols-1 justify-content-center'>
        <div className='flex items-center justify-center'>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/add_book" element={<AddBook />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/edit_book/:id" element={<EditBook />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
