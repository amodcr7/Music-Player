import { useState, useRef, useEffect } from 'react';

const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isBuffering, setIsBuffering] = useState(false);
  const audioRef = useRef(null);
  const loadTimeoutRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            setError('Failed to play audio. Please check if the audio file exists and is accessible.');
            console.error('Play error:', error);
          });
        }
      }
      setIsPlaying(!isPlaying);
      setError(null);
    } catch (err) {
      setError('Failed to play/pause audio');
      console.error('Audio playback error:', err);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration || 0);
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    
    try {
      const newTime = e.target.value;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setError(null);
    } catch (err) {
      setError('Failed to seek audio');
      console.error('Seek error:', err);
    }
  };

  const handleVolumeChange = (e) => {
    if (!audioRef.current) return;
    
    try {
      const newVolume = e.target.value;
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      setError(null);
    } catch (err) {
      setError('Failed to change volume');
      console.error('Volume change error:', err);
    }
  };

  const playSong = async (url) => {
    if (!audioRef.current) return;
    
    setIsLoading(true);
    setError(null);
    setIsBuffering(true);
    
    // Clear any existing timeout
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }
    
    try {
      // Set a timeout for loading
      loadTimeoutRef.current = setTimeout(() => {
        if (isLoading) {
          setError('Song is taking too long to load. Please try again.');
          setIsLoading(false);
          setIsBuffering(false);
        }
      }, 15000); // 15 seconds timeout
      
      // Create a new audio element to preload
      const preloadAudio = new Audio();
      
      // Set up event listeners for the preload audio
      preloadAudio.addEventListener('canplaythrough', () => {
        // Once the audio is loaded, set it as the source for the main audio element
        audioRef.current.src = url;
        
        // Try to play the audio
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setIsLoading(false);
              setIsBuffering(false);
              if (loadTimeoutRef.current) {
                clearTimeout(loadTimeoutRef.current);
              }
            })
            .catch(err => {
              setError('Failed to play audio. Please try again.');
              console.error('Play error:', err);
              setIsPlaying(false);
              setIsLoading(false);
              setIsBuffering(false);
              if (loadTimeoutRef.current) {
                clearTimeout(loadTimeoutRef.current);
              }
            });
        }
      });
      
      // Set up error handling for preload
      preloadAudio.addEventListener('error', (e) => {
        setError('Failed to load audio. The file may be unavailable or corrupted.');
        console.error('Preload error:', e);
        setIsLoading(false);
        setIsBuffering(false);
        if (loadTimeoutRef.current) {
          clearTimeout(loadTimeoutRef.current);
        }
      });
      
      // Start loading the audio
      preloadAudio.src = url;
      
    } catch (err) {
      setError('Failed to load or play audio. Please try again.');
      console.error('Song loading error:', err);
      setIsPlaying(false);
      setIsLoading(false);
      setIsBuffering(false);
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', () => setIsPlaying(false));
      audio.addEventListener('error', (e) => {
        setError('Audio playback error occurred. Please try again.');
        console.error('Audio error:', e);
      });
      audio.addEventListener('waiting', () => setIsBuffering(true));
      audio.addEventListener('playing', () => setIsBuffering(false));
      audio.volume = volume;
    }

    return () => {
      if (audio) {
        audio.volume = volume;
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', () => setIsPlaying(false));
        audio.removeEventListener('error', (e) => {
          setError('Audio playback error occurred. Please try again.');
          console.error('Audio error:', e);
        });
        audio.removeEventListener('waiting', () => setIsBuffering(true));
        audio.removeEventListener('playing', () => setIsBuffering(false));
      }
      
      // Clear any existing timeout when component unmounts
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
  }, [volume]);

  return {
    audioRef,
    isPlaying,
    duration,
    currentTime,
    volume,
    isLoading,
    isBuffering,
    error,
    togglePlay,
    handleSeek,
    handleVolumeChange,
    playSong,
  };
};

export default useAudioPlayer;