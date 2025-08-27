// src/pages/AuthPage/AuthPage.jsx
import { useState } from 'react';
import styles from './AuthPage.module.scss';
import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import SignUpForm from '../../components/SignUpForm/SignUpForm.jsx';
import hero from '../../assets/beatbot-hero.png';

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(false);   // Sign Up first
  const [justSignedUp, setJustSignedUp] = useState(false);

  const handleSignedUp = () => {
    setShowLogin(true);
    setJustSignedUp(true);
  };

  const toggle = () => {
    setShowLogin(prev => !prev);
    setJustSignedUp(false);
  };

  return (
    <main className={styles?.AuthPage || ''}>
      {/* Left: hero */}
      <div className={styles.hero}>
        <img className={styles.heroImg} src={hero} alt="BeatBot AI with headphones" />
        <h2 className={styles.title}>BeatBot</h2>
        <h3
          role="button"
          tabIndex={0}
          onClick={toggle}
          onKeyDown={(e) => (e.key === 'Enter' ? toggle() : null)}
        >
          {showLogin ? 'Need an account? Signup' : 'Already have an account? Login'}
        </h3>

        {justSignedUp && (
          <div className={styles.banner}>
            
          </div>
        )}
      </div>

      {/* Right: forms */}
      <div className={styles.authColumn}>
        {showLogin
          ? <LoginForm setUser={setUser} />
          : <SignUpForm setUser={setUser} onSignedUp={handleSignedUp} />
        }
      </div>
    </main>
  );
}
