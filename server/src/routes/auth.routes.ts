import { Router } from 'express'
import { register, login } from "@/controllers/auth.controller"
import { body } from 'express-validator'

const router = Router()

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('role').isIn(['owner', 'walker']).withMessage('Invalid role')
  ],
  register
)

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  login
)

export default router
