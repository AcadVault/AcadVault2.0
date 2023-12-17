import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const FolderList = () => {
  const { semId, subjectId } = useParams();
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    if (semId && subjectId) {
      fetch(`/sem/${semId}/${subjectId}/contents.json`)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data.contents)) {
            setFolders(data.contents.filter(item => item.type === 'folder'));
          } else {
            console.error('Invalid data structure received:', data);
          }
        })
        .catch(error => {
          console.error('Error fetching folders:', error);
        });
    }
  }, [semId, subjectId]);

  return (
    <div>
      <h2>List of Folders in {subjectId}</h2>
      <ul>
        {folders.map((folder, index) => (
          <li key={index}>
            <Link to={`/sem/${semId}/${subjectId}/${folder.name}`}>{folder.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FolderList;
