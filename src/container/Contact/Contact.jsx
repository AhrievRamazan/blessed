import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Contact.scss";
import { urlFor, client } from "../../client";
import { images } from "../../constants";
import { Copyright } from "../../components";

const Contact = () => {

    return (
        <>
            <div className="contact">
                <div className="contact__content">
                    <h1><span> Спасибо,</span> Что <br />посмотрели</h1>
                    <div className="social__content">
                        <img src={images.contactInfo} />
                    </div>
                </div>
                <div className="contact__logo">
                    <img src={images.contactLogo}/>
                </div>
            </div>
        </>
    )
}

export default AppWrap(
    MotionWrap(Contact, "app__about"),
    "Услуги"
);
