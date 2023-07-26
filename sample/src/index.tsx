import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

reportWebVitals();
