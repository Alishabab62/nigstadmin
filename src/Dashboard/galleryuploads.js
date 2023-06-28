import React, { useState, useEffect } from 'react';

const ImageUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch('http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/view_album_category')
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data);
        if (data && data.data && Array.isArray(data.data)) {
          setCategories(data.data);
        } else {
          console.error('Invalid API response - categories is not an array');
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setIsLoading(false);
      });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleCreateCategory = () => {
    setShowCreateCategory(true);
  };
 
  const handleNewCategorySubmit = (event) => {
    event.preventDefault();
  
    if (newCategory.trim() !== '') {
      fetch('http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/create_album_category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Cname: newCategory }),
      })
        .then(response => response.text())
        .then(data => {
          console.log('New Category Response:', data);
          setResponseMessage(data);
          setNewCategory('');
        })
        .catch(error => {
          console.error('Error creating category:', error);
          setResponseMessage('Error creating category.');
        });
    } else {
      setResponseMessage('Category name cannot be empty.');
    }
  
    setShowCreateCategory(false);
  };
  
  
  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedFile && selectedCategory) {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('category', selectedCategory);

      fetch('http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/create_album', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('Upload Response:', data);
          // Handle the response as needed
        })
        .catch(error => {
          console.error('Error uploading image:', error);
          // Handle the error as needed
        });
    } else {
      console.error('Please select a file and category');
    }

    setSelectedFile(null);
    setSelectedCategory('');
    setNewCategory('');
  };

  return (
    <div className='department-creation-wrapper'>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='text-lg' htmlFor="image">Gallery Images</label>
          <input
            style={{ alignItems: "center" }}
            type="file"
            id="image"
            accept=".jpeg, .jpg, .png, .gif"
            onChange={handleFileChange}
          />
        </div>

        <div>
          {isLoading ? (
            <p>Loading categories...</p>
          ) : (
            <select
              id="category"
              className='w-full'
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.category_id} value={category.category_name}>
                  {category.category_name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          {responseMessage && <p>{responseMessage}</p>}
          {successMessage && <p>{successMessage}</p>}
          {showCreateCategory ? (
            <>
              <label htmlFor="newCategory">Create a new category</label>
              <input
                type="text"
                id="newCategory"
                value={newCategory}
                onChange={handleNewCategoryChange}
              />
              <button type="submit" onClick={handleNewCategorySubmit}>Submit</button>
              <button type="button" onClick={() => setShowCreateCategory(false)}>Cancel</button>
            </>
          ) : (
            <button onClick={handleCreateCategory}>Create New Category</button>
          )}
        </div>

        <div>
          <button type="submit">Upload</button>
        </div>
      </form>
    </div>
  );
};

export default ImageUploadForm;
