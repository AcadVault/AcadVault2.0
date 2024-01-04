'use client';

export const formatDate = (date) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  const day = new Date(date).getDate();
  return formattedDate.replace(`${day}`, `${day}`);
}