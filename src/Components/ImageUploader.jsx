import React, { useState, useRef } from 'react';
import styles from './Styles/BlogAdd.module.css';

const ImageUploader = ({ buttonTitle, onDataTransfer }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(buttonTitle);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const data = event.target.value;
    onDataTransfer(data); // Call the callback function in the parent
  };

  const allowedFileTypes = ['image/jpeg', 'image/png'];
  const fileInputRef = useRef(null);

  const handleButtonClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file && allowedFileTypes.includes(file.type)) {
      setSelectedImage(file);
      setUploadStatus('uploading...');
      setError('');

      // Simulating an asynchronous upload process
      setTimeout(() => {
        setUploadStatus('Successful');
        setFileName(file.name);
        onDataTransfer(file.name); // Call the callback function in the parent with the file name
      }, 2000);
    } else {
      setSelectedImage(null);
      setError('Invalid file type. Please select a JPEG or PNG image.');
    }
  };

  return (
    <div className={styles.imageUploaderContainer}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
      <div className={styles.imageUploaderData}>
        <button onClick={handleButtonClick}>
          {uploadStatus} <i className="fa-sharp fa-solid fa-plus"></i>
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {fileName && (
          <div>
            <p>Uploaded File: {fileName}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
