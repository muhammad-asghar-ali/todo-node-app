import express from "express"
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../controllers/tasks.controller.js"

const router = express.Router()

router.get('/', getTasks)
router.post('/', createTask)
router.get('/:id', getTaskById)
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)

export default router