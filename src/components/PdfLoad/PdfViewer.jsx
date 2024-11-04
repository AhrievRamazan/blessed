// PdfViewer.jsx
import React, { useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import { useLocation, useParams } from "react-router-dom";
import { GlobalWorkerOptions } from "pdfjs-dist/webpack";
import './Pdf.scss';

GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfViewer = () => {
  const { title } = useParams();
  const { state } = useLocation();
  const pdfUrl = state?.pdfUrl;

  useEffect(() => {
    const renderFirstPage = async (url) => {
      if (!url) {
        console.error("PDF URL is missing!");
        return;
      }

      try {
        // Загружаем документ PDF
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;

        // Получаем первую страницу PDF
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });
        
        // Создаем canvas для рендеринга
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        // Добавляем canvas в контейнер
        const container = document.getElementById("pdf-container");
        container.innerHTML = ""; // очищаем контейнер
        container.appendChild(canvas);

        // Рендерим страницу на canvas
        await page.render({ canvasContext: context, viewport }).promise;
        canvas.style.width = "100%";
        canvas.style.height = "auto";
        
      } catch (error) {
        console.error("Error rendering PDF:", error);
      }
    };

    renderFirstPage(pdfUrl);
  }, [pdfUrl]);

  return (
    <div id="pdf-container" className="pdf-container">
      {/* Если PDF не отображается, можно добавить текстовый индикатор */}
      {pdfUrl ? null : <p>PDF не найден. Пожалуйста, проверьте URL.</p>}
    </div>
  );
};

export default PdfViewer;
