import { useEffect, useState } from "react";
import Loading from "./Loading";
import { ITeam } from "../Interfaces/ITeam";
import Error from "./Error";
import { ITeamsProps } from "../Interfaces/ITeamsProps";

export default function Teams({ leagueId, season, failedLogin, error }: ITeamsProps): JSX.Element {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [teamId, setTeamId] = useState<number | string>();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token = localStorage.getItem('token');
        if (leagueId && season) {
          const result = await fetch(`${process.env.REACT_APP_URL_TEAMS}${leagueId}&season=${season}` as string, {
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": `${token}`
            }
          });
          const teamsData = await result.json();
          const teamsMap = teamsData.response.map((item: { team: string[]; }) => item.team);
          setTeams(teamsMap);
        };
      } catch (error) {
        console.error(error);
      }
    };
    fetchTeams();
  }, [leagueId, season]);
  console.log(teams);
  console.log(teamId);

  // const handleSelectChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };

  if (!teams.length) {
    return (<Loading />);
  };

  return (
    <section className="teams-selection">
      {
        (failedLogin)
          ?
          <Error error={error} />
          :
          <>
            <p>Selecione um Time</p>
            <select value={teamId} onChange={({ target: { value } }) => {
              console.log(value);
              setTeamId(value)
            }}>
              {teams.map((team: ITeam) => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
          </>
      }
    </section>
  )
};