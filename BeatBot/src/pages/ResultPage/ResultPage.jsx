// src/pages/ResultPage/ResultPage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSubmission, listResults } from '../../utilities/submissions-api';
import ResultCard from '../../components/ResultCard/ResultCard';

export default function ResultPage() {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [results, setResults] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    Promise.all([getSubmission(id), listResults(id)])
      .then(([sub, res]) => { setSubmission(sub); setResults(res); })
      .catch(() => setErr('Failed to load result'));
  }, [id]);

  if (err) return <p>{err}</p>;
  if (!submission) return <p>Loading...</p>;

  const latest = results[0]; // newest first due to backend sort

  return (
    <main>
      <h2>Result</h2>
      {latest ? (
        <ResultCard recommendation={{
          title: latest.title,
          explanation: latest.explanation,
          metadata: latest.metadata,
          tracks: latest.tracks
        }}/>
      ) : (
        <p>No results yet for this submission.</p>
      )}
    </main>
  );
}