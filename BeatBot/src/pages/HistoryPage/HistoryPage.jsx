// src/pages/HistoryPage/HistoryPage.jsx
import { useEffect, useState } from 'react';
import { listSubmissions } from '../../utilities/submissions-api';
import { Link } from 'react-router-dom';

export default function HistoryPage() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    listSubmissions().then(setItems).catch(() => setErr('Failed to load history'));
  }, []);

  if (err) return <p>{err}</p>;

  return (
    <main>
      <h2>Your Past Recommendations</h2>
      <ul>
        {items.map(s => (
          <li key={s._id}>
            <Link to={`/results/${s._id}`}>
              {new Date(s.createdAt).toLocaleString()} — {s.mood}/{s.activity} ({s.count})
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}