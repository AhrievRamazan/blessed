import React, { useState } from "react";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import { images } from "../../constants";
import "./Footer.scss";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: "contact",
      name: name,
      email: email,
      message: message,
    };

    client.create(contact).then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    });
  };

  return (
    <>
      <h2 className="head-text">Возьми <span>чашку кофе</span> & напиши мне</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:islam.badievv@mail.ru" className="p-text">
            hello@Islam.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.instagram} alt="instagram"/>
          <a href="https://www.instagram.com/islam_badievv/" className="p-text" target="_blank">
          islam.badiev1
          </a>
        </div>
      </div>

      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              className="p-text"
              type="text "
              name="name"
              placeholder="Имя"
              value={name}
              onChange={handleChangeInput}
            ></input>
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="email "
              name="email"
              placeholder="почта"
              value={email}
              onChange={handleChangeInput}
            ></input>
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Ваше сообщение"
              value={message}
              name='message'
              onChange={handleChangeInput}
            />
          </div>
          <button type="button" className="p-text" onClick={handleSubmit}>
            {loading ? "отправляется" : "Отправить сообщение"}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">Спасибо что связались со мной</h3>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
