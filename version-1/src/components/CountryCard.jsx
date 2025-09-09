import { Link } from "react-router-dom"

function CountryCard({ country }) {
    return (
        <Link to={`/country/${country.name.common}`}>
        <div className="countries-card">
        <img src={country.flags.png} alt={`flag of ${country.name.common}`}/>
        <span className="countries-text">
        <h2>{country.name.common}</h2>
        <p><strong>Population: </strong>{country.population}</p>
        <p><strong>Region: </strong>{country.region}</p>
        <p><strong>Capital: </strong>{country.capital}</p>
        </span>
        </div>
        </Link>
    )
}

export default CountryCard;