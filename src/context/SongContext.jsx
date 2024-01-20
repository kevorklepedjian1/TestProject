// src/context/SongContext.js
import React, { createContext, useContext, useState } from 'react';


const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [songsData, setSongsData] = useState([
    //  dummy data 
    // Example:
    { id: 1, artist: 'Artist 1', trackId: '001', songName: 'Song 1', audioFile: '/static/media/b.68e9be0168d87b9d956e.mp3' },
    { id: 2, artist: 'Artist 2', trackId: '002', songName: 'Song 2', audioFile: "/static/media/b.68e9be0168d87b9d956e.mp3"},
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const addSong = (newSong) => {
    setSongsData((prevSongsData) => [...prevSongsData, newSong]);
  };

  const contextValue = {
    songsData,
    addSong,
    isUploading,
    setIsUploading,
    uploadProgress,
    setUploadProgress,
  };

  return (
    <SongContext.Provider value={contextValue}>
      {children}
    </SongContext.Provider>
  );
};

export const useSongContext = () => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error('useSongContext must be used within a SongProvider');
  }
  return context;
};
