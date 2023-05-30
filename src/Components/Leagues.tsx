import { useEffect, useState } from "react";
import { ILeague } from "../Interfaces/ILeague";
import Teams from "./Teams";
import Loading from "./Loading";

export default function Leagues({ country, failedLogin }: ILeague): JSX.Element {
  const [leagues, setLeagues] = useState<ILeague[] | any>([]);
  const [leagueId, setLeagueId] = useState<number | any>();
  const [season, setSeason] = useState<number | any>();

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const token = localStorage.getItem('token');
        if (country) {
          const response = await fetch(`${process.env.REACT_APP_URL_LEAGUES}${country}` as string, {
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": `${token}`
            }
          });
          const leagueData = await response.json();
          setLeagues(leagueData.response);
        };
      } catch (error) {
        window.alert(error);
      }
    };
    fetchLeagues();
  }, [country, leagueId]);
  console.log(leagues);
  console.log(season);


  if (!leagues.length) {
    return (<Loading />);
  };

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
            <p>Selecione uma Liga e uma Temporada</p>
            <select onChange={({ target: { value } }) => setLeagueId(value)}>
              {leagues.map((league: ILeague | any) => (
                <option key={league.league.id} value={league.league.id}>{league.league.name}</option>
              ))}
            </select>
            <select onChange={({ target: { value } }) => setSeason(value)}>
              {leagues.map((league: ILeague | any) => (
                <option key={Math.random()} value={league.seasons.year}>{league.seasons.year}</option>
              ))}
            </select>
          </>
      }
      {
        (leagueId)
          ?
          <Teams country={country} leagueId={leagueId} season={season} />
          : null
      }
    </section>
  )
};