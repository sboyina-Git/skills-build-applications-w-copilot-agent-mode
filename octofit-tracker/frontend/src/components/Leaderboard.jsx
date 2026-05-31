import { useEffect, useState } from 'react';
import { getApiUrl, normalizeApiResponse } from '../lib/api.js';

function renderRows(items) {
  if (!items.length) {
    return (
      <tr>
        <td colSpan="4">No leaderboard entries found.</td>
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

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch(getApiUrl('leaderboard'));
        const payload = await response.json();
        setLeaderboard(normalizeApiResponse(payload, 'leaderboard'));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  return (
    <main className="container py-5">
      <h1 className="mb-4">Leaderboard</h1>
      <p className="text-muted">Compare team or user performance from the backend.</p>

      {loading && <div className="alert alert-info">Loading leaderboard...</div>}
      {error && <div className="alert alert-danger">Error loading leaderboard: {String(error)}</div>}

      <div className="table-responsive">
        <table className="table table-striped">
          <tbody>{renderRows(leaderboard)}</tbody>
        </table>
      </div>
    </main>
  );
}
