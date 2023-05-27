import { useEffect, useState } from "react";
import { ILeague } from "../Interfaces/ILeague";

export default function Leagues({ failedTryLogin, country }: ILeague) {
  const [leagues, setLeagues] = useState<ILeague[]>([]);

  useEffect(() => {
    const getLeagues = async (country: string) => {
      const token = localStorage.getItem('token');
      if (country && !failedTryLogin) {
        const result = await fetch(`${process.env.REACT_APP_URL_LEAGUES}${country}` as string, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": `${token}`
          }
        });
        const jsonData = await result.json();
        setLeagues(jsonData.response);
      };
    };
    getLeagues(country);
    console.log(leagues);
  }, [country, failedTryLogin, leagues]);

  return (
    <section className="countries-selection">
      {
        (failedTryLogin)
          ? (
            <p data-testid="login__input_invalid_login_alert">

              API-Key Incorreta!
              <br />
              Por favor, tente novamente.
              <br />
              <br />
              Ainda não tem uma API-Key? Clique <a target="_blank" href="https://dashboard.api-football.com/register" rel="noreferrer">aqui</a> para realizar seu cadastro na API-Sports.

            </p>
          )
          : <>
            <p>Selecione uma Liga</p>
            <select>
              {leagues.map((league: ILeague) => (
                <option key={league.name} value={league.name}>{`${league.name} `}</option>
              ))}
            </select>
          </>
      }
    </section>
  )
};