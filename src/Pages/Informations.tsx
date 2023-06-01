import { useEffect, useState } from "react";
import { IPlayer, IPlayersProps } from "../Interfaces/IPlayer";
import Loading from "../Components/Loading";
import Error from "../Components/Error";

export default function Informations({ teamId, failedLogin, error }: IPlayersProps): JSX.Element {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [playerId, setPlayerId] = useState<number | string>('');

  useEffect(() => {
    const fetchPalyers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (teamId) {
          const result = await fetch(`${process.env.REACT_APP_URL_TEAMS_SQUADS}${teamId}` as string, {
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": `${token}`
            }
          });
          const playersData = await result.json();
          const teamsMap = playersData.response.map((item: {
            players: any; team: string[];
          }) => item.players);
          setPlayers(teamsMap);
        };
      } catch (error) {
        console.error(error);
      }
    };
    fetchPalyers();
  }, [players, teamId]);
  console.log(players);
  console.log(playerId);


  if (!players.length) {
    return (<Loading />);
  };

  return (
    <section className="players-selection">
      {
        (failedLogin)
          ?
          <Error error={error} />
          :
          <>
            <p>Selecione um Time</p>
            <select value={teamId} onChange={({ target: { value } }) => {
              console.log(value);
              setPlayerId(value)
            }}>
              {players.map((player: IPlayer) => (
                <option key={player.id} value={player.id}>{player.name}</option>
              ))}
            </select>
          </>
      }
    </section>
  )
}