import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './SignUpPage.scss';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const { error } = await signUp(email, password, fullName);
      if (error) {
        setError(error.message);
      } else {
        // Show success message and redirect to login
        alert('Account created successfully! Please check your email to verify your account, then sign in.');
        navigate('/login');
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
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="input-group">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="netflix-input"
                disabled={loading}
                required
              />
            </div>
            
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
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
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="netflix-input"
                disabled={loading}
                required
                minLength={6}
              />
            </div>
            
            <button 
              type="submit" 
              className="netflix-button auth-submit-button" 
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          
          <div className="auth-signup">
            <p>
              Already have an account? <Link to="/login">Sign in now</Link>.
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

export default SignUpPage;