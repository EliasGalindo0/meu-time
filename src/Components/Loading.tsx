export default function Loading(): JSX.Element {
  return (
    <section className="loading">
      {
        <>
          <p>Carregando...</p>
          <img
            className="footbal-loading"
            src="https://w7.pngwing.com/pngs/248/249/png-transparent-american-football-football-team-football-sport-sports-equipment-football-team.png"
            alt="loading" />
        </>

      }
    </section>
  )
};