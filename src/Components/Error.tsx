import { IError } from "../Interfaces/IError";
import { useNavigate } from "react-router";

export default function Error({ error }: IError): JSX.Element {
  const history = useNavigate();

  const handleBackToLogin = () => {
    history("/login");
  };

  return (
    <section className="error">
      {
        <>
          <p data-testid="error_report">
            {error}
            <br />
            <br />
            Ainda não tem uma API-Key? Clique <a target="_blank" href="https://dashboard.api-football.com/register" rel="noreferrer">aqui</a> para realizar seu cadastro na API-Footbal.
          </p>
          <button
            type="button"
            className="btn-back"
            data-testid="back_login"
            onClick={handleBackToLogin}>
            Voltar
          </button>
        </>
      }
    </section>
  )
};