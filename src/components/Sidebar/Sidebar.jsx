import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaHome, FaHeart, FaHistory, FaMusic } from 'react-icons/fa';
import './Sidebar.scss';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <div className="logo">
        <FaMusic className="logo-icon" />
        <h3>Music Player</h3>
      </div>
      <Nav className="flex-column">
        <Nav.Link 
          className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <FaHome className="nav-icon" />
          <span>Home</span>
        </Nav.Link>
        <Nav.Link 
          className={`nav-link ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          <FaHeart className="nav-icon" />
          <span>Favorites</span>
        </Nav.Link>
        <Nav.Link 
          className={`nav-link ${activeTab === 'recent' ? 'active' : ''}`}
          onClick={() => setActiveTab('recent')}
        >
          <FaHistory className="nav-icon" />
          <span>Recently Played</span>
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;