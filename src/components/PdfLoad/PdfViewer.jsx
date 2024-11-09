// PdfViewer.jsx
import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import { useParams, useLocation } from "react-router-dom";
import { GlobalWorkerOptions } from "pdfjs-dist/webpack";
import "./Pdf.scss";

GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfViewer = () => {
  const { title } = useParams();
  const location = useLocation();
  const pdfUrl = location.state?.pdfUrl;
  const pdfRenderedRef = useRef(false);
  const [images, setImages] = useState([]);

  const renderPdf = async (url) => {
    if (!url) {
      console.error("PDF URL is missing!");
      return;
    }

    try {
      const loadingTask = pdfjsLib.getDocument(url);
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      const pageImages = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.0 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;

        const imgDataUrl = canvas.toDataURL();
        pageImages.push(imgDataUrl);
      }

      setImages(pageImages);
    } catch (error) {
      console.error("Ошибка при рендеринге PDF:", error);
    }
  };

  useEffect(() => {
    document.title = decodeURIComponent(title);

    if (!pdfRenderedRef.current && pdfUrl) {
      pdfRenderedRef.current = true;
      renderPdf(pdfUrl);
    }

    // Очистка изображений при выходе из компонента
    return () => {
      setImages([]);
    };
  }, [pdfUrl, title]);

  useEffect(() => {
    if (images.length > 0) {
      // Прокручиваем страницу наверх, когда все страницы загружены
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [images]);

  return (
    <div className="pdf-container">
      {images.length > 0 ? (
        images.map((imgSrc, index) => (
          <img key={index} src={imgSrc} alt={`Page ${index + 1}`} />
        ))
      ) : (
        <p>Загрузка презентации, если она грузит слишком долго значит что-то сломалось.</p>
      )}
    </div>
  );
};

export default PdfViewer;
