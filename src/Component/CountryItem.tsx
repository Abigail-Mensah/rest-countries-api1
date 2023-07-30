// import React from 'react';
// import './CountryItem.css';

// interface CountryItemProps {
//   name: string;
//   flag: string;
//   population: number;
//   region: string;
//   capital: string;
//   darkMode: boolean;
//   onClick: () => void; 
// }

// const CountryItem: React.FC<CountryItemProps> = ({
//   name,
//   flag,
//   population,
//   region,
//   capital,
//   darkMode,
//   onClick, 
// }) => {
//   console.log('Flag URL:', flag);
//   <div>
//   Test: < img src={flag} alt={`Test flag for ${name}`} />
// </div>;
  
//   const itemStyle = {
//     backgroundColor: darkMode ? '#2B3844' : 'white',
//     color: darkMode ? '#fff' : '#111517',
//   };

//   return (
//     <div className='grid-item' style={itemStyle} onClick={onClick}>
   
//        <img className='grid-item img' src={flag} alt={`${name} flag`} />
 

//       <div className='info-container'>
//         <h2 className='country-name'>{name}</h2>
//         <p>
//           <strong>Population:</strong> {population.toLocaleString()}
//         </p>
//         <p>
//           <strong>Region:</strong> {region}
//         </p>
//         <p>
//           <strong>Capital:</strong> {capital}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default CountryItem;
export {}