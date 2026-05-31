import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <main className="container py-5">
      <h1>Octofit Tracker</h1>
      <p className="lead">
        Welcome to the modern multi-tier fitness tracker built with React 19 and Vite.
      </p>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Octofit Tracker
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
