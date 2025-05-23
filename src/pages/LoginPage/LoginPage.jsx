import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/authSlice'; // Import the thunk
import './LoginPage.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(''); // For form validation errors
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: reduxError, isAuthenticated } = useSelector((state) => state.auth);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect if already authenticated
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(''); // Clear previous local errors

    if (!validateEmail(email)) {
      setLocalError('Invalid email format.');
      return;
    }

    if (!password) {
      setLocalError('Password is required.');
      return;
    }

    // Dispatch the thunk. Result can be awaited if needed for component-specific logic after completion.
    // The thunk itself will handle updating Redux state (loading, error, user, isAuthenticated).
    const resultAction = await dispatch(loginUser({ email, password }));
    
    // Check if login was successful using unwrap (or check action.type if not using unwrap)
    if (loginUser.fulfilled.match(resultAction)) {
        // No need to navigate here if redirection is handled by useEffect or a ProtectedRoute
        // navigate('/'); // Navigate on successful login
    } else {
        // Error is already set in Redux state by the thunk's rejected case
        // If you need to display a generic message or do something specific here, you can.
        // The reduxError will be picked by the useSelector and displayed.
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} className="login-form">
          {(localError || reduxError) && (
            <p className="error-message">{localError || reduxError}</p>
          )}
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading} // Disable input when loading
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading} // Disable input when loading
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="login-options">
          {/* <label>
            <input type="checkbox" /> Remember me
          </label> */}
          {/* <a href="#">Need help?</a> */}
        </div>
        <p className="signup-link">
          New to Netflix? <Link to="/signup">Sign up now</Link>.
        </p>
         {/* <p className="recaptcha-notice">
          This page is protected by Google reCAPTCHA to ensure you're not a bot. 
          <a href="#">Learn more.</a>
        </p> */}
      </div>
    </div>
  );
};

export default LoginPage;
