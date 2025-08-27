import styles from "./ProfilePage.module.scss";
import { getProfile, updateProfile } from '../../utilities/users-api';
import { useState, useEffect, useMemo } from "react";
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
    (async () => {
      try {
        const data = await getProfile();
        setLocalUser(data);
        setNameInput(data?.name || '');
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    })();
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
      setError(err.message || 'Update failed');
    }
  }

  const initials = useMemo(() => {
    const n = (user?.name || user?.email || '?').trim();
    const parts = n.split(/\s+/);
    const first = parts[0]?.[0] || '';
    const last = parts[1]?.[0] || '';
    return (first + last || first || '?').toUpperCase();
  }, [user]);

  if (loading) return <main className={styles.page}><div className={styles.loading}>Loading profile…</div></main>;
  if (error)   return <main className={styles.page}><div className={styles.error}>{error}</div></main>;

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.avatar} aria-hidden="true">{initials}</div>
          <div className={styles.headText}>
            <h2 className={styles.title}>Your Profile</h2>
            <div className={styles.name}>{user?.name}</div>
            <div className={styles.email}>{user?.email}</div>
          </div>
          {!isEditing && (
            <button className={styles.editBtn} onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>

        {/* Edit form */}
        {isEditing && (
         <form className={styles.editForm} onSubmit={handleSave}>
  <label htmlFor="displayName" className={styles.formLabel}>Display name</label>
  <input
    id="displayName"
    className={styles.input}
    value={nameInput}
    onChange={(e) => setNameInput(e.target.value)}
    placeholder="Your name"
  />
  <div className={styles.btnRow}>
    <button type="button" className={styles.cancelBtn} onClick={() => setIsEditing(false)}>
      Cancel
    </button>
    <button type="submit" className={styles.saveBtn}>
      Save
    </button>
  </div>
</form>

        )}

        {/* Body grid */}
        <div className={styles.bodyGrid}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Account Details</h3>
            <dl className={styles.detailsGrid}>
              <div className={styles.kv}><dt>Name</dt><dd>{user?.name || '—'}</dd></div>
              <div className={styles.kv}><dt>Email</dt><dd>{user?.email || '—'}</dd></div>
              <div className={styles.kv}><dt>User ID</dt><dd className={styles.mono}>{user?._id || '—'}</dd></div>
            </dl>
          </section>

          <aside className={styles.section}>
            <h3 className={styles.sectionTitle}>Tips</h3>
            <ul className={styles.tips}>
              <li>Your display name appears in the sidebar and submissions.</li>
              <li>Your email is never shown publicly.</li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
