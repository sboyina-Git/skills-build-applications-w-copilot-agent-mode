import { useEffect, useState } from 'react';
import { getApiUrl, normalizeApiResponse } from '../lib/api.js';

// Codespaces endpoint check:
// https://<VITE_CODESPACE_NAME>-8000.app.github.dev/api/activities

function renderRows(items) {
  if (!items.length) {
    return (
      <tr>
        <td colSpan="4">No activities found.</td>
      </tr>
    );
  }

  const headings = Array.isArray(items[0])
    ? []
    : Object.keys(items[0] ?? {});

  return (
    <>
      {headings.length > 0 && (
        <tr>
          {headings.map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      )}
      {items.map((item, index) => (
        <tr key={index}>
          {headings.length > 0 ? (
            headings.map((key) => <td key={key}>{String(item[key] ?? '')}</td>)
          ) : (
            <td>{JSON.stringify(item)}</td>
          )}
        </tr>
      ))}
    </>
  );
}

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch(getApiUrl('activities'));
        const payload = await response.json();
        setActivities(normalizeApiResponse(payload, 'activities'));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, []);

  return (
    <main className="container py-5">
      <h1 className="mb-4">Activities</h1>
      <p className="text-muted">Loading activity records from the backend API.</p>

      {loading && <div className="alert alert-info">Loading activities...</div>}
      {error && <div className="alert alert-danger">Error loading activities: {String(error)}</div>}

      <div className="table-responsive">
        <table className="table table-striped">
          <tbody>{renderRows(activities)}</tbody>
        </table>
      </div>
    </main>
  );
}
