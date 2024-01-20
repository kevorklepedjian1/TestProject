// Import necessary dependencies and components
import React, { useRef, useState, useEffect } from 'react';
import SongRow from './SongRow';
import PlayAllButton from './PlayAllButton';
import MusicUploadForm from './MusicUploadForm';
import AddAllButton from './AddAllButton';
import { useSongContext } from '../context/SongContext';  // Import the useSongContext hook

// Define the SongList component
const SongList = () => {
  // Ref to the audio element
  const audioRef = useRef(null);

  // Use the useSongContext hook to get songsData and addSong function
  const { songsData, addSong } = useSongContext();

  // State variables to manage the component's state
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [isInitialPlay, setIsInitialPlay] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAscendingOrder, setIsAscendingOrder] = useState(true);
  const [sortedSongs, setSortedSongs] = useState([]);
  const [queue, setQueue] = useState([]);

  // Effect to handle the end of a song when playing all
  useEffect(() => {
    const handleSongEnd = () => {
      if (isPlayingAll) {
        const nextSongIndex = currentSongIndex + 1;
        if (nextSongIndex < sortedSongs.length) {
          audioRef.current.src = sortedSongs[nextSongIndex].audioFile;
          audioRef.current.play();
          setCurrentSongIndex(nextSongIndex);
        } else {
          setIsPlayingAll(false);
        }
      }
    };

    // Add event listener for the 'ended' event on the audio element
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleSongEnd);
    }

    // Remove event listener when component unmounts or dependencies change
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleSongEnd);
      }
    };
  }, [isPlayingAll, currentSongIndex, sortedSongs]);

  // Effect to set the initial sortedSongs state from the songsData
  useEffect(() => {
    setSortedSongs([...songsData]);
  }, [songsData]);

  // Function to play a specific song
  const playSong = (audioFile, songId) => {
    if (audioRef.current) {
      if (currentSongIndex === songId) {
        audioRef.current.paused ? audioRef.current.play() : audioRef.current.pause();
      } else {
        audioRef.current.src = audioFile;
        audioRef.current.play();
        setCurrentSongIndex(songId);
        setIsPlayingAll(false);
      }
    }
  };

  // Function to play all songs
  const playAll = () => {
    if (audioRef.current) {
      if (isPlayingAll) {
        audioRef.current.pause();
      } else {
        const nextSongIndex = isInitialPlay ? currentSongIndex : 0;
        audioRef.current.src = sortedSongs[nextSongIndex].audioFile;
        audioRef.current.play();
        setCurrentSongIndex(nextSongIndex);
      }
      setIsPlayingAll(!isPlayingAll);
    }
  };

  // Function to handle file upload and add new song using context function
  const handleFileUpload = (newSongData) => {
    const newSong = {
      id: sortedSongs.length + 1,
      artist: newSongData.artist,
      trackId: newSongData.trackId,
      songName: newSongData.songName,
      audioFile: newSongData.audioFile,
    };

    // Add the new song using the context function
    addSong(newSong);
    
    if (!isPlayingAll && audioRef.current.paused) {
      audioRef.current.src = newSong.audioFile;
      setIsInitialPlay(false);
    }
  };

  // Function to add all songs to the queue
  const handleAddAll = () => {
    setQueue([...sortedSongs]);
  };
console.log(queue);
  // Function to sort songs by track number
  const handleSortByTrack = () => {
    const newSortedSongs = [...sortedSongs];
    newSortedSongs.sort((a, b) => {
      const factor = isAscendingOrder ? 1 : -1;
      return factor * (parseInt(a.trackId) - parseInt(b.trackId));
    });
    setSortedSongs(newSortedSongs);
    setIsAscendingOrder(!isAscendingOrder);
  };

  // Filtering songs based on the search query
  const filteredSongs = sortedSongs.filter((song) =>
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.trackId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.songName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render the SongList component
  return (
    <div className=''>
      <div className=''>
        <div className='flex items-center justify-center mt-4'>
          <div className='flex flex-col sm:flex-row justify-between items-center mb-8 rounded-md header '>
            <div className='flex items-center mb-4 sm:mb-0'>
              {/* PlayAllButton and AddAllButton components */}
              <PlayAllButton playAll={playAll} songs={sortedSongs} />
              <AddAllButton onAddAll={handleAddAll} />
            </div>
            <div className='flex items-center'>
              {/* Button to sort songs by track number */}
              <button
                className='ml-4 px-3 py-1 text-black rounded-md mr-5'
                onClick={handleSortByTrack}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M6.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.25 4.81V16.5a.75.75 0 0 1-1.5 0V4.81L3.53 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5Zm9.53 4.28a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V7.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                </svg>
                Track Number
              </button>
              {/* Search input */}
              <div className='relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='gray'
                  className='w-4 h-4 absolute left-3 top-2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                  />
                </svg>
                <input
                  type='text'
                  className='search pl-8 pr-2 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring mr-5'
                  placeholder='Search songs...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto '>
        {/* Table to display the songs */}
        <table className='w-full border-collapse border' cellpadding="pixels" cellspacing="pixels">
          <thead>
            <tr>
              <th></th>
              <th className='p-2 border-b'>Artist Name</th>
              <th className='p-2 border-b'>Track ID</th>
              <th className='p-2 border-b'>Song Name</th>
              <th className='p-2 border-b'>Play Button</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {/* Mapping through filteredSongs and rendering SongRow components */}
            {filteredSongs.map((song) => (
              <SongRow
                key={song.id}
                song={song}
                playSong={playSong}
                currentSong={currentSongIndex}
                audioRef={audioRef}
              />
            ))}
          </tbody>
        </table>
        {/* Audio element for playing songs */}
        <audio ref={audioRef} controls={false} autoPlay={false} />
        {/* MusicUploadForm component for uploading new songs */}
        <MusicUploadForm onFileUpload={handleFileUpload} />
      </div>
    </div>
  );
};

// Export the SongList component
export default SongList;
