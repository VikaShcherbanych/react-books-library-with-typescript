import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { userLogout } from "../../redux/reducers/user/ActionCreators";

const Navigation: React.FC = () => {
  const dispatch = useAppDispatch();
  const store = useAppSelector(state => state.auth);

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
            <button onClick={() => dispatch(userLogout())} className={s.navButton}>
              LogOut
            </button>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navigation;