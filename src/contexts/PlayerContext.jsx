
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const PlayerContext = createContext({});

const initialState = {
  currentTrack: null,
  isPlaying: false,
  volume: 0.8,
  currentTime: 0,
  duration: 0,
  queue: [],
  queueIndex: 0,
  repeat: false,
  shuffle: false
};

function playerReducer(state, action) {
  switch (action.type) {
    case 'SET_TRACK':
      return {
        ...state,
        currentTrack: action.payload,
        isPlaying: true,
        currentTime: 0
      };
    
    case 'PLAY':
      return { ...state, isPlaying: true };
    
    case 'PAUSE':
      return { ...state, isPlaying: false };
    
    case 'TOGGLE_PLAY':
      return { ...state, isPlaying: !state.isPlaying };
    
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    
    case 'SET_TIME':
      return { ...state, currentTime: action.payload };
    
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    
    case 'SET_QUEUE':
      return {
        ...state,
        queue: action.payload,
        queueIndex: 0
      };
    
    case 'NEXT_TRACK':
      const nextIndex = state.queueIndex + 1;
      if (nextIndex < state.queue.length) {
        return {
          ...state,
          queueIndex: nextIndex,
          currentTrack: state.queue[nextIndex],
          currentTime: 0
        };
      }
      return state;
    
    case 'PREVIOUS_TRACK':
      const prevIndex = state.queueIndex - 1;
      if (prevIndex >= 0) {
        return {
          ...state,
          queueIndex: prevIndex,
          currentTrack: state.queue[prevIndex],
          currentTime: 0
        };
      }
      return state;
    
    case 'TOGGLE_REPEAT':
      return { ...state, repeat: !state.repeat };
    
    case 'TOGGLE_SHUFFLE':
      return { ...state, shuffle: !state.shuffle };
    
    default:
      return state;
  }
}

export function PlayerProvider({ children }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  const playTrack = (track, queue = []) => {
    dispatch({ type: 'SET_TRACK', payload: track });
    if (queue.length > 0) {
      dispatch({ type: 'SET_QUEUE', payload: queue });
    }
  };

  const play = () => dispatch({ type: 'PLAY' });
  const pause = () => dispatch({ type: 'PAUSE' });
  const togglePlay = () => dispatch({ type: 'TOGGLE_PLAY' });
  
  const setVolume = (volume) => dispatch({ type: 'SET_VOLUME', payload: volume });
  const setTime = (time) => dispatch({ type: 'SET_TIME', payload: time });
  const setDuration = (duration) => dispatch({ type: 'SET_DURATION', payload: duration });
  
  const nextTrack = () => dispatch({ type: 'NEXT_TRACK' });
  const previousTrack = () => dispatch({ type: 'PREVIOUS_TRACK' });
  
  const toggleRepeat = () => dispatch({ type: 'TOGGLE_REPEAT' });
  const toggleShuffle = () => dispatch({ type: 'TOGGLE_SHUFFLE' });

  const value = {
    ...state,
    playTrack,
    play,
    pause,
    togglePlay,
    setVolume,
    setTime,
    setDuration,
    nextTrack,
    previousTrack,
    toggleRepeat,
    toggleShuffle
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
