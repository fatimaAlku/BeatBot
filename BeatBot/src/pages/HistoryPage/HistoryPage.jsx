// src/pages/HistoryPage/HistoryPage.jsx
import { useEffect, useState } from 'react';
import { listSubmissions, deleteSubmission } from '../../utilities/submissions-api'; // ADDED: import deleteSubmission
import { Link } from 'react-router-dom';

export default function HistoryPage() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    listSubmissions().then(setItems).catch(() => setErr('Failed to load history'));
  }, []);


  // Delete button
  const handleDelete = async (id) => {
    if (confirm('Delete this recommendation?')) {
      try {
        await deleteSubmission(id);
        setItems(items.filter(item => item._id !== id));
      } catch (error) {
        setErr('Failed to delete');
      }
    }
  };

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

            <button onClick={() => handleDelete(s._id)} style={{marginLeft: '10px', fontSize: '12px', padding: '2px 5px'}}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}