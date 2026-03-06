import React from "react";

const Copyright = () => {
  const year = new Date().getFullYear();

  return (
    <div className="copyright">
      <p className="p-text">@{year} Badiev</p>
      <p className="p-text">Все права защищены</p>
    </div>
  );
};

export default Copyright;