// src/App.js
import React from 'react';
import SongList from './components/SongList';

import { SongProvider } from './context/SongContext';

const App = () => {
  return (
    <SongProvider>
      <SongList />
    </SongProvider>
   
  );
};

export default App;
