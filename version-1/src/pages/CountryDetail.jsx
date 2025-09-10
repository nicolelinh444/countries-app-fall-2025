// pages/CountryDetail.jsx
import { useParams, Link } from "react-router-dom";

function CountryDetail( { countriesData } ) {
  const countryName = useParams().countryName;

  const currentCountry = countriesData.find(
    country => country.name.common === countryName
  );

  if (!currentCountry) {
    return <h2>Country not found</h2>;
  }

  // back button

  // flag image

  // name of country

  // save button

  // population, region, capital
  
    return (
      <>
      <div className="country-detail-card">
       <Link to="/" className="button-style">
       ← Back</Link>
      <span className="country-detail-box">
      <img src={currentCountry.flags.png} alt={`flag of ${currentCountry.name.common}`}/>
      <span className="cdc-text">
      <h1>{currentCountry.name.common}</h1>
      <Link to="/" className="button-style">Save </Link>
      <p><strong>Population: </strong>{currentCountry.population}</p>
        <p><strong>Region: </strong>{currentCountry.region}</p>
        <p><strong>Capital: </strong>{currentCountry.capital}</p>
        </span>
        </span>
        </div>
      </> 

    )
  }

  export default CountryDetail;