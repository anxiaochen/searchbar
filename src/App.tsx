import * as React from 'react'
import './App.css';
import SearchBar from './components/SearchBar';
import './litelements/SearchBar/search-input.d.ts';

function App() {
  
  return (
    <div className="App">
      {/* react search component */}
      <SearchBar name="searchinput" className="searchTerm" placeholder='Search employee or country' />
      
      {/* litElement search component */}
      {/* <search-input/> */}
    </div>
  );
}

export default App;
