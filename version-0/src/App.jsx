import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetails';
import SavedCountries from './pages/SavedCountries';
import localData from './localData.js';

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li className="home">
            <Link to="/">Where in the World?</Link>
          </li>
          <li className="saved">
            <Link to="/SavedCountries">Saved Countries</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home countriesData={localData}/>} />
        <Route path="/SavedCountries" element={<SavedCountries />} />
        <Route path="/CountryDetails" element={<CountryDetails />} />
      </Routes>
    </div>
  );
}

export default App;