import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import "./Navbar.scss";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useState, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {
  const [openIcon, setOpenIcon] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLinkClick = () => {
    setOpenIcon(false);
  };

  const handleLogout = async () => {
    await signOut();
    handleLinkClick();
    navigate("/");
  };

  const renderAuthLinks = () => {
    if (user) {
      return (
        <>
          <li className="navbar-item">
            <NavLink to="/profile" className="navbar-link" onClick={handleLinkClick}>
              <AccountCircleIcon style={{ verticalAlign: 'middle', marginRight: '5px' }} />
              Profile
            </NavLink>
          </li>
          <li className="navbar-item">
            <button onClick={handleLogout} className="navbar-button logout-button">
              <ExitToAppIcon style={{ verticalAlign: 'middle', marginRight: '5px' }} />
              Sign Out
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
              Sign In
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink
              to="/signup"
              className="navbar-button signup-button"
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
              <span className="navbar-title">FLICKNEST</span>
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
            {user && (
              <>
                <li className="navbar-item">
                  <NavLink
                    to="/categories"
                    className={({ isActive }) =>
                      isActive ? "navbar-link active" : "navbar-link"
                    }
                    onClick={handleLinkClick}
                  >
                    Movies
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
          <div className="search-desktop">
            <SearchBar handleLinkClick={handleLinkClick} />
          </div>
          <ul className="navbar-menu auth-links">
            {renderAuthLinks()}
          </ul>
          <div className="icon" onClick={() => setOpenIcon(!openIcon)}>
            {openIcon ? <CloseIcon /> : <MenuIcon />}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
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
          {user && (
            <>
              <li className="navbar-item">
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    isActive ? "navbar-link active" : "navbar-link"
                  }
                  onClick={handleLinkClick}
                >
                  Movies
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
          {renderAuthLinks()}
        </ul>
      </div>
    </>
  );
}

export default Navbar;