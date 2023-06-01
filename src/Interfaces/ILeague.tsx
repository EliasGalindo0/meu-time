export interface ILeague {
  country: string;
  failedLogin: boolean;
  error?: string;
};

export interface ILeagueMap {
  league?: ILeague | any;
};