const express = require('express');
const router = express.Router();
const axios = require('axios');
const { MARS_PHOTOS_URL } = require('../config');

// External API call
const getPhotos = (sol, camera) => {
  return axios.get(MARS_PHOTOS_URL, {params: {sol, camera}})
}

// Get by sol and camera
router.get('/:sol/:camera', async function(req, res){ 
  let sol = req.params.sol;
  let camera = req.params.camera;

  // TODO validation

  let response = await getPhotos(sol, camera);
  res.json(response.data.photos);
})

module.exports = router;
