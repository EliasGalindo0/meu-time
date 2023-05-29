import { useEffect, useState } from "react";
import { ILeague } from "../Interfaces/ILeague";
import Loading from "./Loading";

export default function Teams({ country, leagueId }: any): JSX.Element {
  const [teams, setTeams] = useState<ILeague[] | any>([]);

  useEffect(() => {
    const fetchTeams = async (country: string) => {
      try {
        const token = localStorage.getItem('token');
        if (country && leagueId) {
          const result = await fetch(`${process.env.REACT_APP_URL_TEAMS}${leagueId}country=${country}` as string, {
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": `${token}`
            }
          });
          const jsonData = await result.json();
          setTeams(jsonData.response);
        };
      } catch (error) {
        console.error(error);
      }
    };
    fetchTeams(country);
  }, [country, leagueId]);
  console.log(teams);

  if (!teams.length) {
    return (<Loading />);
  };

  return (
    <section className="countries-selection">
      {
        <>
          <p>Selecione um Time</p>
          <select>
            {teams.map((team: ILeague | any) => (
              <option key={team.id} value={team.id}>{`${team.name} `}</option>
            ))}
          </select>
        </>
      }
    </section>
  )
};