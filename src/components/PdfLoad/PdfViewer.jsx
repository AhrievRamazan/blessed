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
  const [images, setImages] = useState([]); // Для хранения изображений

  const compressImage = (imgDataUrl) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = imgDataUrl;

    return new Promise((resolve) => {
      img.onload = () => {
        const scaleFactor = 1; // Измените на нужный коэффициент
        canvas.width = img.width * scaleFactor;
        canvas.height = img.height * scaleFactor;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.8)); // Установите качество, например, 0.7
      };
    });
  };

  const renderPdf = async (url) => {
    if (!url) {
      console.error("PDF URL is missing!");
      return;
    }

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

      // Получаем изображение из canvas
      const imgDataUrl = canvas.toDataURL();
      console.log(`Page ${i} Image Data URL:`, imgDataUrl);

      // Уменьшаем изображение
      const compressedImgDataUrl = await compressImage(imgDataUrl);
      pageImages.push(compressedImgDataUrl);
    }

    setImages(pageImages);
  };

  useEffect(() => {
    document.title = decodeURIComponent(title);

    if (!pdfRenderedRef.current) {
      pdfRenderedRef.current = true;
      renderPdf(pdfUrl);
    }

    return () => {
      setImages([]); // Очистка изображений при размонтировании
    };
  }, [pdfUrl, title]);

  return (
    <div className="pdf-container">
      {images.map((imgSrc, index) => (
        <img key={index} src={imgSrc} alt={`Page ${index + 1}`} />
      ))}
    </div>
  );
};

export default PdfViewer;
