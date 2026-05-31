import { useEffect, useState } from 'react';
import { getApiUrl, normalizeApiResponse } from '../lib/api.js';

// Codespaces endpoint check:
// https://<VITE_CODESPACE_NAME>-8000.app.github.dev/api/workouts

function renderRows(items) {
  if (!items.length) {
    return (
      <tr>
        <td colSpan="4">No workouts found.</td>
      </tr>
    );
  }

  const headings = Object.keys(items[0] ?? {});

  return (
    <>
      <tr>{headings.map((key) => <th key={key}>{key}</th>)}</tr>
      {items.map((item, index) => (
        <tr key={index}>
          {headings.map((key) => <td key={key}>{String(item[key] ?? '')}</td>)}
        </tr>
      ))}
    </>
  );
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const response = await fetch(getApiUrl('workouts'));
        const payload = await response.json();
        setWorkouts(normalizeApiResponse(payload, 'workouts'));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, []);

  return (
    <main className="container py-5">
      <h1 className="mb-4">Workouts</h1>
      <p className="text-muted">Browse workout definitions and records from the backend.</p>

      {loading && <div className="alert alert-info">Loading workouts...</div>}
      {error && <div className="alert alert-danger">Error loading workouts: {String(error)}</div>}

      <div className="table-responsive">
        <table className="table table-striped">
          <tbody>{renderRows(workouts)}</tbody>
        </table>
      </div>
    </main>
  );
}
