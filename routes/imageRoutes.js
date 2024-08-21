import express from 'express';
import { uploadImage, getImages ,deleteImage} from '../controllers/imageController.js';

const router = express.Router();

// Route to handle image upload
router.post('/upload', uploadImage);

// Route to fetch all images
router.get('/images', getImages);

router.delete('/images/:id', deleteImage);

export default router;
