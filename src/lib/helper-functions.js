import exp from "constants";

export const isAdmin = (sid) => {
  return process.env.ADMINS.includes(sid);
}

export const generateFilename = ({ courseName, materialType, year, exam, number, referenceBookName }) => {
  if (referenceBookName) return referenceBookName;
  if (exam) {
    return `${courseName} ${exam} ${year} ${materialType}`;
  } else {
    return `${courseName} ${materialType}-${number} ${year}`
  }
}

export const getExtention = (fileName) => {
  const arr = fileName.split(".");
  return arr[arr.length - 1];
}