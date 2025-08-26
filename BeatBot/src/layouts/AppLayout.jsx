// src/layouts/AppLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar/SideBar.jsx';
import styles from './AppLayout.module.scss';

export default function AppLayout({ user, setUser }) {
  return (
    <div className={styles.shell}>
      <SideBar user={user} setUser={setUser} />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
