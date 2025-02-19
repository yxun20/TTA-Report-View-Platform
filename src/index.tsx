import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';
import './index.css';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
