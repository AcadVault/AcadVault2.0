export const isAdmin = (sid) => {
  return process.env.ADMINS.includes(sid);
}

export const generateFilename = ({ courseName, materialType, year, exam, number, referenceBookName }) => {
  if (referenceBookName) return referenceBookName;
  if (exam) {
    return `${courseName} ${exam} ${year} ${materialType.split(" ")[1]} ${materialType.split(" ")[2]}`;
  } else {
    return `${courseName} Assignment-${number} ${materialType.split(" ")[1]} ${year}`
  }
}

export const getExtention = (fileName) => {
  const arr = fileName.split(".");
  return arr[arr.length - 1];
}

export const formatDate = (date) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  const day = new Date(date).getDate();
  return formattedDate.replace(`${day}`, `${day}`);
}