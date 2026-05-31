import { useEffect, useState } from 'react';
import { getApiUrl, normalizeApiResponse } from '../lib/api.js';

// Codespaces endpoint check:
// https://<VITE_CODESPACE_NAME>-8000.app.github.dev/api/users

function renderRows(items) {
  if (!items.length) {
    return (
      <tr>
        <td colSpan="4">No users found.</td>
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

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(getApiUrl('users'));
        const payload = await response.json();
        setUsers(normalizeApiResponse(payload, 'users'));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <main className="container py-5">
      <h1 className="mb-4">Users</h1>
      <p className="text-muted">Fetch user records from the backend API.</p>

      {loading && <div className="alert alert-info">Loading users...</div>}
      {error && <div className="alert alert-danger">Error loading users: {String(error)}</div>}

      <div className="table-responsive">
        <table className="table table-striped">
          <tbody>{renderRows(users)}</tbody>
        </table>
      </div>
    </main>
  );
}
