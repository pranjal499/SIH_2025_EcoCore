import express from 'express'
import { createTopic, getModules } from '../controllers/moduleController.js';

const router = express.Router();

router.get('/', getModules);
router.post('/topic', createTopic);

export default router;