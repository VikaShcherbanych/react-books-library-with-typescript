import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

export const Navigation: React.FC = () => {
  return (
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
        to="/user"
        className={(navData) => (navData.isActive ? s.activeLink : s.link)}
      >
        User
      </NavLink>
    </nav>
  );
}