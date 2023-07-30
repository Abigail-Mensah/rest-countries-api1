import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CountryList.css'; // Import the CSS file
import CountryDetails from './CountryDetails'; // Import the CountryDetails component

interface Country {
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  capital: string;
  topLevelDomain: string[];
  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];
  flags: {
    svg: string;
    png: string;
  };
  borders: string[];
  // Add other properties you want to display
}

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>(''); // State to hold the selected region
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null); // State to hold the selected country
  const [isCountrySelected, setIsCountrySelected] = useState<boolean>(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v2/all');
        console.log('API response:', response.data); // Debugging log for API response

        if (!response.data || response.data.length === 0) {
          throw new Error('No data received from API.');
        }

        // Extracting the necessary information from the API response
        const countriesData = response.data.map((country: any) => {
          return {
            name: country.name,
            nativeName: country.nativeName,
            population: country.population || 0,
            region: country.region || 'N/A',
            subregion: country.subregion || 'N/A',
            capital: country.capital || 'N/A',
            topLevelDomain: country.topLevelDomain || [],
            currencies: Object.values(country.currencies || {}),
            flags: country.flags,
            borders: country.borders || [],
            // Add other properties you want to display
          };
        });

        setCountries(countriesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRegionSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value);
  };

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedRegion === '' || country.region.toLowerCase() === selectedRegion.toLowerCase())
  );

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
    setIsCountrySelected(true);
  };

  return (
    <div>
      <h1>Rest Countries</h1>

      <input
        type="text"
        placeholder="Search country..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <select value={selectedRegion} onChange={handleRegionSelection}>
        <option value="">All Regions</option>
        <option value="africa">Africa</option>
        <option value="americas">Americas</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
      </select>

      <div className="grid-container">
        {filteredCountries.map((country, index) => (
          <div key={index} className="grid-item" onClick={() => handleCountryClick(country)}>
            {!isCountrySelected && (
              <>
                <img
                  src={country.flags.svg}
                  alt={`Flag of ${country.name}`}
                  className="flag-image"
                />
                <h3>{country.name || 'Unknown Country'}</h3>
              </>
            )}
            {isCountrySelected && selectedCountry?.name === country.name && (
              <CountryDetails
                name={selectedCountry.name}
                nativeName={selectedCountry.nativeName}
                population={selectedCountry.population}
                region={selectedCountry.region}
                subregion={selectedCountry.subregion}
                capital={selectedCountry.capital}
                topLevelDomain={selectedCountry.topLevelDomain}
                currencies={selectedCountry.currencies}
                flags={selectedCountry.flags}
                borders={selectedCountry.borders}
              />
            )}
            {!isCountrySelected && (
              <>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
                <p>Region: {country.region}</p>
              </>
            )}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryList;
