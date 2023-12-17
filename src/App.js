import './App.css'
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SemList from './components/SemsList';
import SubjectList from './components/SubjectList';
import FolderList from './components/FolderList';
import PdfList from './components/PdfList';

function App() {
  const [semPaths, setSemPaths] = useState([]);

  useEffect(() => {
    fetch('/sem/contents.json')
      .then(response => response.json())
      .then(data => {
        setSemPaths(data.contents.filter(item => item.type === 'folder'));
      })
      .catch(error => {
        console.error('Error fetching semPaths:', error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SemList semPaths={semPaths} />} />
        <Route path="/sem/:semId/*" element={<SubjectList />} />
        <Route path="/sem/:semId/:subjectId/*" element={<FolderList />} />
        <Route path="/sem/:semId/:subjectId/:folderId/*" element={<PdfList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
