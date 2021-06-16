import countries from "~/utils/countries.map";

const CountryFlag = ({ defaultValue, setCountry }) => (
  <select
    id="distillery"
    name="distillery"
    className="block w-full px-2 py-1 border border-gray-400 active:border-gray-800 focus:border-gray-800 outline-none"
    defaultValue={defaultValue}
    onChange={(e) => setCountry(e.target.value)}
  >
    <option value={null} selected disabled hidden>Choose country</option>
    {countries.map((country) => (
      <option key={country.countryCode} value={country.countryCode}>
        {country.name}
      </option>
    ))}
  </select>
);

export default CountryFlag;
