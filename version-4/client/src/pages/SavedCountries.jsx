import CountryCard from "../components/CountryCard";
import SavedCountriesForm from "../components/Form";
import { useEffect, useState } from "react";

function SavedCountries({ countriesData }) {
  // useState variable to store saved countries
  const [savedCountries, setSavedCountries] = useState([]);

  // api call to retrieve saved country data
  const getSavedCountries = async () => {
    try {
      const response = await fetch("/get-all-saved-countries");

      // declare variable to store list of saved countries
      const savedCountriesData = await response.json();
      // map through saved countries from api call
      const allSavedCountries = savedCountriesData.map((savedCountry) =>
        // in countriesData, find the countries that match the api data
        countriesData.find(
          (countryObject) =>
            savedCountry.country_name === countryObject.name.common
        )
      );
      // set savedCountries to allSavedCountries variable
      setSavedCountries(allSavedCountries);
    } catch (error) {
      console.log("Error fetching saved countries", error);
    }
  };

  // call getSavedCountries function on page load
  useEffect(() => {
    getSavedCountries();
  }, []);

  return (
    <div className="saved-countries-page">
      <h2>My Saved Countries</h2>
      <div className="saved-countries-list">
        {/* map through list of saved countries and render to the screen */}
        {savedCountries.map((country, index) => (
          <CountryCard key={index} country={country} />
        ))}
      </div>
      {/* call form component */}
      <SavedCountriesForm />
    </div>
  );
}

// exports SavedCountries so that it can be used in App.jsx
export default SavedCountries;
