import React from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import './VolumeControl.scss';

const VolumeControl = ({ volume, handleVolumeChange, toggleMute, isMuted }) => {
  return (
    <div className="volume-control">
      <button className="volume-btn" onClick={toggleMute}>
        {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={isMuted ? 0 : volume}
        onChange={handleVolumeChange}
        className="volume-slider"
      />
    </div>
  );
};

export default VolumeControl;