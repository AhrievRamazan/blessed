import React, { useState, useEffect } from "react";
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
    // Если текущий индекс активный, сбрасываем его, иначе устанавливаем
    setActiveIndex(activeIndex === index ? null : index);
  };

  const formatTitle = (title) => {
    const words = title.split(" "); // Разделяем текст на слова
    if (words.length >= 2) {
      return words.map((word, index) => (
        <span key={index}>
          {word}
          {index < words.length - 1 && <br />}{" "}
          {/* Добавляем <br /> между словами */}
        </span>
      ));
    }
    return title; // Если слов меньше 2, возвращаем исходный текст
  };

  useEffect(() => {
    const query = '*[_type == "abouts"]'; // Запрос на получение данных

    client.fetch(query).then((data) => setAbouts(data)); // Устанавливаем данные в состояние
  }, []);

  return (
    <>
      <h2 className="head-text">
        Я знаю что <span> Хороший дизайн </span>
        <br /> это<span> Привлечение клиентов</span>
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
              whileHover={{   scale: activeIndex === index ? 1 : (activeIndex !== null ? 1.1 : 1.1) }}
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

              {activeIndex === index && (
                <motion.div 
                className="description"
                initial={{ opacity: 0, y: -300 }} // Начальная прозрачность и смещение вверх
                animate={{ opacity: 1, y: 0 }} // Конечное состояние: прозрачность 1 и исходное положение
                transition={{ duration: 1, ease: "easeInOut" }} // Параметры перехода
                >
                  <div className="description__title">
                    <h2> {about.title}</h2>
                    <ul>
                      {about.tags.map((desc, index) => (
                        <li key={`${desc.id} - ${index}`} ><p>{desc}</p></li>
                      ))}
                 
                    </ul>
                    <article>
                    <div className="content">
                      <p className="p-text" style={{ marginTop: 10 }}>
                        {about.description}
                      </p>
                      <button onClick={() => handleClick(index)}>
                        <FaArrowUp />
                      </button>
                    </div>
                  </article>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "Обо мне",
  "app__whitebg"
);
