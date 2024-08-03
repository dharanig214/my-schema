import React from 'react';
import './App.css';
//import savesegment from './savesegment';
import { SaveSegment } from './segments/savesegment';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Enter the name of the Segment </h1>
        
        <SaveSegment />
      </header>
    </div>
  );
}

export default App;



    