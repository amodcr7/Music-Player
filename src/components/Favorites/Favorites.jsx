import React from 'react';
import Playlist from '../MusicPlayer/Playlist';
import './Favorites.scss';

const Favorites = ({ 
  songs, 
  currentSongId, 
  onSelectSong, 
  onToggleFavorite,
  favorites 
}) => {
  const favoriteSongs = songs.filter(song => favorites.includes(song.id));

  return (
    <div className="favorites">
      <h2 className="section-title">Favorites</h2>
      {favoriteSongs.length > 0 ? (
        <Playlist 
          songs={favoriteSongs} 
          currentSongId={currentSongId} 
          onSelectSong={onSelectSong}
          onToggleFavorite={onToggleFavorite}
          favorites={favorites}
        />
      ) : (
        <p className="empty-message">No favorite songs yet</p>
      )}
    </div>
  );
};

export default Favorites;