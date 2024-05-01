import './App.css';
import CurrentLocation from './views/currentLocation';
import SearchLocation from './views/searchLocation';

function App() {
  return (
    <div style={{
      display: 'flex',
      backgroundColor: '#FFFFFF'
      }}>
      <div style={{flex: '40%', justifyContent: 'center', alignItems: 'center'}}>
        <CurrentLocation/>
      </div>
      <div style={{flex: '60%', justifyContent: 'center', alignItems: 'center'}}>
        <SearchLocation/>
      </div>
    </div>
  );
}

export default App;
