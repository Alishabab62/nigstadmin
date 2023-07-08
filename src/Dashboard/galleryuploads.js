import React, { useState, useEffect, useRef } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { AiFillDelete } from 'react-icons/ai';
import Switch from '@mui/material/Switch';

const ImageUploadForm = () => {
  const [newCategory, setNewCategory] = useState('');
  const [responseMessage, setResponseMessage] = useState({ text: '', responseType: '' });
  const [categories, setCategories] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumImages, setAlbumImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

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

  const handleDelete = async (image) => {
    try {
      const response = await fetch('http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/gallery/delete_album', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aid: image }),
      });

      if (response.ok) {
        console.log(`Image with ID ${image} deleted successfully.`);
      } else {
        console.error(`Failed to delete image with ID ${image}.`);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleSubmitImage = async (e) => {
    e.preventDefault();
    if (selectedFile && selectedAlbum) {
      setLoading(true); 
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('Cname', selectedAlbum.category_name);
  
      try {
        const response = await fetch('http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/create_album', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        console.log('Upload response:', data);
        fetchImagesForAlbum(selectedAlbum.category_name);
        handleClosePreview(); 
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setLoading(false); 
      }
    } else {
      console.error('No file selected or category not selected.');
    }
  };
  

  const handleVisibility = async (categoryId, visibility) => {
    const requestBody = {
      Cid: categoryId,
      Cvisible: visibility,
    };

    try {
      const response = await fetch('http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/update_album_category', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log(`Category with ID ${categoryId} visibility updated successfully.`);
        fetchCategories(); 
      } else {
        console.error(`Failed to update visibility for category with ID ${categoryId}.`);
      }
    } catch (error) {
      console.error('Error updating category visibility:', error);
    }
  };

  const handleNewCategorySubmit = async (event) => {
    event.preventDefault();

    if (newCategory.trim() !== '') {
      try {
        const response = await fetch('http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/create_album_category', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Cname: newCategory }),
        });
        const data = await response.text();
        console.log('New Album Response:', data);
        setResponseMessage({ text: data, responseType: 'success' });
        setNewCategory('');
        fetchCategories();
      } catch (error) {
        console.error('Error creating Album:', error);
        setResponseMessage({ text: 'Error creating Album.', responseType: 'error' });
      }
    } else {
      setResponseMessage({ text: 'Album name cannot be empty.', responseType: 'error' });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/view_album_category');
      const data = await response.json();
      console.log('API Response:', data);
      if (data && data.data && Array.isArray(data.data)) {
        setCategories(data.data);
      } else {
        console.error('Invalid API response - categories is not an array');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryDelete = async (categoryName) => {
    try {
      const response = await fetch('http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/delete_album_category', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cname: categoryName }),
      });

      if (response.ok) {
        console.log(`Category with name ${categoryName} deleted successfully.`);
        fetchCategories(); 
      } else {
        console.error(`Failed to delete category with name ${categoryName}.`);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const fetchImagesForAlbum = async (category) => {
    const requestBody = { category: category };

    try {
      const response = await fetch('http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/gallery/album_view_category', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      console.log('Album Images:', data);
      setAlbumImages(data.images);
    } catch (error) {
      console.error('Error fetching album images:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
        <div className='department-creation-wrapper'>
          <form onSubmit={handleNewCategorySubmit}>
            <div>
              <label htmlFor='newCategory'>Create New Album</label>
              <input
                type='text'
                id='newCategory'
                value={newCategory}
                onChange={(handleNewCategoryChange)}
              />
            </div>

            <div>
              {responseMessage.text && (
                <p style={{ color: responseMessage.responseType === 'error' ? 'red' : 'green' }}>
                  {responseMessage.text}
                </p>
              )}

              <Button type='submit' sx={{ bgcolor: '#1b3058', color: 'white' }} variant='contained'>
                Create Album
              </Button>
            </div>
          </form>
        </div>
        <div style={{ width: '600px', maxWidth: '600px', maxHeight: '600px', margin: 'auto', marginTop: '80px' }}>
          <table className='faculty-position-table' style={{ borderSpacing: 0 }}>
            <thead>
              <tr>
                <th colSpan='13' style={{ textAlign: 'center', backgroundColor: '#ffcb00', position: 'sticky', top: 0, zIndex: 1 }}>
                  GALLERY ALBUMS
                </th>
              </tr>
              <tr style={{ backgroundColor: '#ffcb00', position: 'sticky', top: '34px', zIndex: 1 }}>
                <th>S.No</th>
                <th>Albums</th>
                <th style={{ textAlign: 'center' }}>Edit</th>
                <th style={{ textAlign: 'center' }}>Visibility</th>
                <th style={{ textAlign: 'center' }}>Delete</th>
              </tr>
            </thead>
            <tbody style={{ position: 'relative' }}>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr key={category.category_id}>
                    <td>{index + 1}</td>
                    <td>{category.category_name}</td>
                    <td style={{ cursor: 'pointer', textAlign: 'center' }}>
                      <i className='fa-solid fa-pen-to-square' onClick={() => handleEditCategory(category)}></i>
                    </td>
                    <td style={{ cursor: 'pointer', textAlign: 'center' }}>
                      <Switch
                        checked={category.visibility}
                        onChange={(event) => handleVisibility(category.category_id, event.target.checked)}
                        sx={{
                          '& .MuiSwitch-thumb': {
                            color: category.visibility ? 'green' : 'red',
                          },
                        }}
                      />
                    </td>
                    <td style={{ cursor: 'pointer', textAlign: 'center' }}>
                      <i className='fa-solid fa-trash' onClick={() => handleCategoryDelete(category.category_name)}></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='4' style={{ textAlign: 'center' }}>
                    No Albums to display
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedAlbum && (
        <div>
          <h1 style={{ textAlign: 'center', marginTop: '50px' }} className='text-xl font-bold'>
            Album: {selectedAlbum.category_name}
          </h1>
          <form onSubmit={handleSubmitImage}>
            <input
              type='file'
              style={{ display: 'none' }}
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
                handlePreview(URL.createObjectURL(e.target.files[0]));
              }}
              ref={fileInputRef}
            />
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px' }}>
                <CircularProgress />
              </div>
            ) : (
              <div className='items-center' style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <Button type='button' sx={{ bgcolor: '#1b3058', color: 'white', marginRight: '10px' }} variant='contained' onClick={handleUpload}>
                  Select Images
                </Button>
                <Button type='submit' sx={{ bgcolor: '#1b3058', color: 'white' }} variant='contained'>
                  Upload Images
                </Button>
              </div>
            )}
          </form>

          {previewImage && (
            <div>
              <img src={previewImage} alt='Preview' style={{ maxWidth: '100px', maxHeight: '100px' }} />
              <Button onClick={handleClosePreview}>Close Preview</Button>
            </div>
          )}
          {albumImages && albumImages.length > 0 ? (
            <div style={{ display: 'flex', overflowX: 'auto', margin: '10px',width:"1200px" }}>
              {albumImages.map((image) => (
                <div key={image.aid} style={{ marginRight: '10px' }}>
                  <div style={{ position: 'relative', width: '120px', height: '120px', overflow: 'hidden' }}>
                    <img
                      src={image.fileName}
                      alt={image.aid}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: '0', right: '0' }}>
                      <AiFillDelete style={{ cursor: 'pointer' }} onClick={() => handleDelete(image.aid)} color='red' />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='item-center' style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
              No images in this album.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
