import React from "react";
import { BsTelegram, Bs } from "react-icons/bs";
import { AiFillInstagram, AiFillBehanceCircle } from "react-icons/ai";
import { IoIosMail } from "react-icons/io";
const SocialMedia = () => {
  return (
    <div className="app__social">
      <div>
        <a href="https://www.instagram.com/badievv.ai?igsh=djdreG5vbThkMGs3&utm_source=qr" target="_blank">
          <AiFillInstagram />
        </a>
      </div>
      <div>
        <a href="https://t.me/isallam" target="_blank">
          <BsTelegram />
        </a>
      </div>
      <div>
        <a href="https://www.behance.net/blessed06" target="_blank">
          <AiFillBehanceCircle />
        </a>
      </div>
      <div>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=islam.badievv@mail.ru" target="_blank">
          <IoIosMail />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
