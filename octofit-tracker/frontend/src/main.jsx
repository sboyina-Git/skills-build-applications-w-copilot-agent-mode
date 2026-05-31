import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const appConfig = {
  codespaceName: import.meta.env.VITE_CODESPACE_NAME ?? '',
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App appConfig={appConfig} />
  </React.StrictMode>
);
