export const fetchData = async (token: string): Promise<any> => {
  const data = await fetch(`${process.env.REACT_APP_BASE_URL}/countries` as string, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": `${token}`
    }
  });
  const jsonData = await data.json();

  return jsonData.response;
};