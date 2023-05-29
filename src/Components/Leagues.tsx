import { useEffect, useState } from "react";
import { ILeague } from "../Interfaces/ILeague";
import Teams from "./Teams";

export default function Leagues({ country, failedLogin }: any): JSX.Element {
  const [leagues, setLeagues] = useState<ILeague[] | any>([]);
  const [leagueId, setLeagueId] = useState<number | any>();

  useEffect(() => {
    const fetchLeagues = async (country: string) => {
      try {
        const token = localStorage.getItem('token');
        if (country) {
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
      } catch (error) {
        console.error(error);
      }
    };
    fetchLeagues(country);
  }, [country, leagueId]);

  return (
    <section className="countries-selection">
      {
        (failedLogin)
          ? (
            <p data-testid="login__input_invalid_login_alert">
              Ocorreu algum problema com a requisição dos dados!
              <br />
              Por favor, tente novamente mais tarde.
              <br />
              <br />
              Caso não tenha uma API-Key? Clique <a target="_blank" href="https://dashboard.api-football.com/register" rel="noreferrer">aqui</a>.
            </p>
          )
          :
          <>
            <p>Selecione uma Liga</p>
            <select onChange={({ target: { value } }) => setLeagueId(value)}>
              {leagues.map((league: ILeague | any) => (
                <option key={league.league.id} value={league.league.id}>{`${league.league.name} `}</option>
              ))}
            </select>
          </>
      }
      {
        (leagueId)
          ?
          <Teams country={country} leagueId={leagueId} />
          : null
      }
    </section>
  )
};