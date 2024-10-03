import React from "react";
import { NavigationDots, SocialMedia } from "../components";

export const AppWrap = (Component, idName, className) =>
  function HOC() {
    const year = new Date().getFullYear()
    return (
      <section id={idName} className={`app__container ${className}`}>
        <SocialMedia />
        <div className="app__wrapper app__flex">
          <Component />

          <div className="copyright">
            <p className="p-text">@{year} Badiev</p>
            <p className="p-text">Все права зашищены</p>
          </div>
        </div>

        <NavigationDots active ={idName} />
      </section>
    );
  };

export default AppWrap;
