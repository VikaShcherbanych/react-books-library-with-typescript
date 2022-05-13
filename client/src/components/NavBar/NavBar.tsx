import { Navigation } from '../Navigation/Navigation';
import s from './NavBar.module.css';

const NavBar: React.FC = () => {
  return (
    <header className={s.header}>
      <Navigation />
    </header>
  );
}

export default NavBar;