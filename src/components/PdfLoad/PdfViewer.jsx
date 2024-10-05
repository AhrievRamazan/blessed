import React, { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import { useParams, useNavigate } from 'react-router-dom';

import { GlobalWorkerOptions } from 'pdfjs-dist/webpack';

GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfViewer = () => {
  const { title } = useParams(); // Получаем название из параметров маршрута
  const navigate = useNavigate(); // Для редиректа на другие страницы
  const pdfRenderedRef = useRef(false); // Флаг, который проверяет, был ли PDF уже отрендерен

  // Извлечение URL PDF из локального хранилища

  const pdfUrl = localStorage.getItem(title);

  useEffect(() => {
    // Устанавливаем заголовок страницы
    if (title) {
      document.title = decodeURIComponent(title);
    }

    const renderPdf = async (url) => {
      if (!url) {
        console.error("PDF URL is missing!");
        return;
      }

      const loadingTask = pdfjsLib.getDocument(url);
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;

      const container = document.getElementById("pdf-container");
      container.innerHTML = "";

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.height = viewport.height;
        canvas.width = viewport.width;
        container.appendChild(canvas);

        await page.render({ canvasContext: context, viewport: viewport }).promise;

        canvas.style.width = "100%";
        canvas.style.height = "auto";
      }
    };

    // Проверяем, был ли уже рендеринг
    if (!pdfRenderedRef.current) {
      pdfRenderedRef.current = true; // Устанавливаем флаг, что рендер уже произошел
      renderPdf(pdfUrl);
    }

    // Возвращаем функцию для очистки при размонтировании компонента или обновлении URL
    return () => {
      const container = document.getElementById("pdf-container");
      if (container) {
        container.innerHTML = ""; // Очищаем контейнер при размонтировании
      }
    };
  }, [pdfUrl, title]);

  return (
    <div className="pdf-viewer">
      <div id="pdf-container" className="pdf-container"></div>
    </div>
  );
};


export default PdfViewer;
