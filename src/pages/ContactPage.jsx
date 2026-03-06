import React, { useEffect } from "react";
import { Contact } from "../container";

const ContactPage = () => {
  useEffect(() => {
    document.title = "Обо мне | Бадиев Ислам";
  }, []);

  return <Contact />;
};

export default ContactPage;