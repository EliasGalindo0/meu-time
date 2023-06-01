import { useEffect, useState } from "react";
import { ILeague, ILeagueMap } from "../Interfaces/ILeague";
import Teams from "./Teams";
import Loading from "./Loading";
import Error from "./Error";

export default function Leagues({ country, failedLogin, error }: ILeague): JSX.Element {
  const [leagues, setLeagues] = useState<ILeague[] | any>([]);
  const [leagueId, setLeagueId] = useState<ILeague | any>(0);
  const [seasons, setSeasons] = useState<ILeague | any>();
  const [season, setSeason] = useState<ILeague | any>('');

  useEffect(() => {
    const fetchLeagues = async () => {
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
          const leagueData = await result.json();
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
          const response = await fetch(process.env.REACT_APP_URL_SEASONS as string, {
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": `${token}`
            }
          });
          const seasonData = await response.json();
          setSeasons(seasonData.response);
        };
      } catch (error) {
        console.error(error);
      }
    };
    fetchSeasons();
  }, [country]);

  if (!leagues.length) {
    return (<Loading />);
  };

  return (
    <section className="leagues-selection">
      {
        (failedLogin)
          ?
          <Error error={error} />
          :
          <>
            <p>Selecione uma Liga e uma Temporada</p>
            <select value={leagueId} onChange={({ target: { value } }) => setLeagueId(value)}>
              {leagues.map((league: ILeagueMap) => (
                <option key={league.league.id} value={league.league.id}>{league.league.name}</option>
              ))}
            </select>
            <select value={season} onChange={({ target: { value } }) => setSeason(value)}>
              {seasons && seasons.map((season: number) => (
                <option key={season} value={season}>{season}</option>
              ))}
            </select>
          </>
      }
      {
        (leagueId && season)
          ?
          <Teams leagueId={leagueId} season={season} failedLogin={failedLogin} error={error} />
          : null
      }
    </section >
  )
};