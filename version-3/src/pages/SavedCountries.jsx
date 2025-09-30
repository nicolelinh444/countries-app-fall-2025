import CountryCard from "../components/CountryCard";
import SavedCountriesForm from "../components/Form";
import { useEffect, useState } from "react";

function SavedCountries({ countriesData }) {
  const [savedCountries, setSavedCountries] = useState([]);

  const getSavedCountries = async () => {
    try {
      const response = await fetch(
        "https://backend-answer-keys.onrender.com/get-all-saved-countries"
      );
      const savedCountriesList = await response.json();
      console.log("data:", savedCountriesList);

      const allSavedCountries = savedCountriesList.map((savedCountry) =>
        countriesData.find(
          (countryObject) =>
            savedCountry.country_name === countryObject.name.common
        )
      );
      console.log("allSavedCountries", allSavedCountries);
      setSavedCountries(allSavedCountries);
    } catch (error) {
      console.log("Error fetching saved countries", error);
    }
  };

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
