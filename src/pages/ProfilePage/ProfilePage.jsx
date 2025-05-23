import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/authSlice';
import './ProfilePage.scss';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated && !loading) { // Check loading to prevent redirect during auth state initialization
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleLogout = () => {
    dispatch(logoutUser())
      .then(() => {
        navigate('/'); // Redirect to home after logout
      })
      .catch(() => {
        // Handle potential logout errors if any, though mock is unlikely to have them
        console.error("Logout failed");
        navigate('/'); // Still redirect
      });
  };

  if (loading || !isAuthenticated) {
    // Display a loading indicator or null while checking auth state or redirecting
    // This prevents a flash of the profile page content for unauthenticated users
    return (
      <div className="profile-page-loading">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Your Profile</h1>
        <div className="profile-info">
          {user?.email ? (
            <p><strong>Email:</strong> {user.email}</p>
          ) : (
            <p>Email not found.</p>
          )}
          {/* Add more user details here as they become available */}
        </div>
        <button onClick={handleLogout} className="logout-button-profile">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
