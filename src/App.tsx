import './App.css';
import SearchBar from './components/SearchBar';

function App() {
  
  return (
    <div className="App">
      <SearchBar name="searchinput" className="searchTerm" placeholder='Search employee or country' />
    </div>
  );
}

export default App;
