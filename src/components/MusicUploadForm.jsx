import React, { useState, useEffect } from 'react';
import { useSongContext } from '../context/SongContext';

const MusicUploadForm = () => {
  const {
    songsData,
    addSong,
    isUploading,
    setIsUploading,
    setUploadProgress,
  } = useSongContext();

  const [artist, setArtist] = useState('');
  const [songName, setSongName] = useState('');
  const [trackId, setTrackId] = useState('');
  const [audioFile, setAudioFile] = useState(null);

  useEffect(() => {
    console.log('MusicUploadForm mounted');

    return () => {
      console.log('MusicUploadForm unmounted');
    };
  }, []);

  const handleUpload = () => {
    if (artist && songName && trackId && audioFile) {
      console.log('Start uploading...');
      setIsUploading(true);

      const totalFiles = 1;
      let filesProcessed = 0;

      const interval = setInterval(() => {
        setUploadProgress((filesProcessed / totalFiles) * 100);

        if (filesProcessed >= totalFiles) {
          clearInterval(interval);

          setTimeout(() => {
            // Find the maximum id in the existing songs
            const maxId = Math.max(...songsData.map((song) => song.id), 0);

            const newSongData = {
              id: maxId + 1, // Assign a new id
              artist,
              songName,
              trackId,
              audioFile: URL.createObjectURL(audioFile),
            };

            addSong(newSongData);

            // Reset form fields
            resetForm();
          }, 200);
        }

        filesProcessed += 1;
      }, 200);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      setAudioFile(new Blob([e.target.result], { type: file.type }));
    };
    reader.readAsArrayBuffer(file);
  };

  const resetForm = () => {
    setArtist('');
    setSongName('');
    setTrackId('');
    setIsUploading(false);
    setUploadProgress(0);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Upload Music</h2>
      {renderInput('Artist Name', artist, (e) => setArtist(e.target.value))}
      {renderInput('Song Name', songName, (e) => setSongName(e.target.value))}
      {renderInput('Track ID', trackId, (e) => setTrackId(e.target.value))}
      {renderFileInput('Music Files', handleFileChange)}
      {renderUploadButton('Upload', handleUpload)}

      {isUploading && renderUploadModal()}
    </div>
  );

  function renderInput(label, value, onChange) {
    return (
      <label className="block mb-4">
        {label}:
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="border rounded px-2 py-1 w-full"
        />
      </label>
    );
  }

  function renderFileInput(label, onChange) {
    return (
      <label className="block mb-4">
        {label}:
        <input
          type="file"
          accept=".mp3, .wav"
          onChange={onChange}
          className="border rounded px-2 py-1 w-full"
        />
      </label>
    );
  }

  function renderUploadButton(text, onClick) {
    return (
      <button
        onClick={onClick}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 focus:outline-none"
      >
        {text}
      </button>
    );
  }

  function renderUploadModal() {
    return (
      <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="modal-content bg-white p-8 rounded shadow-lg">
          <h3 className="text-xl font-bold mb-4">Uploading...</h3>
          <progress value={isUploading} max="100" className="w-full" />
          <span className="block text-center mt-2">{isUploading}%</span>
        </div>
      </div>
    );
  }
};

export default MusicUploadForm;
