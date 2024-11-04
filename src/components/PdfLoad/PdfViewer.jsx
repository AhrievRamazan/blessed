import React, { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import { useLocation, useParams } from "react-router-dom";
import { GlobalWorkerOptions } from "pdfjs-dist/webpack";
import './Pdf.scss';

GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfViewer = () => {
  const { title } = useParams();
  const { state } = useLocation();
  const pdfUrl = state?.pdfUrl;
  const pdfRenderedRef = useRef(false);

  useEffect(() => {
    if (!pdfUrl) {
      console.error("URL PDF не найден. Пожалуйста, проверьте данные.");
      return;
    }

    console.log("Navigating to PDF:", pdfUrl); // Проверка URL

    const renderPdf = async (url) => {
      try {
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;

        console.log(`Загружено страниц: ${numPages}`);

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

          console.log(`Рендерим страницу ${i}`);

          await page.render({ canvasContext: context, viewport }).promise;
          canvas.style.height = "auto";
        }
      } catch (error) {
        console.error("Ошибка при загрузке или рендеринге PDF:", error);
        const container = document.getElementById("pdf-container");
        container.innerHTML = "<p>Не удалось загрузить PDF. Пожалуйста, проверьте URL или попробуйте позже.</p>";
      }
    };

    if (!pdfRenderedRef.current) {
      pdfRenderedRef.current = true;
      renderPdf(pdfUrl);
    }

    return () => {
      const container = document.getElementById("pdf-container");
      if (container) container.innerHTML = "";
    };
  }, [pdfUrl]);

  return (
    <div id="pdf-container" className="pdf-container">
      {!pdfUrl && <p>URL не найден. Пожалуйста, проверьте данные.</p>}
    </div>
  );
};

export default PdfViewer;
