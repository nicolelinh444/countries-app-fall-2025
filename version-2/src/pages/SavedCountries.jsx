import CountryCard from "../components/CountryCard";
import SavedCountriesForm from "../components/Form";

function SavedCountries({ countriesData }) {
  // get list of saved countries from local storage
  let savedCountriesDestring =
    // go through local storage and get savedCountries array
    // OR if none exists, an empty array
    JSON.parse(localStorage.getItem("savedCountries")) || "[]";

  // declare a variable with a list of filtered countries
  // filters through countries data
  const filteredCountries = countriesData.filter((item) =>
    // checks if country name is also in saved countries destring
    savedCountriesDestring.includes(item.name.common)
  );

  return (
    <div className="saved-countries-page">
      <h2>My Saved Countries</h2>
      <div className="saved-countries-list">
        {/* map through list of saved countries and render to the screen */}
        {filteredCountries.map((country, index) => (
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
