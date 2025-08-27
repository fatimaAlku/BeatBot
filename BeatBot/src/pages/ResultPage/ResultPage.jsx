// src/pages/ResultPage/ResultPage.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSubmission, listResults } from '../../utilities/submissions-api';
import ResultCard from '../../components/ResultCard/ResultCard.jsx';
import styles from './ResultPage.module.scss';

export default function ResultPage() {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [results, setResults] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    let cancelled = false;
    Promise.all([getSubmission(id), listResults(id)])
      .then(([sub, res]) => {
        if (cancelled) return;
        setSubmission(sub);
        setResults(Array.isArray(res) ? res : []);
      })
      .catch((e) => {
        if (cancelled) return;
        setErr(e?.message || 'Failed to load result');
      });
    return () => { cancelled = true; };
  }, [id]);

  if (err) {
    return (
      <main className={styles.page}>
        <div className={styles.header}>
          <Link to="/history" className={styles.back}>&larr; Back</Link>
          <h2 className={styles.title}>Result</h2>
        </div>
        <p className={styles.error}>{err}</p>
      </main>
    );
  }

  if (!submission) {
    return (
      <main className={styles.page}>
        <div className={styles.loading}>Loading…</div>
      </main>
    );
  }

  const latest = results?.[0];

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <Link to="/history" className={styles.back}>&larr; Back</Link>
        <h2 className={styles.title}>Playlist Result</h2>
        <Link to="/" className={styles.primary}>New Recommendation</Link>
      </div>

      <section className={styles.meta}>
        <div className={styles.chips}>
          <span className={styles.chip}>{submission.ageGroup}</span>
          <span className={styles.chip}>{submission.mood}</span>
          <span className={styles.chip}>{submission.activity}</span>
          <span className={styles.chip}>{submission.energy}</span>
          <span className={styles.chip}>{submission.language}</span>
          <span className={styles.chip}>x{submission.count}</span>
          {(submission.genres || []).map((g) => (
            <span key={g} className={styles.chip}>{g}</span>
          ))}
        </div>
      </section>

      <section className={styles.content}>
        {latest ? (
          <ResultCard
            recommendation={{
              title: latest.title,
              explanation: latest.explanation,
              
              tracks: latest.tracks
            }}
          />
        ) : (
          <p className={styles.muted}>No results yet for this submission.</p>
        )}
      </section>
    </main>
  );
}
