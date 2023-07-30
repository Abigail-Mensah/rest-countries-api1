import React from 'react';

interface CountryDetailsProps {
  // Pass the country details as props
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
    flags,
    borders,
  } = props;

  // If no country is selected, hide the content of the component
  if (!name) {
    return null;
  }

  return (
    <div>
      <img src={flags.svg} alt={`Flag of ${name}`} className="flag-image" />
      <h2>{name}</h2>
      <p>Native Name: {nativeName}</p>
      <p>Population: {population}</p>
      <p>Region: {region}</p>
      <p>Subregion: {subregion}</p>
      <p>Capital: {capital}</p>
      <p>Top Level Domain: {topLevelDomain.join(', ')}</p>
      <p>
        Currencies:{' '}
        {currencies.map((currency) => `${currency.name} (${currency.code}, ${currency.symbol})`)}
      </p>
      <p>Borders: {borders.join(', ')}</p>
      {/* Add other details you want to display */}
    </div>
  );
};

export default CountryDetails;
