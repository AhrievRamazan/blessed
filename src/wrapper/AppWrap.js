import React from "react";

export const AppWrap = (Component, idName, className) =>
  function HOC() {
    return (
      <main id={idName} className={`app__container ${className}`}>
        <div className="app__wrapper app__flex">
          <Component />
        </div>
   
      </main>
    );
  };

export default AppWrap;
