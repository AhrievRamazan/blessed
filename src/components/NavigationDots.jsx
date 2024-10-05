import React from "react";

const NavigationDots = ({ active }) => {
  return (
    <div className="app__navigation">
      {["Главная", "Обо мне", "Работы", "Навыки", "testimonials", "Контакты"].map(
        (item, index) => (
          <a
           href={`#${item}`}
           key={item + index}
           className="app__navigation-dot"
           style={active === item ? {backgroundColor: '#92b774'} : {}}
           >
           </a> 
        )
      )}
    </div>
  );
};

export default NavigationDots;
