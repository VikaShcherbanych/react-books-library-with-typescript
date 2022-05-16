import React from "react";
import s from "./Container.module.css";

interface ContainerProps {
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className={s.container}>{children}</div>;
};

export default Container;
