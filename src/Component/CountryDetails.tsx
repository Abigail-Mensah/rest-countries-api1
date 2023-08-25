import React from 'react';
import './CountryDetails.css';
import { FaArrowLeft } from 'react-icons/fa';

export interface Country {
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
  languages: {
    name: string;
    nativeName: string;
  }[];
  flags: {
    svg: string;
    png: string;
  };
  borders: string[];
}

interface CountryDetailsProps extends Country {
  darkMode: boolean;
  goBackToCountryList: () => void;
  countries: Country[];
  handleBorderCountryClick: (borderCountry: string) => void;
}

const CountryDetails: React.FC<CountryDetailsProps> = (props) => {
  const {
    name,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    flags,
    borders,
    darkMode,
    goBackToCountryList,
    countries,
    handleBorderCountryClick,
  } = props;

  const backButtonStyle = () => ({
    background: darkMode ? '#202c37' : '',
    color: darkMode ? '#fff' : '',
  });

  const countryTextStyle = () => ({
    background: darkMode ? '#202c37' : '',
    color: darkMode ? '#fff' : '',
  });

  const darkModeClass = darkMode ? 'dark-mode' : '';

  // Helper function to map border codes to country names
  const mapBorderCodesToNames = (borderCodes: string[]): string[] => {
    return borderCodes.map((code) => {
      const country = countries.find((country) => country.borders.includes(code));
      return country ? country.name : code;
    });
  };

  return (
    <div className={`country-details-container ${darkModeClass}`}>
      <button
        className={`go-back-button ${darkModeClass}`}
        onClick={goBackToCountryList}
        style={backButtonStyle()}
      >
        <FaArrowLeft className="arrow-icon" />
        <span className="button-text">Back</span>
      </button>

      <img src={flags.svg} alt={`Flag of ${name}`} className="flag" />
      <div className="country-text" style={countryTextStyle()}>
        <h2>{name}</h2>
        <div className="country-text1">
          <p>
            <h4> Native Name:</h4>
          </p>{' '}
          <p className='native'> {nativeName}</p>
          <p>
            <h4> Population:</h4>{' '}
          </p>{' '}
          <p className='population'> {population}</p>
          <p>
            <h4> Region:</h4>{' '}
          </p>{' '}
          <p className='region'> {region}</p>
          <p>
            <h4> Subregion:</h4>
          </p>{' '}
          <p className='subregion'> {subregion}</p>
          <p>
            <h4> Capital:</h4>{' '}
          </p>{' '}
          <p className='capital'> {capital}</p>
        </div>
        <div className="country-text2">
          <h4> Top Level Domain:</h4>{' '}
          <p className='toplevel'> {topLevelDomain.join(', ')}</p>
          <h4> Currencies:</h4>{' '}
          <p className='currencies'>
            {' '}
            {' '}
            {currencies.map(
              (currency) => `${currency.name} (${currency.code}, ${currency.symbol})`
            )}{' '}
            {' '}
          </p>
          <h4> Languages:</h4>{' '}
          <p className='language'>
            {' '}
            {languages.map((language) => `${language.name} (${language.nativeName})`)}{' '}
          </p>
        </div>

        <h4 className='borders-countries'>Borders Countries:</h4>
        <div className="borders">
          {borders.length > 0 ? (
            borders.map((border, index) => (
              <div
                key={index}
                className="border-container"
                onClick={() => handleBorderCountryClick(mapBorderCodesToNames([border])[0])}
              >
                {mapBorderCodesToNames([border])}
              </div>
            ))
          ) : (
          
            <div className="no-border-message">No neighboring countries</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
