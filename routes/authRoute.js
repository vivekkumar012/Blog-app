import express from 'express'
import { getAllUsers, loginController, registerController } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerController);
router.get('/all-users', getAllUsers);
router.post('/login', loginController);


export default router;