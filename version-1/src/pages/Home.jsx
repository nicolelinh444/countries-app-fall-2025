// pages/Home.jsx
import CountryCard from "../components/CountryCard";

function Home({ countriesData }) {
    const sortCountries = [...countriesData].sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
    );

    return (

        <div className="countries-list">
            {sortCountries.map((country, index) => (
            <CountryCard key={index} country={country} />
        ))}
        </div>
    );
  }

  export default Home;