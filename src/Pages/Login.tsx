import { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  const login = async (event: any) => {
    event.preventDefault();

    try {
      const { token } = await requestLogin('/login', { email, password });

      setToken(token);

      const { role } = await requestData('/login/validate', { email, password });

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      setIsLogged(true);
    } catch (error) {
      setFailedTryLogin(true);
      setIsLogged(false);
    }
  };

  useEffect(() => {
    setFailedTryLogin(false);
  }, [user, setUser]);

  if (isLogged) return <Navigate to="/coutries" />;


  return (

    <section className="user-login-area">

      <form>
        <h1>Área do usuário</h1>
        <label htmlFor="email-input">
          <input
            className="login__login_input"
            type="text"
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
            data-testid="login__login_input"
            placeholder="Nome"
          />
        </label>
        <label htmlFor="password-input">
          <input
            type="password"
            value={token}
            onChange={({ target: { value } }) => setPassword(value)}
            data-testid="login__password_input"
            placeholder="API Key"
          />
        </label>
        {
          (failedTryLogin)
            ? (
              <p data-testid="login__input_invalid_login_alert">
                {
                  `O endereço de e-mail ou a senha não estão corretos.
                  Por favor, tente novamente.`
                }
              </p>
            )
            : null
        }
        <button
          data-testid="login__login_btn"
          type="submit"
          onClick={(event) => login(event)}
        >
          Entrar
        </button>
      </form>
    </section>
  )
};

export default Login;