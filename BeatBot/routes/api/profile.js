import express from 'express';
import profileController from '../../controllers/api/profilecontroller.js';
import ensureLoggedIn from '../../config/ensureLoggedIn.js';


const router = express.Router();

// GET current user's profile
router.get('/profile', ensureLoggedIn, profileController.getProfile);

// UPDATE current user's profile
router.put('/profile', ensureLoggedIn, profileController.updateProfile);

export default router;
