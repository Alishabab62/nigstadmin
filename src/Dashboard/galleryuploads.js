import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import{AiFillDelete} from 'react-icons/ai'
import Switch from '@mui/material/Switch';


const ImageUploadForm = () => {
  const [newCategory, setNewCategory] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumImages, setAlbumImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
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

  const handleDelete = (image) => {
    fetch('http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/gallery/delete_album', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ aid: image }),
    })
      .then(response => {
        if (response.ok) {
          console.log(`Image with ID ${image} deleted successfully.`);
          // Perform any necessary state updates after successful deletion
        } else {
          console.error(`Failed to delete image with ID ${image}.`);
        }
      })
      .catch(error => {
        console.error('Error deleting image:', error);
      });
  };
  

  const handleUpload = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleSubmitImage = (e) => {
    e.preventDefault();
    if (selectedFile && selectedAlbum) {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('Cname', selectedAlbum.category_name);

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
    } else {
      console.error('No file selected or category not selected.');
    }
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
                <th style={{ textAlign: "center" }}>Visibility</th>
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
                      <Switch
                        onChange={()=>{}}
                        data={category.visibility}
                        sx={{
                          '& .MuiSwitch-thumb': {
                            color: category.visibility ? 'green' : 'red',
                          },
                        }}
                      />
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

      {selectedAlbum && (
        <div>
          <h3 style={{ textAlign: 'center', marginTop:"50px" }}>Album: {selectedAlbum.category_name}</h3>
          <form onSubmit={handleSubmitImage}>
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
                handlePreview(URL.createObjectURL(e.target.files[0]));
              }}
              ref={fileInputRef}
            />
            <Button type="button" sx={{ bgcolor: "#1b3058", color: "white" ,marginRight:"10px" }} variant="contained" onClick={handleUpload}>
              Select Images
            </Button>
            <Button type="submit" sx={{ bgcolor: "#1b3058", color: "white" }} variant="contained">
              Upload Images
            </Button>
          </form>

          {previewImage && (
            <div>
              <img src={previewImage} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
              <Button onClick={handleClosePreview}>Close Preview</Button>
            </div>
          )}
{albumImages && albumImages.length > 0 ? (
  <div style={{ display: 'flex', overflowX: 'auto' }}>
    {albumImages.map(image => (
      <div key={image.aid} style={{ marginRight: '10px' }}>
        <div style={{ position: 'relative', width: '120px', height: '120px', overflow: 'hidden' }}>
          <img
            src={image.fileName}
            alt={image.aid}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', top: '0', right: '0' }}>
          <AiFillDelete onClick={() => handleDelete(image.aid)} color='red'/>

          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <div>No images in this album.</div>
)}


        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
