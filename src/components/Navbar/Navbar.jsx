import React, { useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
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
        setToggle(false)
      }
    }, 100); // Задержка, чтобы дождаться перезагрузки главной страницы
  };

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.badievLogo} alt="logo" onClick={() => handleNavigation("Главная")} />
      </div>

      <ul className="app__navbar-links">
        {["Главная", "Услуги", "Портфолио", "Обо мне", "Контакты"].map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <a  onClick={() => handleNavigation(item)}>{item}</a> {/* Перенаправляем и прокручиваем */}
          </li>
        ))}
      </ul>

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <div
            >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {["Главная", "Услуги", "Работы", "Обо мне", "Контакты"].map((item) => (
                <li key={item}>
                  <a onClick={() => handleNavigation(item)}>{item}</a> {/* Перенаправляем и прокручиваем */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
