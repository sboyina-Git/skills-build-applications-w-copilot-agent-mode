import { useEffect, useState } from 'react';
import { getApiUrl, normalizeApiResponse } from '../lib/api.js';

function renderRows(items) {
  if (!items.length) {
    return (
      <tr>
        <td colSpan="4">No teams found.</td>
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

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch(getApiUrl('teams'));
        const payload = await response.json();
        setTeams(normalizeApiResponse(payload, 'teams'));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, []);

  return (
    <main className="container py-5">
      <h1 className="mb-4">Teams</h1>
      <p className="text-muted">Review team metadata delivered by the backend API.</p>

      {loading && <div className="alert alert-info">Loading teams...</div>}
      {error && <div className="alert alert-danger">Error loading teams: {String(error)}</div>}

      <div className="table-responsive">
        <table className="table table-striped">
          <tbody>{renderRows(teams)}</tbody>
        </table>
      </div>
    </main>
  );
}
