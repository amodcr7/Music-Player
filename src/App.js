import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import songsData from './data/songs.json';
import useAudioPlayer from './hooks/useAudioPlayer';
import useStorage from './hooks/useStorage';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import NowPlaying from './components/MusicPlayer/NowPlaying';
import Controls from './components/MusicPlayer/Controls';
import ProgressBar from './components/MusicPlayer/ProgressBar';
import VolumeControl from './components/MusicPlayer/VolumeControl';
import Playlist from './components/MusicPlayer/Playlist';
import Favorites from './components/Favorites/Favorites';
import RecentlyPlayed from './components/RecentlyPlayed/RecentlyPlayed';
import Search from './components/Search/Search';
import './App.scss';

const App = () => {
  const [songs, setSongs] = useState(songsData);
  const [currentSong, setCurrentSong] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bgColor, setBgColor] = useState('linear-gradient(to bottom, #1e1e1e, #121212)');
  const [isMuted, setIsMuted] = useState(false);
  
  // Audio player hook
  const {
    audioRef,
    isPlaying,
    duration,
    currentTime,
    volume,
    isLoading,
    error,
    togglePlay,
    handleSeek,
    handleVolumeChange,
    playSong,
    stopSong
  } = useAudioPlayer();
  
  // Storage hooks
  const [favorites, setFavorites] = useStorage('favorites', [], 'local');
  const [recentlyPlayed, setRecentlyPlayed] = useStorage('recentlyPlayed', [], 'session');
  
  // Refs
  const bgRef = useRef(null);

  // Handle song selection
  const handleSelectSong = (song) => {
    if (currentSong && currentSong.id === song.id) {
      togglePlay();
      return;
    }
    
    setCurrentSong(song);
    playSong(song.musicUrl);
    
    // Update recently played
    const updatedRecentlyPlayed = [song.id, ...recentlyPlayed
      .filter(id => id !== song.id)
      .slice(0, 9)];
    setRecentlyPlayed(updatedRecentlyPlayed);
    
    // Set background color
    setBgColor(`linear-gradient(to bottom, #1e1e1e, #121212)`);
  };
  
  // Handle toggle favorite
  const handleToggleFavorite = (songId, e) => {
    e.stopPropagation();
    if (favorites.includes(songId)) {
      setFavorites(favorites.filter(id => id !== songId));
    } else {
      setFavorites([...favorites, songId]);
    }
  };
  
  // Handle next song
  const handleNextSong = () => {
    if (!currentSong || songs.length === 0) return;
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    handleSelectSong(songs[nextIndex]);
  };
  
  // Handle previous song
  const handlePrevSong = () => {
    if (!currentSong || songs.length === 0) return;
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    handleSelectSong(songs[prevIndex]);
  };
  
  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setActiveTab(query ? 'search' : 'home');
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume;
    } else {
      audioRef.current.volume = 0;
    }
    setIsMuted(!isMuted);
  };
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // Set initial song
  useEffect(() => {
    if (!currentSong && songs.length > 0) {
      setCurrentSong(songs[0]);
    }
  }, [songs, currentSong]);

  return (
    <div className="app" ref={bgRef} style={{ background: bgColor }}>
      <audio 
        ref={audioRef} 
        onEnded={handleNextSong}
        onError={(e) => console.error('Audio error:', e)}
      />
      
      {error && (
        <Alert variant="danger" className="error-alert slide-up">
          {error}
        </Alert>
      )}
      
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Header 
          onSearch={handleSearch} 
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        
        <Container fluid className="content-container">
          <Row>
            <Col lg={12} className="content-col">
              {isLoading ? (
                <div className="loading-spinner">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <>
                  {activeTab === 'home' && (
                    <Playlist 
                      songs={songs} 
                      currentSongId={currentSong?.id} 
                      onSelectSong={handleSelectSong}
                      onToggleFavorite={handleToggleFavorite}
                      favorites={favorites}
                      isPlaying={isPlaying}
                    />
                  )}
                  
                  {activeTab === 'favorites' && (
                    <Favorites 
                      songs={songs} 
                      currentSongId={currentSong?.id} 
                      onSelectSong={handleSelectSong}
                      onToggleFavorite={handleToggleFavorite}
                      favorites={favorites}
                      isPlaying={isPlaying}
                    />
                  )}
                  
                  {activeTab === 'recent' && (
                    <RecentlyPlayed 
                      songs={songs} 
                      currentSongId={currentSong?.id} 
                      onSelectSong={handleSelectSong}
                      onToggleFavorite={handleToggleFavorite}
                      favorites={favorites}
                      recentlyPlayed={recentlyPlayed}
                      isPlaying={isPlaying}
                    />
                  )}
                  
                  {activeTab === 'search' && (
                    <Search 
                      songs={songs} 
                      currentSongId={currentSong?.id} 
                      onSelectSong={handleSelectSong}
                      onToggleFavorite={handleToggleFavorite}
                      favorites={favorites}
                      searchQuery={searchQuery}
                      isPlaying={isPlaying}
                    />
                  )}
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>
      
      <div className="player-container">
        <div className="player">
          <div className="player-left">
            <NowPlaying currentSong={currentSong} isPlaying={isPlaying} />
          </div>
          
          <div className="player-center">
            <Controls 
              isPlaying={isPlaying} 
              togglePlay={togglePlay}
              onNext={handleNextSong}
              onPrev={handlePrevSong}
              disabled={!currentSong}
            />
            <ProgressBar 
              currentTime={currentTime} 
              duration={duration} 
              handleSeek={handleSeek}
              disabled={!currentSong}
            />
          </div>
          
          <div className="player-right">
            <VolumeControl 
              volume={volume} 
              handleVolumeChange={handleVolumeChange}
              toggleMute={toggleMute}
              isMuted={isMuted}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;