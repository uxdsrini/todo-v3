import React, { useState } from 'react';
    import LoginPage from './LoginPage.jsx';

    function LandingPage() {
      const [showLogin, setShowLogin] = useState(false);

      const handleGetStarted = () => {
        setShowLogin(true);
      };

      return (
        <div>
          {showLogin ? (
            <LoginPage />
          ) : (
            <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center">
              <div className="w-full max-w-md bg-white p-6 rounded shadow text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to the To-Do App</h1>
                <p className="text-lg mb-6">Manage your tasks efficiently with our simple and intuitive to-do list.</p>
                <button onClick={handleGetStarted} className="p-4 bg-blue-500 text-white rounded">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    export default LandingPage;
