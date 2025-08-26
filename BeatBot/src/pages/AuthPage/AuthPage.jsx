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
    setShowLogin(true);     // flip to Login tab
    setJustSignedUp(true);  // show banner
  };

  const toggle = () => {
    setShowLogin(prev => !prev);
    setJustSignedUp(false); // clear banner when switching tabs
  };

  return (
    <main className={styles?.AuthPage || ''}>
      <div>
        <h2 className={styles.title}>BeatBot</h2>
        <h3
          role="button"
          tabIndex={0}
          onClick={toggle}
          onKeyDown={(e) => (e.key === 'Enter' ? toggle() : null)}
          style={{ cursor: 'pointer', userSelect: 'none' }}
        >
          {showLogin ? 'Need an account? SIGN UP' : 'Already have an account? LOG IN'}
        </h3>

        {justSignedUp && (
          <div style={{
            marginTop: 8,
            padding: '8px 12px',
            borderRadius: 8,
            background: '#ecfeff',
            color: '#0e7490',
            fontSize: '.95rem'
          }}>
            Account created! Please log in to continue.
          </div>
        )}
      </div>

      {showLogin
        ? <LoginForm setUser={setUser} />
        : <SignUpForm setUser={setUser} onSignedUp={handleSignedUp} />
      }
    </main>
  );
}