import express from 'express';
import { createProperty, getAllProperties, deleteProperty, getPropertyById } from '../controllers/propertyController.js';

const router = express.Router();

// Route to create a new property
router.post('/properties', createProperty);

// Route to get all properties
router.get('/properties', getAllProperties);
router.get('/properties/:id', getPropertyById);


// Route to delete a property by ID
router.delete('/properties/:id', deleteProperty);



export default router;
