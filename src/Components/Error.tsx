import { IError } from "../Interfaces/IError";

export default function Error({ error }: IError): JSX.Element {
  return (
    <section className="error">
      {
        <p data-testid="error_report">
          {error}
          <br />
          <br />
          Ainda não tem uma API-Key? Clique <a target="_blank" href="https://dashboard.api-football.com/register" rel="noreferrer">aqui</a> para realizar seu cadastro na API-Footbal.
        </p>
      }
    </section>
  )
};