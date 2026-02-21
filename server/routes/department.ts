import express from 'express'
import authMiddleware from '../middleware/authMiddleware'
import { addDepartment } from '../controllers/departmentController'

const router = express.Router()

router.post('/add', authMiddleware, addDepartment)

export default router