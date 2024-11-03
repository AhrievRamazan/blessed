// PdfViewer.jsx
import React, { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import { useParams, useLocation } from "react-router-dom";
import { GlobalWorkerOptions } from "pdfjs-dist/webpack";
import "./Pdf.scss";

GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfViewer = () => {
  const { title } = useParams();
  const pdfUrl = new URLSearchParams(window.location.search).get("pdfUrl");
  const pdfRenderedRef = useRef(false);

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

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.height = viewport.height;
        canvas.width = viewport.width;
        container.appendChild(canvas);

        await page.render({ canvasContext: context, viewport }).promise;
        canvas.style.height = "auto";
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
  }, [pdfUrl, title]);

  return <div id="pdf-container" className="pdf-container"></div>;
};

export default PdfViewer;
