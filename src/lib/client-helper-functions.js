'use client';

export const formatDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    const day = new Date(date).getDate();
    return formattedDate.replace(`${day}`, `${day}`);
}

export const openFile = (fileID) => {
    const webviewLink = `https://drive.google.com/file/d/${fileID}/view`;
    window.open(webviewLink, '_blank');
}