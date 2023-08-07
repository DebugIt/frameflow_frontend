import React, {useEffect, useState} from 'react'
import axios from "axios"
// mui
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

// mui modal
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button, Card, CardContent, CardHeader } from '@mui/material';

// displaying images
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Gallery = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openSnack, setOpenSnack] = useState(false);
    const [openErrSnack, setOpenErrSnack] = useState(false);

    
    
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageArray, setImageArray] = useState([]);

    const [file, setFile] = useState(null)

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
        setSelectedImage(URL.createObjectURL(file));
        setFile(file);
        }
    };

    // const fetchPost = async () => {
    //     try {
    //         const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/all`);
    //         console.log(response.data.data); // Assuming the image data is nested in response.data.data
    //         setImageArray(response.data.data); // Update the state with fetched image data
    //         if(response.data.success === true){
    //             setOpenSnack(true);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const fetchPost = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/all`);
            console.log("Response:", response); // Log the entire response object
            setImageArray(response.data.data); // Update the state with fetched image data
            if (response.data.success === true) {
                setOpenSnack(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    



    const createPost = async () => {
        console.log(process.env.REACT_APP_BASE_URL)
        console.log(file)
        if(!file){
            setOpenErrSnack(true);
        }else{
            try {
                let formData = new FormData();
                formData.append("image", file); // Use "image" as the key
                await axios.post(`${process.env.REACT_APP_BASE_URL}/upload/cloud`, formData, {
                    headers: {"Content-Type": `multipart/form-data`}
                }).then((res) => {
                    console.log(res);
                    // Optionally, you can fetch the updated image list after successful upload
                    fetchPost();
                    setOpenSnack(true);
                    handleClose();
                    window.location.reload(true)
    
                }).catch(err => console.log(err));
                
            } catch (error) {
                if (error.response) {
                    console.log("Server responded with an error:", error.response.data);
                } else if (error.request) {
                    console.log("No response received:", error.request);
                } else {
                    console.log("Error setting up the request:", error.message);
                }
            }
        }

        
    };
    
    // const createPost = async () => {
    //     if (!file) {
    //         setOpenErrSnack(true);
    //         return;
    //     }
    
    //     try {
    //         let formData = new FormData();
    //         formData.append("image", file);
    
    //         const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/upload/cloud`, formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data", // Set the correct content type
    //             },
    //         });
    
    //         console.log(response);
    
    //         // Assuming response contains data with image URL
    //         if (response.data.success === true) {
    //             setOpenSnack(true);
    //             fetchPost(); // Fetch the updated image list after successful upload
    //             handleClose();
    //             console.log("Post uploaded")
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    
    


      
    useEffect(() => {
        
      fetchPost()
    }, [])
    

  
  return (
    <>
        <Snackbar open={openSnack} autoHideDuration={3000} onClose={() => setOpenSnack(false)}>
            <Alert onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                Post's Refreshed
            </Alert>
        </Snackbar>

        <Snackbar open={openErrSnack} autoHideDuration={3000} onClose={() => setOpenErrSnack(false)}>
            <Alert onClose={() => setOpenErrSnack(false)} severity="error" sx={{ width: '100%' }}>
                Please Select a file
            </Alert>
        </Snackbar>


        <div id="container">
            <div className='fixed z-50 right-5 bottom-5'>
                <Fab className="" color='primary' aria-label="add">
                    <Link to="">
                        <AddIcon  onClick={handleOpen}/>
                    </Link>
                </Fab>
            </div>
            {/*  */}

            <div id="gallery-container">
                <h2 className='font-semibold text-center my-3 text-3xl text-teal-500'>
                    Your Visual Journey
                </h2>
            </div>

            <ImageList className='w-full' cols={3}>
                {imageArray && imageArray.length > 0 ? (
                    imageArray.map((item, index) => (
                        <ImageListItem key={index} className='border border-black'>
                            <img
                                src={item.imageUrl}
                                alt="Uploaded"
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))
                ) : (
                    <div>No images available.</div>
                )}
            </ImageList>


            
            <div>
                <Modal
                    className='absolute top-[50%] bg-teal-100 text-white md:left-[50%] w-full md:w-[50%] h-[90%]  md:mx-[25%]  p-4'
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box >
                    <Typography className='flex' id="modal-modal-title" variant="h6" component="h2">
                        <div className='font-bold'>
                            Create Post
                        </div>
                        <div className='flex-1 absolute right-5'>
                            <HighlightOffIcon size={20} onClick={handleClose}/>
                        </div>
                    </Typography>
                    {/* uploader */}
                    <h3>Select and upload image</h3>
                    <button className='bg-teal-700 py-4 px-3 my-3 rounded-lg' onClick={() => createPost()}>Upload to FrameFlow!</button>
                    <Card className='my-20'>
                    <CardContent>
                        
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="image-input"
                            type="file"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="image-input">
                            <Button
                            variant="contained"
                            color="success"
                            component="span"
                            style={{ margin: '10px 0' }}
                            >
                            Upload Image
                            </Button>
                        </label>
                        {selectedImage && (
                            <img
                            src={selectedImage}
                            alt="Uploaded"
                            style={{ maxWidth: '100%', maxHeight: 300, margin: '10px 0' }}
                            />
                        )}
                        
                    </CardContent>
                    </Card>                    
                    </Box>
                </Modal>
            </div>

        </div>
    </>
  )
}

export default Gallery