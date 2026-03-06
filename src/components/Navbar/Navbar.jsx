import React, { useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";

import { images } from "../../constants";
import "./Navbar.scss";

const navItems = [
  { name: "Услуги", path: "/about" },
  { name: "Портфолио", path: "/" },
  { name: "Контакты", path: "/contact" },
];
{
  navItems.map((item) => (
    <li key={item.name}>
      <NavLink
        to={item.path}
        end={item.path === "/"}
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        {item.name}
      </NavLink>
    </li>
  ))
}
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
    setToggle(false);
  };

  const closeMobileMenu = () => {
    setToggle(false);
  };

  return (
    <header>
      <nav className="app__navbar">
        <div className="app__navbar-logo">
          <img
            src={images.badievLogo}
            alt="Badiev logo"
            onClick={handleLogoClick}
          />
        </div>

        <ul className="app__navbar-links">
          {navItems.map((item) => (
            <li className="app__flex p-text" key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="app__navbar-menu">
          <HiMenuAlt4 onClick={() => setToggle(true)} />

          {toggle && (
            <div className="app__navbar-menu_container">
              <HiX onClick={() => setToggle(false)} />
              <ul>
                {navItems.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="social__links">
          <ul>
            <li>
              <a href="https://t.me/your_username" target="_blank" rel="noreferrer">
                <img src={images.telegram} className="social__icon" alt="Telegram" />
              </a>
            </li>
            <li>
              <a href="https://instagram.com/your_username" target="_blank" rel="noreferrer">
                <img src={images.instagram} className="social__icon" alt="Instagram" />
              </a>
            </li>
            <li>
              <a href="https://youtube.com/@your_channel" target="_blank" rel="noreferrer">
                <img src={images.youtube} className="social__icon" alt="YouTube" />
              </a>
            </li>
            <li>
              <img src={images.badievMiniLogo} className="mini__logo" alt="Mini logo" />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;