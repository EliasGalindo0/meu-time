import { IError } from "../Interfaces/IError";

export default function FailedLogin({ error }: IError): JSX.Element {
  return (
    <section className="failedLogin">
      {
        <p data-testid="login__input_invalid_login_alert">
          {error}
          <br />
          <br />
          Ainda não tem uma API-Key? Clique <a target="_blank" href="https://dashboard.api-football.com/register" rel="noreferrer">aqui</a> para realizar seu cadastro na API-Footbal.
        </p>
      }
    </section>
  )
};