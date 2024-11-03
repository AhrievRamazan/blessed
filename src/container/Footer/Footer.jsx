import React from "react";
import { AppWrap, MotionWrap } from "../../wrapper";
import { images } from "../../constants";
import "./Footer.scss";

const Footer = () => {

  return (
    <>
      <h2 className="head-text">
        Возьми <span>чашку кофе</span> & напиши мне
      </h2>

      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=islam.badievv@mail.ru"
            className="p-text"
            target="_blank"
            rel="noreferrer"
          >
            islam.badievv@mail.ru
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.telegram} alt="email" />
          <a
            href="https://t.me/isallam"
            className="p-text"
            target="_blank"
            rel="noreferrer"
          >
            @isallam
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.instagram} alt="instagram" />
          <a
            href="https://www.instagram.com/islam_badievv/"
            className="p-text"
            target="_blank"
            rel="noreferrer"
          >
            islam.badiev1
          </a>
        </div>
      </div>

      {/* <div className="app__footer-form app__flex">
        <div class="contact-container">
          <form></form>
        </div>
      </div> */}
      <div className="app__footer-form app__flex">
        <div className="app__flex">
          <input
            className="p-text"
            type="text "
            name="name"
            placeholder="Ваше имя"
          ></input>
        </div>
        <div className="app__flex">
          <input
            className="p-text"
            type="email "
            name="email"
            placeholder="Ваша почта"
          ></input>
        </div>
        <div>
          <select className="p-text">
            {['Выберите один','Логотип','Фирменный стиль','Товарные карточки','Визитки','Постеры','Баннеры'].map((item, index) => (
              <option key={`${item} + ${index}`}>{item}</option>
            ))}
          </select>
        </div>
        <div>
          <textarea
            className="p-text"
            placeholder="Ваше сообщение"
            name="message"
          />
        </div>
            <div className="">

            </div>
        
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "Контакты",
  "app__whitebg"
);
