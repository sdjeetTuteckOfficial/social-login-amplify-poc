import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Amplify } from 'aws-amplify';
import { awsExports } from '../aws-amplify.js';

Amplify.configure(awsExports);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
