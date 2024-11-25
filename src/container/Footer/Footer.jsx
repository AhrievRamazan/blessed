import React, { useState } from "react";
import { AppWrap, MotionWrap } from "../../wrapper";
import { images } from "../../constants";
import "./Footer.scss";

const Footer = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);

      // Останавливаем анимацию через 6.5 секунд
      setTimeout(() => {
        setIsAnimating(false);
      }, 6500);
    }
  };
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
            {[
              "Выберите один",
              "Логотип",
              "Фирменный стиль",
              "Товарные карточки",
              "Визитки",
              "Постеры",
              "Баннеры",
            ].map((item, index) => (
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
        <div className="submit__button">
          <button
            className={`order ${isAnimating ? "animate" : ""}`}
            onClick={handleClick}
          >
            <span className="default">Отправить</span>
            <span className="success">
              Отправлено
              <svg viewBox="0 0 12 10">
                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
              </svg>
            </span>
            <div className="box"></div>
            <div className="drone">
              <svg className="wing left">
                <use xlinkHref="#droneWing" />
              </svg>
              <svg className="wing right">
                <use xlinkHref="#droneWing" />
              </svg>
              <svg className="body">
                <use xlinkHref="#droneBody" />
              </svg>
              <svg className="grab">
                <use xlinkHref="#droneGrab" />
              </svg>
            </div>
          </button>
          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
            <symbol
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 42 14"
              id="droneBody"
              fill="currentColor"
              stroke="none"
            >
              <path d="M38,0.5 C38,0.223857625 38.2238576,5.07265313e-17 38.5,0 C38.7761424,-5.07265313e-17 39,0.223857625 39,0.5 L39,4 C39.5522847,4 40,4.44771525 40,5 L40,6 L40.5,6 C41.3284271,6 42,6.67157288 42,7.5 C42,8.32842712 41.3284271,9 40.5,9 L30,9 L30,9.86761924 C30,10.5701449 29.6314023,11.2211586 29.0289915,11.5826051 L25.4750236,13.7149859 C25.1641928,13.9014843 24.80852,14 24.4460321,14 L17.5539679,14 C17.19148,14 16.8358072,13.9014843 16.5249764,13.7149859 L12.9710085,11.5826051 C12.3685977,11.2211586 12,10.5701449 12,9.86761924 L12,9 L1.5,9 C0.671572875,9 1.01453063e-16,8.32842712 0,7.5 C-1.01453063e-16,6.67157288 0.671572875,6 1.5,6 L2,6 L2,5 C2,4.44771525 2.44771525,4 3,4 L3,0.5 C3,0.223857625 3.22385763,5.07265313e-17 3.5,0 C3.77614237,-5.07265313e-17 4,0.223857625 4,0.5 L4,4 C4.55228475,4 5,4.44771525 5,5 L5,6 L12.005,6 L12.0064818,5.97128221 C12.0580908,5.33141252 12.414937,4.75103782 12.9710085,4.41739491 L16.5249764,2.28501415 C16.8358072,2.09851567 17.19148,2 17.5539679,2 L24.4460321,2 C24.80852,2 25.1641928,2.09851567 25.4750236,2.28501415 L29.0289915,4.41739491 C29.5934099,4.75604592 29.952577,5.34889137 29.9956355,6.0001358 L37,6 L37,5 C37,4.44771525 37.4477153,4 38,4 L38,0.5 Z"></path>
            </symbol>
            <symbol
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 26 14"
              id="droneGrab"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M5,13 L1,13 C1,7.66666667 3.33333333,3.66666667 8,1 L17.996238,1 C22.6654127,3 25,7 25,13 L21.0005587,13"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>
            </symbol>
            <symbol
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 21 2"
              id="droneWing"
              fill="currentColor"
              stroke="none"
            >
              <path d="M13,2 C12.4477153,2 12,1.55228475 12,1 C12,0.44771525 12.4477153,0 13,0 C13.5522847,0 21,0.44771525 21,1 C21,1.55228475 13.5522847,2 13,2 Z"></path>
              <path d="M8,2 C7.44771525,2 0,1.55228475 0,1 C0,0.44771525 7.44771525,0 8,0 C8.55228475,0 9,0.44771525 9,1 C9,1.55228475 8.55228475,2 8,2 Z"></path>
            </symbol>
          </svg>
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
