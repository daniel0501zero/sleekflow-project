import express from 'express'
const router = express.Router();
import {createTodo, viewAllTodo, viewTodo, updateTodo, deleteTodo, shareTodo} from '../controllers/controller.js'

//create post
router.post('/', createTodo)

//read get
router.get('/', viewAllTodo)
router.get('/:id', viewTodo)
//update put
router.put('/:id', updateTodo)
//delete delete
router.delete('/:id/:email', deleteTodo)

//share todo
router.post('/:id/share', shareTodo);

export default router;