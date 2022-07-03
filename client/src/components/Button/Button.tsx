import React from "react";
import s from "./Button.module.css";

interface IButtonProps {
  onClick: () => void;
  text: string;
}

const Button: React.FC<IButtonProps> = ({ onClick, text }) => {
  return (
    <button onClick={onClick} className={s.button} type="button">
      {text}
    </button>
  );
};

export default Button;
