import { Button } from '@mui/material';
import React, { useState } from 'react';

const ImageUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform your image upload logic here
    console.log('Selected File:', selectedFile);
    console.log('Selected Category:', selectedCategory);
    console.log('New Category:', newCategory);

    // Reset the form
    setSelectedFile(null);
    setSelectedCategory('');
    setNewCategory('');
  };

  return (
    <div className='department-creation-wrapper'>
    <form  onSubmit={handleSubmit}>
      <div>
        <label className='text-lg' htmlFor="image">Gallery Images</label>
        <input style={{alignItems:"center"}}
          type="file"
          id="image"
          accept=".jpeg, .jpg, .png, .gif"
          onChange={handleFileChange}
        />
      </div>

      <div>
        <select id="category" className='w-full' value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>
      </div>

      <div>
        <label htmlFor="newCategory">Create a new category</label>
        <input
          type="text"
          id="newCategory"
          value={newCategory}
          onChange={handleNewCategoryChange}
        />
      </div>

      <Button type="submit">Upload</Button>
    </form>
    </div>
  );
};

export default ImageUploadForm;
