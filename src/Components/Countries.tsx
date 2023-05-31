import { ChangeEvent, useEffect, useState } from "react";
import { IResult } from "../Interfaces/IResult";
import Leagues from "./Leagues";
import Loading from "./Loading";
import Error from "./Error";
import { IError } from "../Interfaces/IError";

export default function Countries(): JSX.Element {
  const [countries, setCountries] = useState<IResult[]>([]);
  const [country, setCountry] = useState<string>('');
  const [failedLogin, setFailedLogin] = useState<boolean>(false);
  const [error, setError] = useState<IError | any>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchCountries = async (): Promise<any> => {
      try {
        const result = await fetch(`${process.env.REACT_APP_BASE_URL}/countries` as string, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${token}`
          }
        });

        const countriesData = await result.json();
        if (countriesData.errors.length === 0) {
          setCountries(countriesData.response);
        } else {
          setFailedLogin(true);
          setError(countriesData.errors.requests);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchCountries()
  }, []);

  const handleCountry = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };

  if (loading) {
    return (<Loading />);
  };

  return (
    <section className="countries-selection">
      {
        (failedLogin)
          ?
          <Error error={error} />
          : <>
            <p>Selecione um país</p>
            <select onChange={handleCountry}>
              {countries.map((country) => (
                <option key={country.name} value={country.name}>{`${country.name} - ${country.code} `}</option>
              ))}
            </select>
          </>
      }
      {
        (country)
          ?
          <Leagues country={country} failedLogin={failedLogin} />
          : null
      }
    </section>
  )
};