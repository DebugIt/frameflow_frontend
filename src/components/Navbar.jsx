import React from 'react'

// mui
import CropFreeIcon from '@mui/icons-material/CropFree';
import CropIcon from '@mui/icons-material/Crop';

const Navbar = () => {
  return (
    <>
        <div id='container' className='p-4 text-teal-700 bg-teal-100'>
            <div id="heading" className='font-bold text-5xl break-words'>
                Frame Flow <CropIcon />
            </div>
        </div>
    </>
  )
}

export default Navbar