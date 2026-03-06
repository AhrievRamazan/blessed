import React, { useEffect } from "react";
import { About } from "../container";

const AboutPage = () => {
  useEffect(() => {
    document.title = "Обо мне | Бадиев Ислам";
  }, []);

  return <About />;
};

export default AboutPage;