import { NavLink } from 'react-router-dom';
import styles from './SideBar.module.scss';
import UserLogout from '../UserLogOut/UserLogOut.jsx';

export default function SideBar({ user, setUser }) {
  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'History', to: '/history' },
    { label: 'Profile', to: '/profile' }, // ✅ ADDED THIS LINE
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>BeatBot</div>

      <nav className={styles.nav}>
        {navItems.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        <UserLogout user={user} setUser={setUser} />
      </div>
    </aside>
  );
}