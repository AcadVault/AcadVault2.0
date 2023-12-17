import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PdfList = () => {
  const { semId, subjectId, folderId } = useParams();
  const [pdfList, setPdfList] = useState([]);

  useEffect(() => {
    if (semId && subjectId && folderId) {
      fetch(`/sem/${semId}/${subjectId}/${folderId}/contents.json`)
        .then(response => response.json())
        .then(data => {
          setPdfList(data.contents.filter(item => item.type === 'pdf'));
        })
        .catch(error => {
          console.error('Error fetching PDFs:', error);
        });
    }
  }, [semId, subjectId, folderId]);

  return (
    <div>
      <h2>List of PDFs in {folderId}</h2>
      <ul>
        {pdfList.map((pdf, index) => (
          <li key={index}>
            <a
              href={`/sem/${semId}/${subjectId}/${folderId}/${pdf.name}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {pdf.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PdfList;
