import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import styles from './LoginForm.module.scss';

export default function LoginForm({ setUser, onGoToSignup }) {
const [credentials, setCredentials] = useState({
  email: '',
  password: ''
});
const [error, setError] = useState('');

function handleChange(evt) {
  setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
  setError('');
}

async function handleSubmit(evt) {
  // Prevent form from being submitted to the server
  evt.preventDefault();
  try {
    // The promise returned by the signUp service method
    // will resolve to the user object included in the
    // payload of the JSON Web Token (JWT)
    const user = await usersService.login(credentials);
    setUser(user);
  } catch (e) {
    setError(e?.message || 'Log In Failed - Try Again');
  }
}

return (
  <div className={styles.wrapper}>
    <div className={styles.card}>
      {error && (
        <div style={{
          background: 'rgba(185, 28, 28, 0.15)',
          border: '1px solid rgba(185, 28, 28, 0.35)',
          color: '#fecaca',
          padding: '10px 12px',
          borderRadius: 10,
          marginBottom: 12
        }}>
          {error}
        </div>
      )}

      <div className={styles.logo}>
        <h1>Welcome back</h1>
      </div>

      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
        <label>Password</label>
        <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
        <button type="submit">LOG IN</button>

        <div className={styles.smallprint}>
          By logging in, you agree to our<br />
          <a href="#">Terms</a>, <a href="#">Privacy Policy</a>, and <a href="#">Cookies Policy</a>.
        </div>
      </form>

      <div className={styles.altAction}>
        Need an account? <a href="#" onClick={(e) => { e.preventDefault(); if (onGoToSignup) onGoToSignup(); }}>Sign up</a>
      </div>

      <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
        <span>Get the app</span>
        <div className={styles.badges}>
          <img
            style={{ height: '40px' }}
            src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
            alt="Android App"
          />
          <img
            style={{ height: '40px' }}
            src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
            alt="iOS App"
          />
        </div>
      </div>
    </div>

    <p className="error-message">&nbsp;{error}</p>
  </div>
);
}