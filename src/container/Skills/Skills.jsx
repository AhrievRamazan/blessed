import React, { useState, useEffect } from "react";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Skills.scss";
import { images } from "../../constants";

const Skills = () => {
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [learning, setLearning] = useState([]);

  const mySkillsPoint = (point) =>{
    const points = []
 
    for(let i = 0; i < point; i++){
      points.push(<div className="circle__shaded"></div>)
    } 

    if(point < 5){
      const newPoint = 5 - point
      for(let i = 0; i < newPoint; i++){
        points.push(<div className="circle__not-shaded"></div>)
      }
    }
    return points
    
  }

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

      <div className="about__description">
        <div className="about__description-name positon__static" id="name">
          <div className="logo">
            <img src={images.expLogo} alt="exp-logo"></img>
          </div>
          <article>
            <h2 className="underline-pc">Ислам Бадиев</h2>
            <p>графический дизайнер</p>
          </article>
        </div>

        <div className="about__description-bio underline positon__static" id="bio">
          <article className="about__description-title">
            <h2 className="bk__square">дорожка</h2>
            <p>
              Мне 21 год, и я работаю дизайнером, для которого творчество — это
              не просто работа, а стиль жизни. Мои увлечения и интересы напрямую
              способствуют развитию креативного мышления и поиску нестандартных
              решений. Я ценю оригинальность, постоянно стремлюсь к эстетике и
              гармонии.
            </p>
          </article>
        </div>

        <div className="about__description-qualities underline positon__static" id="qualities">
          <article>
            <h2 className="bk__square">личные качества</h2>

            <article className="about__description-qualities-item">
              <h3>креативность</h3>
              <div>
                <div></div>
              </div>
            </article>
            <article className="about__description-qualities-item">
              <h3>коммуникабельность</h3>
              <div>
                <div></div>
              </div>
            </article>
            <article className="about__description-qualities-item">
              <h3>ответственность</h3>
              <div>
                <div></div>
              </div>
            </article>
            <article className="about__description-qualities-item">
              <h3>умение работать в команде</h3>
              <div>
                <div></div>
              </div>
            </article>
          </article>
        </div>

        <div className="about__description-education underline positon__static" id="education">
          <div className="about__description-title">
            <h2 className="bk__square">образование</h2>

            <div className="education__container">
              {learning
                .sort((a, b) => a.id - b.id)
                .map((item, index) => (
                  <div className="education__item" key={`${item} - ${index}`}>
                    <div className="education__item-timeline">
                      <div></div>
                      <h2>{item.year}</h2>
                    </div>

                    <div className="education__item-content">
                      <article>
                        <h2>{item.company}</h2>
                        <p>{item.desc}</p>
                      </article>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="about__description-expirience underline positon__static" id="expirience">
          <div className="about__description-title">
            <h2 className="bk__square">Опыт</h2>

            <div className="expirience__container">
              {experience
                .sort((a, b) => a.id - b.id)
                .map((item, index) => (
                  <div className="expirience__item" key={`${item} - ${index}`}>
                    <div className="expirience__item-timeline">
                      <div></div>
                      <h2>{item.year}</h2>
                    </div>

                    <div className="expirience__item-content">
                      <article>
                        <h2>{item.company}</h2>
                        <p>{item.desc}</p>
                      </article>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="about__description-skills positon__static" id="skills">
          <div className="skills__container">
            <h2 className="bk__square">Навыки</h2>
            {skills
              .sort((a, b) => a.id - b.id)
              .map((item, index) => (
                <div className="skills__item" key={`${item} - ${index}`}>

                  <div className="img__skills-box">
                    <img src= {urlFor(item.icon)} alt="item-icon"></img>
                  </div>
                  <article>
                    <h2>{item.name}</h2>
                    <p>({item.year})</p>
                  </article>

                  <div className="skills__circle app__flex-row">
                  {mySkillsPoint(item.point)}
                  </div>
                </div>
              ))}
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
