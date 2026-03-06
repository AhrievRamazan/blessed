import React, { useEffect } from "react";
import { Work } from "../container";

const PortfolioPage = () => {
  useEffect(() => {
    document.title =
      "Графический дизайнер Бадиев Ислам | Логотипы, Постеры, Визитки";
  }, []);

  return <Work />;
};

export default PortfolioPage;