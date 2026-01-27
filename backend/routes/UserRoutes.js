import express from 'express';
const router = express.Router();
import { getUserDetails, loginUser, logout, registerUser } from '../controllers/userController.js';

// register new user
router.post('/register', registerUser);
// login 
router.post('/login', loginUser)
// get User Details
router.get('/getUserDetails', getUserDetails)
// logout
router.post('/logout', logout)

export default router;
