export interface ILeague {
  country: string;
  failedLogin: boolean;
  error?: string | null;
};

export interface ILeagueMap {
  year: number;
  league?: ILeague | any;
  name: string;
  id: number;
  seasons: ILeague | any;
};