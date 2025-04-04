import React from 'react';
import Playlist from '../MusicPlayer/Playlist';
import './RecentlyPlayed.scss';

const RecentlyPlayed = ({ 
  songs, 
  currentSongId, 
  onSelectSong, 
  onToggleFavorite,
  favorites,
  recentlyPlayed 
}) => {
  const recentSongs = recentlyPlayed
    .map(id => songs.find(song => song.id === id))
    .filter(song => song !== undefined);

  return (
    <div className="recently-played">
      <h2 className="section-title">Recently Played</h2>
      {recentSongs.length > 0 ? (
        <Playlist 
          songs={recentSongs} 
          currentSongId={currentSongId} 
          onSelectSong={onSelectSong}
          onToggleFavorite={onToggleFavorite}
          favorites={favorites}
        />
      ) : (
        <p className="empty-message">No recently played songs</p>
      )}
    </div>
  );
};

export default RecentlyPlayed;