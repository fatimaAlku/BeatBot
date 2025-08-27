
  import SideBar from "../../components/SideBar/SideBar.jsx";
  import styles from "./ProfilePage.module.scss";
  import { getProfile, updateProfile } from '../../utilities/users-api';
  import { useState, useEffect } from "react";
  import { getUser } from '../../utilities/users-service';
  import { useOutletContext } from "react-router-dom";
  export default function ProfilePage({ user: authedUser, setUser }) {
    const outlet = useOutletContext?.() || {};
    const effectiveSetUser = setUser || outlet.setUser;
    const [user, setLocalUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [nameInput, setNameInput] = useState('');
useEffect(() => {
  async function fetchUser() {
    try {
      const data = await getProfile();
      setLocalUser(data);
      setNameInput(data?.name || '');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
      fetchUser();
    }, []);
    async function handleSave(e) {
      e.preventDefault();
      try {
        const { user: updated, token } = await updateProfile({ name: nameInput });
        if (token) localStorage.setItem('token', token);
        setLocalUser(updated);
        if (effectiveSetUser) effectiveSetUser(getUser());
        setIsEditing(false);
      } catch (err) {
        setError(err.message);
      }
    }

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
      <div className={styles.profileContainer}>
        <h1 className={styles.title}>Profile</h1>
        <p className={styles.subtitle}>Edit your profile user name and review your account info.</p>

        {isEditing ? (
          <form className={styles.editForm} onSubmit={handleSave}>
            <input
              className={styles.input}
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Your name"
            />
            <div className={styles.btnRow}>
              <button type="button" className={`${styles.btn} ${styles.secondaryBtn}`} onClick={() => setIsEditing(false)}>Cancel</button>
              <button type="submit" className={`${styles.btn} ${styles.primaryBtn}`}>Save</button>
            </div>
          </form>
        ) : (
          <>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            <div className={styles.btnRow}>
              <button className={`${styles.btn} ${styles.primaryBtn}`} onClick={() => setIsEditing(true)}>Edit Profile</button>
            </div>

            <div className={styles.section}>
              <h3>Account Details</h3>
              <div className={styles.detailsGrid}>
                <div className={styles.label}>Name</div>
                <div className={styles.value}>{user?.name || '—'}</div>
                <div className={styles.label}>Email</div>
                <div className={styles.value}>{user?.email || '—'}</div>
                <div className={styles.label}>User ID</div>
                <div className={styles.value}>{user?._id || '—'}</div>
              </div>
            </div>

            <div className={styles.section}>
              <h3>Tips</h3>
              <ul className={styles.tips}>
                <li>Your name appears in the sidebar and submissions.</li>
                <li>Keep your profile up to date for better collaboration.</li>
                <li>We do not display your email publicly.</li>
              </ul>
            </div>
          </>
        )}
      </div>
    );
  }