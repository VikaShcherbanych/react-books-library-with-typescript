import { useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { userLogin } from "../../redux/reducers/user/ActionCreators";

import s from "./LoginView.module.css";

const LoginView: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = ({ target: { name = "", value = "" } }) => {
    switch (name) {
      case "email":
        return setEmail(value);
      case "password":
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(userLogin({email, password}));
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h1>Please, log in</h1>

      <form onSubmit={handleSubmit} autoComplete="on" className={s.formLogin}>
        <label className={s.label}>
          E-mail
          <input
            className={s.input}
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label>

        <label className={s.label}>
          Password
          <input
            className={s.input}
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className={s.button}>
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginView;
