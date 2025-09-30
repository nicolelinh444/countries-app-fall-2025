// pages/CountryDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PopulationWithCommas from "../components/PopulationWithCommas";

function CountryDetail({ countriesData }) {
  // get the dynamic country name from the url
  const countryName = useParams().countryName;
  // start page views at 0
  const [pageCount, setPageCount] = useState(0);
  // check if country is saved
  const [isSaved, setIsSaved] = useState();
  // use navigate to make the back button functional
  const navigate = useNavigate();

  // find the country from the countries data that matches the url name and save it as currentCountry
  const currentCountry = countriesData.find(
    (country) => country.name.common === countryName
  );

  // api call to update country count
  const updateOneCountryCount = async () => {
    const response = await fetch(
      "https://backend-answer-keys.onrender.com/update-one-country-count",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country_name: countryName,
        }),
      }
    );
    // declare a variable to store data from api call
    const data = await response.json();
    // set useState for page count to count from data
    setPageCount(data.count);
  };

  // call updateOneCountryCount when page loads and pass in name of country
  useEffect(() => {
    updateOneCountryCount(countryName);
  }, []);

  // saves country when user clicks save button
  const saveOnClick = async () => {
    const response1 = await fetch(
      "https://backend-answer-keys.onrender.com/save-one-country",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country_name: currentCountry.name.common,
        }),
      }
    );
    // change boolean value of isSaved to true
    setIsSaved(true);
  };

  const unsaveOnClick = async () => {
    const response2 = await fetch(
      "https://backend-answer-keys.onrender.com/unsave-one-country",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country_name: currentCountry.name.common,
        }),
      }
    );
    setIsSaved(false);
  };

  // if current country is not found, display error message
  if (!currentCountry) {
    return <h2>Country not found</h2>;
  }

  return (
    <>
      <div className="country-detail-card">
        {/* back button, links to home page */}
        <button onClick={() => navigate(-1)} className="button-style">
          ← Back
        </button>
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
            {/* will fix functionality of button color later */}
            <button onClick={saveOnClick} className="button-style">
              {isSaved ? "❤️" : "🤍"}
            </button>
            <br />
            <br />
            <button onClick={unsaveOnClick} className="button-style">
              Unsave
            </button>
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
              <strong>Viewed:</strong> {pageCount} times
            </p>
          </span>
        </span>
      </div>
    </>
  );
}

// exports CountryDetail so that it can be imported in App.jsx
export default CountryDetail;
