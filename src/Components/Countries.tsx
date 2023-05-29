import { ChangeEvent, useEffect, useState } from "react";
import { IResult } from "../Interfaces/IResult";
import Leagues from "./Leagues";
import Loading from "./Loading";

export default function Countries(): JSX.Element {
  const [countries, setCountries] = useState<IResult[]>([]);
  const [country, setCountry] = useState<string>('');
  const [failedLogin, setFailedLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async (): Promise<any> => {
      try {
        const data = await fetch(`${process.env.REACT_APP_BASE_URL}/countries` as string, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${token}`
          }
        });

        const jsonData = await data.json();
        if (jsonData.errors.length === 0) {
          setCountries(jsonData.response);
        } else {
          setFailedLogin(true);
        };
      } catch (error) {
        console.error(error);
      }
    };
    fetchData()
  }, []);

  const handleCountry = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };

  if (!countries.length) {
    return (<Loading />);
  };

  return (
    <section className="countries-selection">
      {
        (failedLogin)
          ? (
            <p data-testid="login__input_invalid_login_alert">
              API-Key Incorreta!
              <br />
              Por favor, tente novamente.
              <br />
              <br />
              Ainda não tem uma API-Key? Clique <a target="_blank" href="https://dashboard.api-football.com/register" rel="noreferrer">aqui</a> para realizar seu cadastro na API-Footbal.
            </p>
          )
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