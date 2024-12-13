import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App.jsx';
    import LandingPage from './LandingPage.jsx';
    import './index.css';
    import { AuthProvider } from './AuthContext.jsx';

    ReactDOM.render(
      <React.StrictMode>
        <AuthProvider>
          <LandingPage />
        </AuthProvider>
      </React.StrictMode>,
      document.getElementById('root')
    );
