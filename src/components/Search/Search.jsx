import React from 'react';
import Playlist from '../MusicPlayer/Playlist';
import './Search.scss';

const Search = ({ 
  songs, 
  currentSongId, 
  onSelectSong, 
  onToggleFavorite,
  favorites,
  searchQuery 
}) => {
  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="search-results">
      <h2 className="section-title">Search Results for "{searchQuery}"</h2>
      {filteredSongs.length > 0 ? (
        <Playlist 
          songs={filteredSongs} 
          currentSongId={currentSongId} 
          onSelectSong={onSelectSong}
          onToggleFavorite={onToggleFavorite}
          favorites={favorites}
        />
      ) : (
        <p className="empty-message">No songs found</p>
      )}
    </div>
  );
};

export default Search;