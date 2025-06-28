import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './LoginPage.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="auth-overlay"></div>
      </div>
      <div className="auth-container">
        <div className="auth-header">
          <Link to="/" className="auth-logo">FLICKNEST</Link>
        </div>
        <div className="auth-form-container">
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="input-group">
              <input
                type="email"
                placeholder="Email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="netflix-input"
                disabled={loading}
                required
              />
            </div>
            
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="netflix-input"
                disabled={loading}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="netflix-button auth-submit-button" 
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <div className="auth-help">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="help-link">Need help?</a>
          </div>
          
          <div className="auth-signup">
            <p>
              New to Flicknest? <Link to="/signup">Sign up now</Link>.
            </p>
          </div>
          
          <div className="auth-captcha">
            <p>
              This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
              <a href="#">Learn more.</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;