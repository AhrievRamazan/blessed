import React, { useState, useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Work.scss";

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("Все");
  const [AnimateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [filterWork, setfilterWork] = useState([]);
  const [showMore, setShowMore] = useState(false); // Состояние для контроля отображения

  useEffect(() => {
    const query = '*[_type == "works"]{..., pdfFile{asset->{_id, url}}}';
    client.fetch(query).then((data) => {
      setWorks(data);
      setfilterWork(data);
    });
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === "Все") {
        setfilterWork(works);
      } else {
        setfilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  // Функция для открытия PDF или изображения в новой вкладке
  const handleOpenPdfOrImage = (pdfUrl, imgUrl, title) => {
    if (pdfUrl) {
      // Если есть PDF, открываем его
      const newTab = window.open(`/${encodeURIComponent(title)}`, "_blank");
      if (!newTab) {
        console.error("Failed to open new tab (popup might be blocked).");
      }
      // Сохраняем URL PDF для последующего использования
      localStorage.setItem(title, pdfUrl);
    } else if (imgUrl) {
      // Если нет PDF, открываем изображение
      const newTab = window.open(imgUrl, "_blank");
      if (!newTab) {
        console.error("Failed to open new tab (popup might be blocked).");
      }
    } else {
      console.error("No PDF or image URL available!");
    }
  };

  // Определение количества отображаемых элементов (если showMore — показываем все, иначе только 2)
  const visibleWorks = showMore ? filterWork : filterWork.slice(0, 8);

  return (
    <>
      <h2 className="head-text">
        Моё <span>Портфолио</span>
      </h2>
      <div className="app__work-filter">
        {["Постеры и баннеры", "Товарные карточки", "Логотипы", "Визитные карточки", "Все"].map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? "item-active" : ""}`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={AnimateCard}
        transition={{ duration: 0.5, delayChildren: 0.4 }}
        className="app__work-portfolio"
      >
        {visibleWorks.map((work, index) => (
          <div className="app__work-item app__flex" key={index}>
            <div className="app__work-img app__flex">
              <img src={urlFor(work.imgUrl)} alt={work.title} />
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                initial={{ opacity: 0 }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex"
              >
                <a
                  href="#"
                  onClick={() =>
                    handleOpenPdfOrImage(
                      work.pdfFile?.asset?.url,
                      urlFor(work.imgUrl), // Открываем изображение, если PDF нет
                      work.title
                    )
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>
                {work.description}
              </p>
              <div className="app__work-tag app__flex">
                <p className="p-text">{work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Кнопка "Показать ещё" появляется только если фильтрованный список длиннее 2 */}
      {filterWork.length > 8 && (
        <div className="app__work-more">
          <button className="work-button" onClick={() => setShowMore(!showMore)}>
            {showMore ? "Скрыть" : "Показать ещё"}
          </button>
        </div>
      )}
    </>
  );
};

export default AppWrap(MotionWrap(Work, "app__works"), "work", "app__primarybg");
