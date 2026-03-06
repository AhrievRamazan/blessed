import React from "react";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Contact.scss";
import { images } from "../../constants";

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
