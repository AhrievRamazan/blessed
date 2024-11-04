// Work.jsx
import React, { useState, useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import { useNavigate } from "react-router-dom";
import "./Work.scss";

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("Все");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const query = '*[_type == "works"]{..., pdfFile{asset->{_id, url}}}';
    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);
    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);
      setFilterWork(item === "Все" ? works : works.filter((work) => work.tags.includes(item)));
    }, 500);
  };

  const handleOpenPdfOrImage = (pdfUrl, imgUrl, title) => {
    if (pdfUrl) {
      navigate(`/pdf-viewer/${encodeURIComponent(pdfUrl)}`);
    } else if (imgUrl) {
      window.open(imgUrl, "_blank");
    } else {
      console.error("No PDF or image URL available!");
    }
  };
  

  const visibleWorks = showMore ? filterWork : filterWork.slice(0, 8);

  return (
    <>
      <h2 className="head-text">Моё <span>Портфолио</span></h2>
      <div className="app__work-filter">
        {["Постеры", "Баннеры", "Товарные карточки", "Логотипы", "Визитки", "Все"].map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? "item-active" : ""}`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div animate={animateCard} transition={{ duration: 0.5, delayChildren: 0.4 }} className="app__work-portfolio">
        {visibleWorks.map((work, index) => (
          <div className="app__work-item app__flex" key={index}>
            <a
              className="app__work-img app__flex"
              href="#"
              onClick={() => handleOpenPdfOrImage(work.pdfFile?.asset?.url, urlFor(work.imgUrl), work.title)}
            >
              <img src={urlFor(work.imgUrl)} alt={work.title} />
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut", staggerChildren: 0.5 }}
                className="app__work-hover app__flex"
              >
                <motion.div whileInView={{ scale: [0, 1] }} whileHover={{ scale: [1, 0.9] }} transition={{ duration: 0.25 }} className="app__flex">
                  <AiFillEye />
                </motion.div>
              </motion.div>
            </a>
            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>
              <div className="app__work-tag app__flex">
                <p className="p-text">{work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

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

export default AppWrap(MotionWrap(Work, "app__works"), "Работы", "app__primarybg");
