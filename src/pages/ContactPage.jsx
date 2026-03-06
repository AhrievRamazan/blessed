import React, { useEffect } from "react";
import { Contact } from "../container";

const AboutPage = () => {
  useEffect(() => {
    document.title = "Обо мне | Бадиев Ислам";
  }, []);

  return <Contact />;
};

export default Contact;