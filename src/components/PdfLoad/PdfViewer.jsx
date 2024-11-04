// PdfViewer.jsx
import React, { useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import { useParams } from "react-router-dom";
import { GlobalWorkerOptions } from "pdfjs-dist/webpack";
import './Pdf.scss';

GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfViewer = () => {
  const { pdfUrl } = useParams(); // Получаем pdfUrl из параметров URL
  const decodedPdfUrl = decodeURIComponent(pdfUrl);

  useEffect(() => {
    const renderFirstPage = async (url) => {
      if (!url) {
        console.error("PDF URL is missing!");
        return;
      }

      try {
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const container = document.getElementById("pdf-container");
        container.innerHTML = ""; // Очищаем контейнер
        container.appendChild(canvas);

        await page.render({ canvasContext: context, viewport }).promise;
        canvas.style.width = "100%";
        canvas.style.height = "auto";

      } catch (error) {
        console.error("Error rendering PDF:", error);
      }
    };

    renderFirstPage(decodedPdfUrl);
  }, [decodedPdfUrl]);

  return (
    <div id="pdf-container" className="pdf-container">
      {decodedPdfUrl ? null : <p>PDF не найден. Пожалуйста, проверьте URL.</p>}
    </div>
  );
};

export default PdfViewer;
