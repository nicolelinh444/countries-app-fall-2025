import { Link } from "react-router-dom"

// format numbers with commas (US)
function PopulationWithCommas ({ value }) {
    return <>{value.toLocaleString("en-US")}</>
}

// renders individual CountryCard
// receives a single country object (passed in from Home.jsx)
function CountryCard({ country }) {
    return (
        // Links each card to its country detail page
        <Link to={`/country-detail/${country.name.common}`}>
        <div className="countries-card">
        {/* country flag image */}
        <img src={country.flags.png} alt={`flag of ${country.name.common}`}/>
        <span className="countries-text">
        {/* country name */}
        <h2>{country.name.common}</h2>
        {/* population with commas */}
        <p><strong>Population: </strong><PopulationWithCommas value={country.population}/></p>
        {/* country region */}
        <p><strong>Region: </strong>{country.region}</p>
        {/* country capital */}
        <p><strong>Capital: </strong>{country.capital}</p>
        </span>
        </div>
        </Link>
    )
}

// exports CountryCard so that it can be imported in Home.jsx
export default CountryCard;