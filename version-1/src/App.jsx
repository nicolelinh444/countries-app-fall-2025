import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CountryDetails from './pages/CountryDetails.jsx';
import SavedCountries from './pages/SavedCountries.jsx';
import { useEffect, useState } from 'react';
import localData from './localData.js';

function App() {
  const [countries, setCountries] = useState([]);

  const getCountriesInfo = async () => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders`
      );
      const data = await response.json();
      console.log(data);
      setCountries(data);
    } catch (error) {
      console.log('Error:' + error.message);
    }
  };

  useEffect(() =>{
    getCountriesInfo();
  }, []);

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
        <Route path="/" element={<Home countriesData={countries}/>} />
        <Route path="/SavedCountries" element={<SavedCountries />} />
        <Route path="/CountryDetails" element={<CountryDetails />} />
      </Routes>
    </div>
  );
}

export default App;