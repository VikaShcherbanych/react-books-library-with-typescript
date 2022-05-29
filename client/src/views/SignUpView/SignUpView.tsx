import { useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { userRegistration } from "../../redux/reducers/user/ActionCreators";
import s from "./SignUpView.module.css";

const SignUpView: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

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
    dispatch(userRegistration({email, password}));
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h1>Please, sign up</h1>

      <form onSubmit={handleSubmit} autoComplete="on" className={s.formSignUp}>
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
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUpView;
