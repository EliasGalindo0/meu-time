import { useState } from "react";
import { Navigate } from "react-router";

export default function Login(): JSX.Element {
  const [user, setUser] = useState<string | any>('');
  const [token, setToken] = useState<string | any>('');
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const login = async (event: any) => {
    event.preventDefault();

    try {
      setToken(token);

      localStorage.setItem('token', token);

      setIsLogged(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordChange = (event: any) => {
    const tokenLength: any = process.env.REACT_APP_API_KEY;
    setToken(event.target.value);
    if (event.target.value.length < tokenLength.length) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  if (isLogged) return <Navigate to="/countries" />;

  return (
    <section className="user-login-area">

      <form>
        <h1>Meu Time</h1>
        <h3>Login</h3>

        <input
          className="login__login_input"
          type="text"
          value={user}
          onChange={({ target: { value } }) => setUser(value)}
          data-testid="login__login_input"
          placeholder="Nome"
        />

        <input
          id="password"
          type="password"
          value={token}
          onChange={handlePasswordChange}
          data-testid="login__password_input"
          placeholder="API-Key"
        />
        <br />
        <button
          id="submit"
          data-testid="login__login_btn"
          type="submit"
          onClick={(event) => login(event)}
          disabled={buttonDisabled}
        >
          Entrar
        </button>
      </form>
    </section>
  )
};