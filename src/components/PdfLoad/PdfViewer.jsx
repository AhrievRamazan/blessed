// PdfViewer.jsx
import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import { useParams } from "react-router-dom";
import { GlobalWorkerOptions } from "pdfjs-dist/webpack";
import "./Pdf.scss";

GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfViewer = () => {
  const { title } = useParams();
  const pdfUrl = new URLSearchParams(window.location.search).get("pdfUrl");
  const pdfRenderedRef = useRef(false);
  const [images, setImages] = useState([]); // Хранит URL изображений страниц

  useEffect(() => {
    document.title = decodeURIComponent(title);

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

      console.log(`PDF loaded. Total pages: ${numPages}`);

      const pageImages = []; // Массив для хранения изображений страниц

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;

        // Получаем изображение из canvas
        const imgDataUrl = canvas.toDataURL();
        pageImages.push(imgDataUrl); // Добавляем URL изображения в массив
      }

      setImages(pageImages); // Сохраняем изображения в состоянии
    };

    if (!pdfRenderedRef.current) {
      pdfRenderedRef.current = true;
      renderPdf(pdfUrl);
    }

    return () => {
      const container = document.getElementById("pdf-container");
      if (container) container.innerHTML = "";
    };
  }, [pdfUrl, title]);

  return (
    <div id="pdf-container" className="pdf-container">
      {images.map((imgSrc, index) => (
        <img key={index} src={imgSrc} alt={`Page ${index + 1}`} />
      ))}
    </div>
  );
};

export default PdfViewer;
