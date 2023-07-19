import React, { useState } from 'react';
import './dashboard.css';
import MoonImage from './moon.svg';
import searchImage from './searchimage.svg';
import arrowImage from './arrowimage.svg';

const Dashboard: React.FC = () => {
  const [isMoonClicked, setIsMoonClicked] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleMoonClick = () => {
    setIsMoonClicked(!isMoonClicked);
  };

  const handleArrowClick = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const bodyStyle = {
    backgroundColor: isMoonClicked ? '#202C36' : 'white',
    color: isMoonClicked ? '#fff' : '#000', // Text color
  };

  const navbarStyle = {
    backgroundColor: isMoonClicked ? '#2B3844' : '#fff', // Background color of the navbar in dark mode
    color: isMoonClicked ? '#fff' : '#000', // Text color of the navbar
  };

  const popupStyle = {
    display: isPopupVisible ? 'block' : 'none',
  };

  return (
    <div className="body" style={bodyStyle}>
      <nav className="navbar" style={navbarStyle}>
        <p style={{ color: navbarStyle.color }}>Where in the world?</p>
        <span style={{ color: navbarStyle.color }}>Dark Mode</span>
        <img
          src={MoonImage}
          alt=""
          className={`moonImage ${isMoonClicked ? 'clicked' : ''}`}
          onClick={handleMoonClick}
        />
      </nav>
      <div className="searchBox1">
        <img src={searchImage} className="searchImage" alt="Search Icon" />
        <p>Search for a country...</p>
      </div>

      <div className="searchBox2" onClick={handleArrowClick}>
        <img src={arrowImage} className="arrowImage" alt="Arrow Icon" />
        <p>Filter by Region</p>
      </div>

      {/* Popup Content */}
      <div className="popup" style={popupStyle}>
        <p>Africa</p>
        <p>America</p>
        <p>Asia</p>
        <p>Europe</p>
        <p>Oceania</p>
      </div>

      <div>
        <div className="girdContainer"></div>
        <div className="rectangle1"></div>
        <div className="rectangle2"></div>
        <div className="rectangle3"></div>
        <div className="rectangle4"></div>
        <div className="rectangle5"></div>
        <div className="rectangle6"></div>
      </div>
    </div>
  );
};

export default Dashboard;
