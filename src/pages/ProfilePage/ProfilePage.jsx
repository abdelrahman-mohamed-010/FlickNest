import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useWatchlist } from '../../hooks/useWatchlist';
import { updateProfile } from '../../lib/supabase';
import './ProfilePage.scss';

const ProfilePage = () => {
  const { user, profile, signOut } = useAuth();
  const { watchlist } = useWatchlist();
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { error } = await updateProfile(user.id, { full_name: fullName });
      if (error) {
        setMessage(error.message);
      } else {
        setMessage('Profile updated successfully!');
        setEditing(false);
      }
    } catch (err) {
      setMessage('An error occurred while updating your profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              {(profile?.full_name || user?.email || 'U').charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="profile-info">
            <h1>{profile?.full_name || 'User'}</h1>
            <p className="profile-email">{user?.email}</p>
            <p className="profile-stats">{watchlist.length} movies in watchlist</p>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2>Account Information</h2>
            {message && (
              <div className={`message ${message.includes('success') ? 'success-message' : 'error-message'}`}>
                {message}
              </div>
            )}
            
            {editing ? (
              <form onSubmit={handleUpdateProfile} className="profile-form">
                <div className="input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="netflix-input"
                    disabled={loading}
                  />
                </div>
                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="netflix-button" 
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button 
                    type="button" 
                    className="netflix-button secondary" 
                    onClick={() => setEditing(false)}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-details">
                <div className="detail-item">
                  <label>Full Name</label>
                  <span>{profile?.full_name || 'Not set'}</span>
                </div>
                <div className="detail-item">
                  <label>Email</label>
                  <span>{user?.email}</span>
                </div>
                <div className="detail-item">
                  <label>Member Since</label>
                  <span>{new Date(user?.created_at).toLocaleDateString()}</span>
                </div>
                <button 
                  className="netflix-button secondary" 
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          <div className="profile-section">
            <h2>Account Actions</h2>
            <div className="account-actions">
              <button 
                className="netflix-button secondary" 
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;