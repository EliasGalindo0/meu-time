export interface ITeam {
  season: number;
  leagueId: number;
  country: string;
  error?: string;
  failedLogin: boolean;
}