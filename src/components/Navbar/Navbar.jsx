import React, { useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Для перенаправления на главную

import { images } from "../../constants";
import "./Navbar.scss";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate(); // Хук для навигации

  // Функция для перехода на главную и скролла к нужному разделу
  const handleNavigation = (section) => {
    navigate("/"); // Перенаправляем на главную
    setTimeout(() => {
      // Делаем плавную прокрутку к нужному разделу после перенаправления
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Задержка, чтобы дождаться перезагрузки главной страницы
  };

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.logo2} alt="logo" onClick={() => handleNavigation("home")} />
      </div>

      <ul className="app__navbar-links">
        {["home", "about", "work", "skills", "contact"].map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <a onClick={() => handleNavigation(item)}>{item}</a> {/* Перенаправляем и прокручиваем */}
          </li>
        ))}
      </ul>

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {["home", "about", "work", "skills", "contact"].map((item) => (
                <li key={item}>
                  <a onClick={() => handleNavigation(item)}>{item}</a> {/* Перенаправляем и прокручиваем */}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
