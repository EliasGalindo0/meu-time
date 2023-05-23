import { useEffect, useState } from "react";
import { IResult } from "../Interfaces/IResult";

const Home = () => {
  // const [teams, setTeams] = useState<IResult[]>([]);
  const [countries, setCountry] = useState<IResult[]>([]);
  const [data, setData] = useState<IResult[]>([]);
  const [flags, setFlag] = useState<IResult[]>([]);

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetch(`${process.env.REACT_APP_BASE_URL}/countries` as string, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": process.env.REACT_APP_API_KEY as string
        }
      });
      const jsonData = await data.json();
      setCountry(jsonData.response);
      setFlag(jsonData.response);
    };
    getCountries();
  }, []);
  console.log(countries);

  const handleCountry = (event: any) => {
    setData(event.target.value)
  }
  console.log(data);

  return (
    <div>
      <p>Hello World!</p>
      <select onChange={handleCountry}>
        {countries.map((country) => (
          <option key={country.name} value={country.name}>{`${country.name} - ${country.code} `}</option>
        ))}
      </select>
    </div>
  )
}

export default Home;