// src/components/SignUpForm/SignUpForm.jsx
import { Component } from "react";
import { signUp } from '../../utilities/users-service';
import styles from './SignUpForm.module.scss';

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formData = { ...this.state };
      delete formData.confirm;
      delete formData.error;
      await signUp(formData);
      if (this.props.onSignedUp) this.props.onSignedUp();
      this.setState({ error: '' });
    } catch (e) {
      console.error('Signup error:', e);
      this.setState({ error: e?.message || 'Sign Up Failed - Try Again' });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          {this.state.error && (
            <div style={{
              background: 'rgba(185, 28, 28, 0.15)',
              border: '1px solid rgba(185, 28, 28, 0.35)',
              color: '#fecaca',
              padding: '10px 12px',
              borderRadius: 10,
              marginBottom: 12
            }}>
              {this.state.error}
            </div>
          )}

          <div className={styles.logo}>
            <h1>Create an account</h1>
          </div>

          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />

            <label>Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />

            <label>Confirm</label>
            <input
              type="password"
              name="confirm"
              placeholder="Confirm Password"
              value={this.state.confirm}
              onChange={this.handleChange}
              required
            />

            <button type="submit" disabled={disable}>SIGN UP</button>

            <div className={styles.smallprint}>
              By signing up, you agree to our<br />
              <a href="#">Terms</a>, <a href="#">Privacy Policy</a>, and <a href="#">Cookies Policy</a>.
            </div>
          </form>

          <div className={styles.altAction}>
            Have an account? <a href="#" onClick={(e) => { e.preventDefault(); if (this.props.onGoToLogin) this.props.onGoToLogin(); }}>{' '}Log in</a>
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

        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}