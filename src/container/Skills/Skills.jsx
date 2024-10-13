import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Skills.scss";
import { images } from "../../constants";

const Skills = () => {
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [learning, setLearning] = useState([]);

  useEffect(() => {
    const learningSkill = '*[_type == "learning"]';
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query).then((data) => {
      setExperience(data);
    });
    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
    client.fetch(learningSkill).then((data) => {
      setLearning(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">
        Обо <span>Мне</span>
      </h2>
      <div className="qualities__container">
        <div className="qualities">
          <div className="logo__box">
            <img src={images.expLogo} />
          </div>

          <article className="about__me-qualities">
            <h2>Ислам бадиев</h2>
            <p>графический дизайнер</p>
          </article>

          <div className="personal__qualities">
            <h2>Личные качества</h2>

            <article className="expirience">
              <h4>креативность</h4>
              <div className="expirience__line">
                <div></div>
              </div>
            </article>

            <article className="expirience">
              <h4>коммуникабельность</h4>
              <div className="expirience__line">
                <div></div>
              </div>
            </article>

            <article className="expirience">
              <h4>ответственность</h4>
              <motion.div 
              whileInView={{ x: [-300, 150, 0], opacity: [0, 0, 1] }}
              transition={{duration:0.5}}

              className="expirience__line"
              >
                <div></div>
              </motion.div>
            </article>

            <article className="expirience">
              <h4>умение работать в команде</h4>
              <div className="expirience__line">
                <div></div>
              </div>
            </article>
          </div>
        </div>

        <div className="about__me">
          <div className="bio">
            <article>
              <h2>обо мне</h2>
              <p className="p-text">
                Мне 20 лет, я дизайнер. <br /> Мои увлечения способствуют
                развитию креативного мышления. <br /> Я ценю оригинальность и
                стремлюсь к эстетике, что будет отражено в наших проектах.
                <br /> Рассматриваю сотрудничество с теми, кто разделяет эти
                ценности.
              </p>
            </article>
          </div>
          <div className="learning">
            <h2>Образование</h2>
            <div className="timeline__parent">
              {learning
                .sort((a, b) => a.id - b.id)
                .map((item, index) => (
                  <div className="timeline" key={`${item.id} - ${index}`}>
                    <div className="timeline-middle">
                      <div className="timeline-circle"></div>
                    </div>
                    <div style={{ marginLeft: 10 }}>
                      <article className="app__flex-row">
                        <h3 className="learning__year">{item.year}</h3>
                        <div className="timeline-component timeline-content">
                          <article>
                            <h3>{item.company}</h3>
                            <p className="p-text">{item.desc}</p>
                          </article>
                        </div>
                      </article>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="expirience__parent">
            <div className="app__flex-row">
              <div>
                <h2>опыт</h2>

                {experience
                  .sort((a, b) => a.id - b.id)
                  .map((item, index) => (
                    <div className="timeline" key={`${item.id} - ${index}`}>
                      <div className="timeline-middle">
                        <div className="timeline-circle"></div>
                      </div>
                      <div style={{ marginLeft: 10 }}>
                        <article className="app__flex-row">
                          <h3 className="learning__year">{item.year}</h3>
                          <div className="timeline-component timeline-content">
                            <article>
                              <h3>{item.company}</h3>
                              <p className="p-text">{item.desc}</p>
                            </article>
                          </div>
                        </article>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="skills">
                <h2>Навыки</h2>
                <div className="skills-parent">
                  {skills.map((item, index) => (
                    <div className="skills-logo" key={`${item.id} - ${index}`}>
                      <motion.div
                        className="circle-border"
                 
                      >
                        <div className="circle-inner">
                          <img src={urlFor(item.icon)} alt={item.name} />
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "Обо мне",
  "app__whitebg"
);
