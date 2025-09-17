import CountryCard from "../components/CountryCard";
import SavedCountriesForm from "../components/Form";

function SavedCountries() {
  // get list of saved countries from local storage
  let savedCountriesDestring =
    JSON.parse(localStorage.getItem("savedCountries")) || [];

  return (
    <div className="saved-countries-page">
      <h2>My Saved Countries</h2>
      <div className="saved-countries-list">
        {/* map through list of saved countries and render to the screen */}
        {savedCountriesDestring.map((country, index) => (
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
