// src/pages/AuthPage/AuthPage.jsx
import { useState } from 'react';
import styles from './AuthPage.module.scss';
import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import SignUpForm from '../../components/SignUpForm/SignUpForm.jsx';

export default function AuthPage({ setUser }) {
  // false => show Sign Up first
  const [showLogin, setShowLogin] = useState(false);
  const [justSignedUp, setJustSignedUp] = useState(false);

  const handleSignedUp = () => {
    setShowLogin(true); // switch to Login tab after sign up
  };

  const toggle = () => {
    setShowLogin(prev => !prev);
    setJustSignedUp(false);
  };

  const goToLogin = () => {
    setShowLogin(true);
    setJustSignedUp(false);
  };

  return (
    <main className={styles?.AuthPage || ''}>
      {/* LEFT: image only (pinned to bottom) */}
      <section className={styles.left} aria-hidden="true">
        <img className={styles.hero} src="/AI.png" alt="" aria-hidden="true" />
      </section>

      {/* RIGHT: title + form (keeps position) */}
      <section className={styles.right}>
        <h1 className={styles.logoText}>BeatBot</h1>
        {showLogin ? (
          <LoginForm setUser={setUser} onGoToSignup={() => setShowLogin(false)} />
        ) : (
          <SignUpForm setUser={setUser} onSignedUp={handleSignedUp} onGoToLogin={() => setShowLogin(true)} />
        )}
      </section>
    </main>
  );
}
