import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';


const ImageUploadForm = () => {
  const [newCategory, setNewCategory] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumImages, setAlbumImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const handlePreview = (image) => {
    setPreviewImage(image);
  };

  const handleClosePreview = () => {
    setPreviewImage(null);
  };

  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleEditCategory = (category) => {
    setSelectedAlbum(category);
    fetchImagesForAlbum(category.category_name);
  };

  const handleDelete = (imageId) => {
    fetch(`http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/gallery/delete_album?id=${imageId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log(`Image with ID ${imageId} deleted successfully.`);
          // Perform any necessary state updates after successful deletion
        } else {
          console.error(`Failed to delete image with ID ${imageId}.`);
        }
      })
      .catch(error => {
        console.error('Error deleting image:', error);
      });
  };
  
  
 const handleUpload = () => {
  // Assuming you have the file object to be uploaded in a variable called 'file'
  const formData = new FormData();
  formData.append('file', Image);

  fetch('http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/create_album', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      console.log('Upload response:', data);
      // Perform any necessary state updates or UI changes after successful upload
    })
    .catch(error => {
      console.error('Error uploading image:', error);
    });
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
  };

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
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  };

  const fetchImagesForAlbum = (category) => {
    const requestBody = { category: category };
  
    fetch('http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/gallery/album_view_category', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Album Images:', data);
        setAlbumImages(data.images);
      })
      .catch(error => {
        console.error('Error fetching album images:', error);
      });
  };

 
  
  


  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div className='department-creation-wrapper'>
          <form onSubmit={handleNewCategorySubmit}>
            <div>
              <label htmlFor="newCategory">Create New Album</label>
              <input
                type="text"
                id="newCategory"
                value={newCategory}
                onChange={handleNewCategoryChange}
              />
            </div>

            <div>
              {responseMessage && <p>{responseMessage}</p>}
              <Button type="submit" sx={{ bgcolor: "#1b3058", color: "white" }} variant="contained">Create Album</Button>
            </div>
          </form>
        </div>
        <div style={{ width: "600px", maxWidth: "600px", maxHeight: "500px", overflowY: "scroll", margin: "auto", marginTop: "80px" }}>
          <table className="faculty-position-table" style={{ borderSpacing: 0 }}>
            <thead>
              <tr>
                <th colSpan="13" style={{ textAlign: "center", backgroundColor: "#ffcb00", position: "sticky", top: 0, zIndex: 1 }}>GALLERY ALBUMS</th>
              </tr>
              <tr style={{ backgroundColor: "#ffcb00", position: "sticky", top: "34px", zIndex: 1 }}>
                <th>S.No</th>
                <th>Albums</th>
                <th style={{ textAlign: "center" }}>Edit</th>
                <th style={{ textAlign: "center" }}>Delete</th>
              </tr>
            </thead>
            <tbody style={{ position: "relative" }}>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr key={category.category_id}>
                    <td>{index + 1}</td>
                    <td>{category.category_name}</td>
                    <td style={{ cursor: "pointer", textAlign: "center" }}>
                      <i className="fa-solid fa-pen-to-square" onClick={() => handleEditCategory(category)}></i>
                    </td>
                    <td style={{ cursor: "pointer", textAlign: "center" }}>
                      <i className="fa-solid fa-trash"></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>No categories to display</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div>
      {selectedAlbum && (

  
<div style={{ marginTop: "100px" }}>
<h3 className='text-center my-3'>{selectedAlbum?.category_name} Images</h3>
<div className='flex flex-wrap gap-2'>
  {albumImages?.length > 0 ? (
    albumImages.map((image) => (
      <div key={image.id} className='relative'>
        <img
          src={image.fileName}
          alt={image.aid}
          className='rounded-md cursor-pointer'
          style={{ width: "100px", height: "100px" }}
          onClick={() => handlePreview(image)}
        />
       <i className='absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full fa-solid fa-trash'  onClick={() => handleDelete(image.id)}>
              
              </i>
        
      </div>
    ))
  ) : (
    <p>No images to display</p>
  )}
  <div className='relative'>
    <button
      className='bg-blue-500 text-white rounded-md p-2'
      style={{ width: "100px", height: "100px" }}
      onClick={handleUpload}
    >
      +
    </button>
  </div>
</div>
{previewImage && (
  <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 flex justify-center items-center'>
    <div className='relative'>
      <img
        src={previewImage.fileName}
        alt={previewImage.aid}
        className='rounded-md'
        style={{ width: "600px", height: "400px" }}
      />
      <i className='absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full fa-solid fa-close'  onClick={handleClosePreview}>
              
              </i>
        
      
    </div>
  </div>
)}
</div>
  
)}

      </div>
    </div>
  );
};

export default ImageUploadForm;
