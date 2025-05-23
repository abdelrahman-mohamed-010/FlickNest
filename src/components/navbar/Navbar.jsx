import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import "./Navbar.scss";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Placeholder for profile
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // For logout
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/authSlice"; // Import logoutUser thunk

function Navbar() {
  const [openIcon, setOpenIcon] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLinkClick = () => {
    setOpenIcon(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatch the thunk
    handleLinkClick(); // Close mobile menu if open
    navigate("/"); // Redirect to home after logout
  };

  const renderAuthLinks = () => {
    if (isAuthenticated) {
      return (
        <>
          <li className="navbar-item">
            {/* Placeholder Profile Link */}
            <NavLink to="/profile" className="navbar-link" onClick={handleLinkClick}>
              <AccountCircleIcon style={{ verticalAlign: 'middle', marginRight: '5px' }} />
              {/* {user?.email ? user.email.split('@')[0] : 'Profile'} */}
            </NavLink>
          </li>
          <li className="navbar-item">
            <button onClick={handleLogout} className="navbar-button logout-button">
              <ExitToAppIcon style={{ verticalAlign: 'middle', marginRight: '5px' }} />
              Logout
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="navbar-item">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "navbar-link active" : "navbar-link"
              }
              onClick={handleLinkClick}
            >
              Login
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink
              to="/signup"
              className="navbar-button signup-button" // Style as a button
              onClick={handleLinkClick}
            >
              Sign Up
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <>
      <nav className="navbar" ref={menuRef}>
        <div className={openIcon ? "left icon-open" : "left"}>
          <div className="navbar-brand">
            <NavLink to="/" onClick={handleLinkClick}>
              <span className="navbar-title">LOGO</span> {/* Make logo a NavLink to home */}
            </NavLink>
          </div>
          <ul className="navbar-menu">
            <li className="navbar-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "navbar-link active" : "navbar-link"
                }
                onClick={handleLinkClick}
              >
                Home
              </NavLink>
            </li>
            {isAuthenticated && ( // Only show these if authenticated
              <>
                <li className="navbar-item">
                  <NavLink
                    to="/categories"
                    className={({ isActive }) =>
                      isActive ? "navbar-link active" : "navbar-link"
                    }
                    onClick={handleLinkClick}
                  >
                    Movie Categories
                  </NavLink>
                </li>
                <li className="navbar-item">
                  <NavLink
                    to="/mylist"
                    className={({ isActive }) =>
                      isActive ? "navbar-link active" : "navbar-link"
                    }
                    onClick={handleLinkClick}
                  >
                    My List
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="right-menu">
           <div className="search-desktop"> {/* Show search bar here for desktop */}
             <SearchBar handleLinkClick={handleLinkClick} />
           </div>
          <ul className="navbar-menu auth-links"> {/* Separate ul for auth links for better layout control */}
            {renderAuthLinks()}
          </ul>
          <div className="icon" onClick={() => setOpenIcon(!openIcon)}>
            {openIcon ? <CloseIcon /> : <MenuIcon />}
          </div>
        </div>

      </nav>
      {/* mobile */}
      <div className={`mobile ${openIcon ? "active" : ""}`}>
        <div className="mobile-search">
          <SearchBar handleLinkClick={handleLinkClick} />
        </div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "navbar-link active" : "navbar-link"
              }
              onClick={handleLinkClick}
            >
              Home
            </NavLink>
          </li>
          {isAuthenticated && (
            <>
              <li className="navbar-item">
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    isActive ? "navbar-link active" : "navbar-link"
                  }
                  onClick={handleLinkClick}
                >
                  Movie Categories
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink
                  to="/mylist"
                  className={({ isActive }) =>
                    isActive ? "navbar-link active" : "navbar-link"
                  }
                  onClick={handleLinkClick}
                >
                  My List
                </NavLink>
              </li>
            </>
          )}
          {/* Render auth links in mobile menu */}
          {renderAuthLinks()}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
