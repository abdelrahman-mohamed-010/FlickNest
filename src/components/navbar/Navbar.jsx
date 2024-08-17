import { NavLink } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import "./Navbar.scss";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect, useRef } from "react";

function Navbar() {
  const [openIcon, setOpenIcon] = useState(false);
  const menuRef = useRef(null);

  const handleLinkClick = () => {
    setOpenIcon(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenIcon(false);
    }
  };

  useEffect(() => {
    if (openIcon) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openIcon]);

  return (
    <nav className="navbar" ref={menuRef}>
      <div className={openIcon ? "left icon-open" : "left"}>
        <div className="navbar-brand">
          <span className="navbar-title">FlickNest</span>
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

      <div className="right">{!openIcon ? <SearchBar /> : null}</div>
    </nav>
  );
}

export default Navbar;
