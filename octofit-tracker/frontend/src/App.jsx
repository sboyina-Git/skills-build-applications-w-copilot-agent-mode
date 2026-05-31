import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { apiHost } from './lib/api.js';

function Home({ codespaceName }) {
  return (
    <main className="container py-5">
      <h1>Octofit Tracker</h1>
      <p className="lead">Welcome to the modern multi-tier fitness tracker built with React 19 and Vite.</p>
      <div className="alert alert-secondary">
        <strong>Backend API base URL:</strong> {apiHost}/api/
      </div>
      <div className="alert alert-info">
        {codespaceName
          ? `Codespaces mode enabled. Using VITE_CODESPACE_NAME=${codespaceName}`
          : 'Codespaces name not defined. Falling back to localhost API at http://localhost:8000.'}
      </div>
      <p>Use the navigation links above to view Users, Teams, Activities, Workouts, and Leaderboard pages.</p>
    </main>
  );
}

function NavItem({ to, label }) {
  return (
    <li className="nav-item">
      <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to={to}>
        {label}
      </NavLink>
    </li>
  );
}

export default function App({ appConfig }) {
  const codespaceName = appConfig?.codespaceName ?? '';

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Octofit Tracker
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto">
              <NavItem to="/users" label="Users" />
              <NavItem to="/teams" label="Teams" />
              <NavItem to="/activities" label="Activities" />
              <NavItem to="/workouts" label="Workouts" />
              <NavItem to="/leaderboard" label="Leaderboard" />
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home codespaceName={codespaceName} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}
