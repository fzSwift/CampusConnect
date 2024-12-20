import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import EventList from './components/EventList';
import Register from './components/Register';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import CreateEvent from './components/CreateEvent';
import EditEvent from './components/EditEvent';
import CalendarView from './components/CalendarView';
import './App.css';
import './theme.css'; // Import the theme file

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/edit-event/:eventId" element={<EditEvent />} />
            <Route path="/calendar" element={<CalendarView />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;