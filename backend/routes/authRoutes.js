import { Router } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import {
  authorization,
  registration
} from '../controllers/authController.js';

export const router = Router()

router.post('/login', authorization);
router.post('/registration', registration);