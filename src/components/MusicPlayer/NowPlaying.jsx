import React from 'react';
import './NowPlaying.scss';

const NowPlaying = ({ currentSong }) => {
  if (!currentSong) return null;

  return (
    <div className="now-playing">
      <div className="album-art">
        <img src={currentSong.thumbnail} alt={currentSong.title} />
      </div>
      <div className="song-info">
        <h4 className="song-title">{currentSong.title}</h4>
        <p className="artist-name">{currentSong.artistName}</p>
      </div>
    </div>
  );
};

export default NowPlaying;