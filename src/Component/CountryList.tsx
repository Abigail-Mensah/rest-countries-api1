import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CountryList.css';
import CountryDetails, { Country } from './CountryDetails';
import MoonImage from './moonImage.svg';
import searchImage from './searchImage copy.svg';

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [showCountryDetails, setShowCountryDetails] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v2/all');

        if (!response.data || response.data.length === 0) {
          throw new Error('No data received from API.');
        }

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
            languages: Object.values(country.languages || {}),
            flags: country.flags,
            borders: country.borders || [],
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

  const handleSearchIconClick = () => {
    // Perform the search action here using the searchQuery state
    console.log('Search icon clicked! Perform search with:', searchQuery);
  };

  const handleRegionSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value);
  };

  const handleToggleDropdown = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  const handleToggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedRegion === '' || country.region.toLowerCase() === selectedRegion.toLowerCase())
  );

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
    setShowCountryDetails(true);
  };

  const handleGoBackToCountryList = () => {
    setSelectedCountry(null);
    setShowCountryDetails(false);
  };

  const handleBorderCountryClick = (borderCountry: string) => {
    const selectedBorderCountry = countries.find((country) => country.name === borderCountry);
    if (selectedBorderCountry) {
      setSelectedCountry(selectedBorderCountry);
      setShowCountryDetails(true);
    }
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <div className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
        <p>Where in the world ?</p>
        <ul onClick={handleToggleDarkMode}>
          Dark Mode
          <img src={MoonImage} alt="Moon Icon" className={`moon-image ${darkMode ? 'dark-mode' : ''}`} />
        </ul>
      </div>

      {!showCountryDetails && (
        <>
          <div className={`search-container ${darkMode ? 'dark-mode' : ''}`}>
            <div className={`search-icon ${darkMode ? 'dark-icon' : ''}`} onClick={handleSearchIconClick}>
              <img src={searchImage} alt="Search Icon" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className={`search-input ${darkMode ? 'dark-input' : ''}`}
            />
            <span className={`search-placeholder ${darkMode ? 'dark-placeholder' : ''}`}>
              {searchQuery ? '' : 'Search country...'}
            </span>
          </div>

          <div className="custom-dropdown">
            <div className="dropdown-toggle" onClick={handleToggleDropdown}>
              <span className='filter'> Filter by Region</span>
              <div className={`arrow-icons ${showDropdown ? 'open' : ''}`}>&#8744;</div> {/* Downward pointing arrow */}
            </div>
            {showDropdown && (
              <div className="dropdown-options">
                <div className="option" onClick={() => setSelectedRegion('')}>All Regions</div>
                <div className="option" onClick={() => setSelectedRegion('africa')}>Africa</div>
                <div className="option" onClick={() => setSelectedRegion('americas')}>Americas</div>
                <div className="option" onClick={() => setSelectedRegion('asia')}>Asia</div>
                <div className="option" onClick={() => setSelectedRegion('europe')}>Europe</div>
                <div className="option" onClick={() => setSelectedRegion('oceania')}>Oceania</div>
              </div>
            )}
          </div>
        </>
      )}

      {showCountryDetails ? (
        <CountryDetails 
          name={selectedCountry!.name}
          nativeName={selectedCountry!.nativeName}
          population={selectedCountry!.population}
          region={selectedCountry!.region}
          subregion={selectedCountry!.subregion}
          capital={selectedCountry!.capital}
          topLevelDomain={selectedCountry!.topLevelDomain}
          currencies={selectedCountry!.currencies}
          languages={selectedCountry!.languages}
          flags={selectedCountry!.flags}
          borders={selectedCountry!.borders}
          darkMode={darkMode}
          goBackToCountryList={handleGoBackToCountryList}
          countries={countries}
          handleBorderCountryClick={handleBorderCountryClick}
        />
      ) : (
        <div className="grid-container">
          {filteredCountries.map((country, index) => (
            <div
              key={index}
              className={`grid-item ${darkMode ? 'dark-mode' : ''}`}
              onClick={() => handleCountryClick(country)}
            >
              <img
                src={country.flags.svg}
                alt={`Flag of ${country.name}`}
                className="flag-image"
              />
              <h3>{country.name || 'Unknown Country'}</h3>
              <p>
                <strong>Capital:</strong> {country.capital}
              </p>
              <p>
                <strong>Population:</strong> {country.population}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryList;
