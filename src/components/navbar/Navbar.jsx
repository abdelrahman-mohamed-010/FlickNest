import { NavLink } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import "./Navbar.scss";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useRef } from "react";

function Navbar() {
  const [openIcon, setOpenIcon] = useState(false);
  const menuRef = useRef(null);

  const handleLinkClick = () => {
    setOpenIcon(false);
  };

  return (
    <>
      <nav className="navbar" ref={menuRef}>
        <div className={openIcon ? "left icon-open" : "left"}>
          <div className="navbar-brand">
            <span className="navbar-title">ScreenSage</span>
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
          </ul>
        </div>
        <div className="icon" onClick={() => setOpenIcon(!openIcon)}>
          {openIcon ? <CloseIcon /> : <MenuIcon />}
        </div>
        <div className="search">
          <SearchBar handleLinkClick={handleLinkClick} />
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
        </ul>
      </div>
    </>
  );
}

export default Navbar;
