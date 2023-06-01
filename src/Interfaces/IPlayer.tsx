export interface IPlayer {
  players: IPlayer[];
  id: number;
  name: string;
}

export interface IPlayersProps {
  failedLogin: boolean;
  teamId: number;
  error: string;
  player: IPlayer;
}