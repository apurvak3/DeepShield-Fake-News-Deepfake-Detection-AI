const express = require('express');
const router = express.Router();
const { detectFakeImage } = require('../controllers/fakeImageController');
const upload = require('../middleware/uploadMiddleware');

router.post('/', upload.single('image'), detectFakeImage);

module.exports = router;
