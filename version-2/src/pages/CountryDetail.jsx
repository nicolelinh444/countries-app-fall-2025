// pages/CountryDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PopulationWithCommas from "../components/PopulationWithCommas";

function CountryDetail({ countriesData }) {
  // get the dynamic country name from the url
  const countryName = useParams().countryName;
  // start page views at 0
  const [pageViews, setPageViews] = useState(0);

  // find the country from the countries data that matches the url name
  const currentCountry = countriesData.find(
    (country) => country.name.common === countryName
  );

  // increment page views per country
  useEffect(() => {
    if (!currentCountry) return;
    // create a key for each country
    const key = `pageViews_${currentCountry.name.common}`;
    // convert view count from a string to number, 0 if no value in local storage
    const currentCount = parseInt(localStorage.getItem(key), 10) || 0;
    // add 1 to count
    const newCount = currentCount + 1;

    // save new count into local storage
    localStorage.setItem(key, newCount);
    // update page views variable to show new coount
    setPageViews(newCount);
    // runs when current country changes
  }, [currentCountry]);

  // saves country when user clicks save button
  function saveOnClick() {
    // gets saved countries array from local storage
    // use empty array if no countries saved yet
    const savedCountries =
      JSON.parse(localStorage.getItem("savedCountries")) || [];

    // check if current country has been saved
    if (!savedCountries.includes(currentCountry.name.common)) {
      // if not, add to saved countries array
      savedCountries.push(currentCountry.name.common);
      // save to local storage as a string
      localStorage.setItem("savedCountries", JSON.stringify(savedCountries));
    }
  }

  // if current country is not found, display error message
  if (!currentCountry) {
    return <h2>Country not found</h2>;
  }

  // click handler for save button
  function saveOnClick() {
    // declares a variable for saved countries
    let savedCountries =
      // get saved countries from local storage or an empty array if no countries are saved
      JSON.parse(localStorage.getItem("savedCountries")) || [];
    // checks if country has already been saved
    if (!savedCountries.includes(currentCountry.name.common)) {
      savedCountries.push(currentCountry.name.common);
      localStorage.setItem("savedCountries", JSON.stringify(savedCountries));
    }
  }

  return (
    <>
      <div className="country-detail-card">
        {/* back button, links to home page */}
        <Link to="/" className="button-style">
          ← Back
        </Link>
        <span className="country-detail-box">
          {/* country flag image */}
          <img
            src={currentCountry.flags.png}
            alt={`flag of ${currentCountry.name.common}`}
          />
          <span className="cdc-text">
            {/* country name */}
            <h1>{currentCountry.name.common}</h1>
            {/* save button */}
            <Link onClick={saveOnClick} className="button-style">
              Save{" "}
            </Link>
            <p>
              {/* country population */}
              <strong>Population: </strong>
              <PopulationWithCommas value={currentCountry.population} />
            </p>
            <p>
              {/* country region */}
              <strong>Region: </strong>
              {currentCountry.region}
            </p>
            <p>
              {/* country capital */}
              <strong>Capital: </strong>
              {currentCountry.capital}
            </p>
            <p>
              <strong>Viewed:</strong> {pageViews} times
            </p>
          </span>
        </span>
      </div>
    </>
  );
}

// exports CountryDetail so that it can be imported in App.jsx
export default CountryDetail;
