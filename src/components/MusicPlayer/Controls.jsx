import React from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaRandom, FaRedoAlt } from 'react-icons/fa';
import './Controls.scss';

const Controls = ({ isPlaying, togglePlay, onNext, onPrev, onShuffle, onRepeat }) => {
  return (
    <div className="controls">
      <button className="control-btn" onClick={onShuffle}>
        <FaRandom />
      </button>
      <button className="control-btn" onClick={onPrev}>
        <FaStepBackward />
      </button>
      <button className="control-btn play-btn" onClick={togglePlay}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <button className="control-btn" onClick={onNext}>
        <FaStepForward />
      </button>
      <button className="control-btn" onClick={onRepeat}>
        <FaRedoAlt />
      </button>
    </div>
  );
};

export default Controls;