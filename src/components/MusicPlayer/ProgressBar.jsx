import React from 'react';
import './ProgressBar.scss';

const ProgressBar = ({ currentTime, duration, handleSeek }) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="progress-container">
      <span className="time">{formatTime(currentTime)}</span>
      <input
        type="range"
        min="0"
        max={duration || 100}
        value={currentTime}
        onChange={handleSeek}
        className="progress-bar"
      />
      <span className="time">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;