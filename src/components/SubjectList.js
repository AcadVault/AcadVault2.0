import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const SubjectList = () => {
  const { semId } = useParams();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (semId) {
      fetch(`/sem/${semId}/contents.json`)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data.contents)) {
            setSubjects(data.contents.filter(item => item.type === 'folder'));
          } else {
            console.error('Invalid data structure received:', data);
          }
        })
        .catch(error => {
          console.error('Error fetching subjects:', error);
        });
    }
  }, [semId]);

  return (
    <div>
      <h2>List of Subjects</h2>
      <ul>
        {subjects.map((subject, index) => (
          <li key={index}>
            <Link to={`/sem/${semId}/${subject.name}`}>{subject.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectList;
