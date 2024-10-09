import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./About.scss";
import { urlFor, client } from "../../client";

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "abouts"]';

    client.fetch(query).then((data) => setAbouts(data));
  }, []);

  return (
    <>
      <h2 className="head-text">
        Я знаю что <span> Хороший дизайн </span>
        <br></br> это<span> Привлечение клиентов</span>
      </h2>
      <div className="about__me">
        <div className="about__item">
          <div>

          </div>
        </div>
      </div>
      <div className="app__profiles">
        {abouts
          .sort((a, b) => a.id - b.id)
          .map((about, index) => (
            <motion.div
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, type: "tween" }}
              className="app__profile-item"
              key={about.title + index}
            >
              <div className="img-box">
                <img src= {urlFor(about.imgUrl)}/>
              </div>
              <article>
                <h2 className="bold-text" style={{ marginTop: 20 }}>
                  {about.title}
                </h2>
                <div className= "content">
                  <p className="p-text" style={{ marginTop: 10 }}>
                    {about.description}
                  </p>
                </div>
              </article>
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
