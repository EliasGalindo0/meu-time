import { useEffect, useState } from "react";
import { IResult } from "../Interfaces/IResult";

const Countries = () => {
  // const [teams, setTeams] = useState<IResult[]>([]);
  const [countries, setCountries] = useState<IResult[]>([]);
  const [country, setCountry] = useState<IResult[]>([]);
  const [flags, setFlag] = useState<IResult[]>([]);
  const [failedTryLogin, setFailedTryLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async (): Promise<any> => {
      const data = await fetch(`${process.env.REACT_APP_BASE_URL}/countries` as string, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": `${token}`
        }
      });

      const jsonData = await data.json();
      console.log(jsonData);
      if (jsonData.errors.length === 0) {
        setCountries(jsonData.response);
        setFlag(jsonData.response);
      } else {
        setFailedTryLogin(true);
      }
    };
    fetchData();
  }, []);
  // console.log(countries);

  const handleCountry = (event: any) => {
    setCountry(event.target.value)
  }

  return (
    <section className="countries-selection">
      {
        (failedTryLogin)
          ? (
            <p data-testid="login__input_invalid_login_alert">

              O Token digitado está incorreto.
              Por favor, tente novamente.
              <br />
              <br />
              Caso não tenha um token, clique <a target="_blank" href="https://dashboard.api-football.com/register" rel="noreferrer">aqui</a> para realizar seu cadastro na API-Sports.

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
    </section>
  )
}

export default Countries;