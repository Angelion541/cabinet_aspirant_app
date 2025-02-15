import { Router } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { checkRole, checkRoles } from '../middlewares/roleMiddleware.js';
import { addGroup, addLesson, getGroups, getLessons } from '../controllers/lessonsController.js';

export const router = Router()

router.get('/get_lessons', checkRoles(['student', 'deanery']), getLessons);
router.get('/get_groups', getGroups)
router.post('/add_group', checkRole('deanery'), addGroup)
router.post('/add_lesson', checkRole('deanery'), addLesson)