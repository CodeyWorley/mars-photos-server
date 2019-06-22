const express = require('express');
const router = express.Router();
const axios = require('axios');
const { MARS_PHOTOS_URL } = require('../config');

// External API call
const getPhotos = (sol, camera) => {
   return axios.get(MARS_PHOTOS_URL, {params: {sol, camera}, headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }})
}

// Get by sol and any camera
router.get('/:sol', async function(req, res, next){ 
  let sol = req.params.sol;

  // Validation
  if (sol < 0 || sol > 2434) {
    const err = new Error('invalid sol number');
    err.status = 400;
    return next(err);
  }

  let response = await getPhotos(sol);
  res.json(response.data.photos);
})

// Get by sol and camera
router.get('/:sol/:camera', async function(req, res, next){ 
  let sol = req.params.sol;
  let camera = req.params.camera;

  // Validation
  if (sol < 0 || sol > 2434) {
    const err = new Error('invalid sol number');
    err.status = 400;
    return next(err);
  }

  if (
    camera == 'FHAZ' ||
    camera == 'NAVCAM' ||
    camera == 'MAST' ||
    camera == 'CHEMCAM' ||
    camera == 'MAHLI' ||
    camera == 'MARDI' ||
    camera == 'RHAZ' ||
    camera == 'any'
  ) {
    let response = await getPhotos(sol, camera);
    res.json(response.data.photos);
  }
  else {
    const err = new Error('invalid camera name');
    err.status = 400;
    return next(err);
  }
  
})

module.exports = router;
