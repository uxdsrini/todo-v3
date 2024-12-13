import React, { useState } from 'react';
    import { useAuth } from './AuthContext.jsx';
    import App from './App.jsx';

    function LoginPage() {
      const { user, login, signup, resetPassword } = useAuth();
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [isSignUp, setIsSignUp] = useState(false);
      const [isForgotPassword, setIsForgotPassword] = useState(false);

      const handleLogin = async (e) => {
        e.preventDefault();
        try {
          await login(email, password);
        } catch (error) {
          alert(error.message);
        }
      };

      const handleSignUp = async (e) => {
        e.preventDefault();
        try {
          await signup(email, password);
        } catch (error) {
          alert(error.message);
        }
      };

      const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
          await resetPassword(email);
          alert('Password reset email sent');
        } catch (error) {
          alert(error.message);
        }
      };

      if (user) {
        return <App />;
      }

      return (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center">
          <div className="w-full max-w-md bg-white p-6 rounded shadow">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Welcome to the To-Do App</h1>
            {isForgotPassword ? (
              <form onSubmit={handleForgotPassword} className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="p-2 border border-gray-300 rounded mb-2 w-full"
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded shadow">
                  Reset Password
                </button>
              </form>
            ) : (
              <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="p-2 border border-gray-300 rounded mb-2 w-full"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="p-2 border border-gray-300 rounded mb-2 w-full"
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded shadow">
                  {isSignUp ? 'Sign Up' : 'Login'}
                </button>
              </form>
            )}
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-500 mb-2 w-full text-center">
              {isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
            </button>
            <br />
            <button onClick={() => setIsForgotPassword(!isForgotPassword)} className="text-blue-500 w-full text-center">
              Forgot Password?
            </button>
          </div>
        </div>
      );
    }

    export default LoginPage;
