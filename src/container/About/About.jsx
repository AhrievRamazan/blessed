import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./About.scss";
import { urlFor, client } from "../../client";

const About = () => {
  const [abouts, setAbouts] = useState([]); // Храним данные об элементах
  const [activeIndex, setActiveIndex] = useState(null); // Храним индекс активного элемента

  // Функция для обработки клика, принимает индекс элемента
  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Переключение активного индекса
  };

  const formatTitle = (title) => {
    const words = title.split(" ");
    if (words.length >= 2) {
      return words.map((word, index) => (
        <span key={index}>
          {word}
          {index < words.length - 1 && <br />}
        </span>
      ));
    }
    return title;
  };

  useEffect(() => {
    const query = '*[_type == "abouts"]'; // Запрос на получение данных

    client.fetch(query).then((data) => setAbouts(data)); // Устанавливаем данные в состояние
  }, []);

  return (
    <>
      <h2 className="head-text">
       Мои <span>Услуги</span>
      </h2>
      <div className="about__me">
        <div className="about__item">
          <div></div>
        </div>
      </div>
      <div className="app__profiles">
        {abouts
          .sort((a, b) => a.id - b.id) // Сортируем элементы
          .map((about, index) => (
            <motion.div
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, type: "tween" }}
              whileHover={{
                scale: activeIndex === index ? 1 : activeIndex !== null ? 1.1 : 1.1,
              }}
              className="app__profile-item"
              style={{ backgroundImage: `url(${urlFor(about.imgUrl)})` }}
              key={about.title + index}
            >
              <div className="vissible__hidden">
                <div className="pattern">
                  {about.imgPattern && (
                    <img src={urlFor(about.imgPattern)} alt="Pattern" />
                  )}
                </div>

                {/* Проверяем, является ли текущий элемент активным */}
                <div
                  style={{
                    visibility: activeIndex === index ? "hidden" : "visible",
                  }}
                >
                  <h2 className="bold-text" style={{ marginTop: 20 }}>
                    {formatTitle(about.title)}
                  </h2>

                  <article>
                    <div className="content">
                      <p className="p-text" style={{ marginTop: 10 }}>
                        {about.description}
                      </p>
                      <button onClick={() => handleClick(index)}>
                        <FaArrowDown />
                      </button>
                    </div>
                  </article>
                </div>
              </div>

              <AnimateHeightContent
                isActive={activeIndex === index}
                about={about}
                handleClick={() => handleClick(index)}
              />
            </motion.div>
          ))}
      </div>
    </>
  );
};

// Компонент с анимацией высоты
const AnimateHeightContent = ({ isActive, about, handleClick }) => {
  const contentRef = useRef(null);

  return (
    <motion.div
      className="description"
      initial={false} // Анимация только на изменение
      animate={{
        height: isActive ? contentRef.current?.scrollHeight : 0,
        opacity: isActive ? 1 : 0,
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }} // Длительность анимации
      style={{ overflow: "hidden" }} // Скрываем контент, когда он закрыт
    >
      <div ref={contentRef}>
        <div className="description__title">
          <h2>{about.title}</h2>
          <ul>
            {about.tags.map((desc, index) => (
              <li key={`${desc.id} - ${index}`}>
                <p>{desc}</p>
              </li>
            ))}
          </ul>
          <article>
            <div className="content">
              <p className="p-text" style={{ marginTop: 10 }}>
                {about.description}
              </p>
              <button onClick={handleClick}>
                <FaArrowUp />
              </button>
            </div>
          </article>
        </div>
      </div>
    </motion.div>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "Услуги",
  "app__whitebg"
);
