const data = {
  "response": [
    {
      "league": {
        "id": 39,
        "name": "Prem League",
        "type": "League",
        "logo": "https://media.api-sports.io/football/leagues/2.png"
      },
      "country": {
        "name": "England",
        "code": "GB",
        "flag": "https://media.api-sports.io/flags/gb.svg"
      },
      "seasons": [
        {
          "year": 2010,
          "start": "2010-08-14",
          "end": "2011-05-17",
          "current": false,
          "coverage": {}
        },
        {
          "year": 2011,
          "start": "2011-08-13",
          "end": "2012-05-13",
          "current": false,
          "coverage": {}
        },
        {
          "year": 2011,
          "start": "2010-08-14",
          "end": "2011-05-17",
          "current": false,
          "coverage": {}
        },
        {
          "year": 2013,
          "start": "2011-08-13",
          "end": "2012-05-13",
          "current": false,
          "coverage": {}
        }
      ]
    }
  ]
};

const years = data.response[0].seasons.map(season => season.year);
const uniqueYears = years.filter((year, index) => years.indexOf(year) === index);

console.log(uniqueYears);