// pages/CountryDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PopulationWithCommas from "../components/PopulationWithCommas";

function CountryDetail({ countriesData }) {
  // get the dynamic country name from the url
  const countryName = useParams().countryName;
  // page views for counter
  const [pageViews, setPageViews] = useState(0);

  // find the country from the countries data that matches the url name
  const currentCountry = countriesData.find(
    (country) => country.name.common === countryName
  );

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
    const found = savedCountries.find(
      (country) => country.name.common === currentCountry.name.common
    );

    // if country has not been saved yet
    if (!found) {
      // push current country to saved countries array
      savedCountries.push(currentCountry);
      // save to local storage
      localStorage.setItem("savedCountries", JSON.stringify(savedCountries));
    }
  }

  useEffect(() => {
    // store page views in local storage
    const storedPageViews = localStorage.getItem("pageViews");

    // if stored page views exist, convert it to a base 10 integer and update the page views state variable with that number
    if (storedPageViews) {
      setPageViews(parseInt(storedPageViews, 10));
    }

    // set page views, pass in previous page views
    setPageViews((prevPageViews) => {
      // new page views equals previous page views + 1
      const newPageViews = prevPageViews + 1;
      // set page views in local storage to new page views
      localStorage.setItem("pageViews", newPageViews.toString());
      // return updated page views
      return newPageViews;
    });
  }, []);

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
