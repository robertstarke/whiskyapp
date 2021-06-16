const CountryFlag = ({ countryCode }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 24" className="w-auto h-6 fill-current">
    <use href={`/img/countries/${countryCode.toLowerCase()}.svg#flag-icon-css-${countryCode.toLowerCase()}`} />
  </svg>
);


export default CountryFlag;
