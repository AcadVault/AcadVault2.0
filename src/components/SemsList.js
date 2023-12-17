import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SemList = () => {
  const [semPaths, setSemPaths] = useState([]);

  useEffect(() => {
    fetch('/sem/contents.json')  
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.contents)) {
          setSemPaths(data.contents);
        } else {
          console.error('Invalid data structure received:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching semesters:', error);
      });
  }, []);

  return (
    <div>
      <h2>List of Semesters</h2>
      <ul>
        {semPaths.map((sem, index) => (
          <li key={index}>
            <Link to={`/sem/${sem.name}`}>{sem.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SemList;
