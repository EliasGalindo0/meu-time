import { useEffect, useState } from "react";
import { ILeague, ILeagueMap } from "../Interfaces/ILeague";
import Teams from "./Teams";
import Loading from "./Loading";
import Error from "./Error";

export default function Leagues({ country, failedLogin, error }: ILeague): JSX.Element {
  const [leagues, setLeagues] = useState<ILeague[] | any>([]);
  const [leagueId, setLeagueId] = useState<number | any>();
  const [seasons, setSeasons] = useState<number | any>(0);
  const [season, setSeason] = useState<number | any>(0);

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
        console.error(error);
      }
    };
    fetchLeagues();
  }, [country, leagueId]);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const token = localStorage.getItem('token');
        if (country) {
          const response = await fetch(process.env.RREACT_APP_URL_SEASONS as string, {
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": `${token}`
            }
          });
          const leagueData = await response.json();
          setSeasons(leagueData.response);
        };
      } catch (error) {
        window.alert(error);
      }
    };
    fetchSeasons();
  }, [country]);
  console.log(seasons);

  if (!leagues.length) {
    return (<Loading />);
  };

  return (
    <section className="countries-selection">
      {
        (failedLogin)
          ?
          <Error error={error} />
          :
          <>
            <p>Selecione uma Liga e uma Temporada</p>
            <select onChange={({ target: { value } }) => setLeagueId(value)}>
              {leagues.map((league: ILeagueMap) => (
                <option key={league.league.id} value={league.league.id}>{league.league.name}</option>
              ))}
            </select>
            <select onChange={({ target: { value } }) => setSeason(value)}>
              {seasons.map((season: ILeagueMap) => (
                <option key={Math.random()} value={season.year}>{season.year}</option>
              ))}
            </select>
          </>
      }
      {
        (leagueId)
          ?
          <Teams country={country} leagueId={leagueId} season={season} failedLogin={failedLogin} />
          : null
      }
    </section>
  )
};