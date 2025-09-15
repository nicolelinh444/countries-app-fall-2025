import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CountryDetail from "./pages/CountryDetail.jsx";
import SavedCountries from "./pages/SavedCountries.jsx";
import localData from "./localData.js";
import { useEffect, useState } from "react";

function App() {
  // useState variable to store all countries that are fetched from the API
  const [countries, setCountries] = useState([]);

  // API call
  const getCountriesInfo = async () => {
    try {
      // url with parameters
      const response = await fetch();
      `https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders`;
      // assigns the data from the API call to a variable
      const data = await response.json();
      // if data from api call exists: use data, if not use localData
      setCountries(data ? data : localData);
    } catch (error) {
      // error message will run in the console if the API call is not successful
      console.log(
        "API failed, using localData as backup. Error:" + error.message
      );
      // calls setCountries with localData passed in
      setCountries(localData);
    }
  };

  // call the getCountriesInfo function when the App component loads
  useEffect(() => {
    getCountriesInfo();
  }, []);

  return (
    <div>
      {/* navbar with links */}
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
      {/* app routes */}
      <Routes>
        {/* home page, passes down countries as a prop */}
        <Route path="/" element={<Home countriesData={countries} />} />
        {/* saved countries, passes down countries as a prop */}
        <Route
          path="/SavedCountries"
          element={<SavedCountries countriesData={countries} />}
        />
        {/* country detail page, creates dynamic url for country name */}
        <Route
          path="/country-detail/:countryName"
          element={<CountryDetail countriesData={countries} />}
        />
      </Routes>
    </div>
  );
}

// export app so that it can be used in main.jsx
export default App;
