import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import s from "./Navigation.module.css";

import { Context } from "../../index";

const Navigation: React.FC = () => {
  const { store } = useContext(Context);
  return (
    <>
      {!store.isAuth ? (
        <nav className={s.nav}>
          <NavLink
            to="/"
            className={(navData) => (navData.isActive ? s.activeLink : s.link)}
          >
            BestSellers
          </NavLink>

          <NavLink
            to="/books"
            className={(navData) => (navData.isActive ? s.activeLink : s.link)}
          >
            SearchBooks
          </NavLink>
          <div>
            <NavLink
              to="/registration"
              className={(navData) =>
                navData.isActive ? s.activeLink : s.link
              }
            >
              Sing Up
            </NavLink>

            <NavLink
              to="/login"
              className={(navData) =>
                navData.isActive ? s.activeLink : s.link
              }
            >
              Log In
            </NavLink>
          </div>
        </nav>
      ) : (
        <nav className={s.nav}>
          <NavLink
            to="/"
            className={(navData) => (navData.isActive ? s.activeLink : s.link)}
          >
            BestSellers
          </NavLink>

          <NavLink
            to="/books"
            className={(navData) => (navData.isActive ? s.activeLink : s.link)}
          >
            SearchBooks
          </NavLink>
          <NavLink
            to="/library"
            className={(navData) => (navData.isActive ? s.activeLink : s.link)}
          >
            Library
          </NavLink>
          <div>
            <button onClick={() => store.logout()} className={s.navButton}>
              LogOut
            </button>
          </div>
        </nav>
      )}
    </>
  );
};

export default observer(Navigation);
