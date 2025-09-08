// pages/Home.jsx
import CountryCard from "../components/CountryCard";

function Home({ countriesData }) {
    return (
        <div className="countries-list">
            {countriesData.map((country, index) => (
            <CountryCard key={index} country={country} />
        ))}
        </div>
    );
  }

  export default Home;