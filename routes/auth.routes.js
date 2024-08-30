import express from 'express';
import {
  GetAllData,
  GetCard,
  GetData,
  Login,
  SaveData,
  Signup
} from '../controllers/auth.controller.js';

const router = express.Router();

// Public Routes

router.post('/signup', Signup);

router.post('/login', Login);

// Protected Routes (Consider adding authentication middleware)
router.post('/save', SaveData);    // This could be POST, assuming it's for creating/updating data
router.get('/getdata', GetData);    // GET is more appropriate for fetching data
router.get('/getalldata', GetAllData); // GET for fetching all data
router.get('/getcard', GetCard);    // GET for fetching a specific card

export default router;
