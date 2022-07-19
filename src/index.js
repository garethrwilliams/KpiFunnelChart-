import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StaffProvider } from './contexts/Data';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StaffProvider>
    <App />
  </StaffProvider>
);
