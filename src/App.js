import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { About, Footer, Header, Skills, Work, Testimonial } from './container';
import { Navbar, PdfViewer } from "./components";
import './App.scss';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Главная страница */}
          <Route path="/pdf-viewer/:pdfUrl" element={<PdfViewer />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

// Создадим компонент Home для рендеринга главной страницы
const Home = () => {
  useEffect(() => {
    document.title = "Графический дизайнер Бадиев Ислам | Логотипы, Постеры, Визитки и Дизайн Одежды"; // Устанавливаем заголовок на "blessed" при каждом рендере главной страницы
  }, []);

  return (
    <>
      <Header />
      <About />
      <Work />
      <Skills/>
      <Testimonial/>
    </>
  );
};

export default App;
