import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./About.scss";
import { urlFor, client } from "../../client";
import { images } from "../../constants";
import { Copyright } from "../../components";

const About = () => {
  const [abouts, setAbouts] = useState([]); // Храним данные об элементах
  const [activeIndex, setActiveIndex] = useState(null); // Храним индекс активного элемента
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  // Функция для обработки клика, принимает индекс элемента
  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Переключение активного индекса
  };

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth); // Обновляем ширину экрана
  };


  const formatTitle = (title) => {
    if (!title || typeof title !== "string") return "";
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

    window.addEventListener("resize", updateScreenWidth);

    // Убираем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };

  }, []);

  return (
    <>

      <div className="about__me">
        <article className="about__item">
          <h1>
            Услуги Дизайна
          </h1>
          <p>Я беру задачу на себя, от анализа до реализации.<br/>Вы получаете готовый результат без лишних хлопот.</p>
        </article>
        <Copyright/>
      </div>
      <div className="app__price">


        <div className="app__profiles">
          {abouts
            .sort((a, b) => a.id - b.id) // Сортируем элементы
            .map((about, index) => (
              <motion.div
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, type: "tween" }}

                // whileHover={{
                //   scale: screenWidth > 768 
                //     ? activeIndex === index ? 1 : activeIndex !== null ? 1.1 : 1.1 
                //   : 1,
                // }}
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

                    <article>
                      <div className="content">

                        <button onClick={() => handleClick(index)}>
                          <img src={images.arrowDown} />
                        </button>
                      </div>
                    </article>
                  </div>
                </div>

                <AnimateHeightContent
                  isActive={activeIndex === index}
                  about={about}
                  handleClick={() => handleClick(index)}
                  screenWidth={screenWidth}
                />
              </motion.div>
            ))}

        </div>
        <Copyright />
      </div>
    </>
  );
};

// Компонент с анимацией высоты
const AnimateHeightContent = ({ isActive, about, handleClick, screenWidth }) => {
  const contentRef = useRef(null);

  return (
    <motion.div
      className="description"
      initial={false} // Анимация только на изменение
      animate={{
        height: isActive ? contentRef.current?.scrollHeight : 0,
        opacity: isActive ? 1 : 0,
      }}
      transition={{ duration: screenWidth > 768 ? 0.8 : 0, ease: "easeInOut" }} // Длительность анимации
      style={{ overflow: "hidden", }} // Скрываем контент, когда он закрыт
    >
      <div ref={contentRef}>
        <div className="description__title">
          <h2 style={{ marginTop: 10 }}>{about.title}</h2>
          <ul>
            {about.tags.map((desc, index) => (
              <li key={`${desc.id} - ${index}`}>
                <p>{desc}</p>
              </li>
            ))}
          </ul>
          <article>
            <div className="content">

              <button onClick={handleClick}>
                <img src={images.arrowDown} />
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
  "Услуги"
);
