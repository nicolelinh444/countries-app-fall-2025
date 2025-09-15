// pages/Home.jsx
import CountryCard from "../components/CountryCard";

// receives countriesData as a prop from App.jsx
function Home({ countriesData }) {
    // declares a new array and sorts countries alphabetically by their common name
    const sortCountries = [...countriesData].sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
    );

    return (
        <div className="countries-list">
            {/* loops through sorted countries to find each country and render a country card for each one */}
            {sortCountries.map((country, index) => (
            <CountryCard key={index} country={country} />
        ))}
        </div>
    );
  }

  // exports Home so that it can be imported in App.jsx
  export default Home;