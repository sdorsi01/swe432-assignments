import React from 'react';
import './App.css';
import BySong from './pages/BySong';
import ByArtist from './pages/ByArtist';
import ByTabs from './pages/ByTabs';

function App(){
  return(
    <div className='row'>
      <BySong />
      <ByTabs />
      <ByArtist />
    </div>
  );
}

export default App;
