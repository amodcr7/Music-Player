import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaPlay } from 'react-icons/fa';
import './Playlist.scss';

const Playlist = ({ songs, currentSongId, onSelectSong, onToggleFavorite, favorites }) => {
  return (
    <div className="playlist-container">
      <ListGroup className="playlist">
        {songs.map((song) => (
          <ListGroup.Item 
            key={song.id}
            className={`playlist-item ${currentSongId === song.id ? 'active' : ''}`}
            onClick={() => onSelectSong(song)}
          >
            <div className="song-info">
              <img 
                src={song.thumbnail} 
                alt={song.title} 
                className="song-thumbnail"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCI+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjZWVlIi8+PHRleHQgeD0iMjUiIHk9IjI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                }}
              />
              <div className="song-details">
                <h5 className="song-title">{song.title}</h5>
                <p className="song-artist">{song.artistName}</p>
                <p className="song-duration">{formatDuration(song.duration)}</p>
              </div>
            </div>
            <div className="song-actions">
              <button 
                className="action-btn favorite-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(song.id, e);
                }}
              >
                {favorites.includes(song.id) ? (
                  <FaHeart className="favorite" />
                ) : (
                  <FaRegHeart />
                )}
              </button>
              <button 
                className="action-btn play-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectSong(song);
                }}
              >
                <FaPlay />
              </button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

// Helper function to format duration (seconds to MM:SS)
const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export default Playlist;