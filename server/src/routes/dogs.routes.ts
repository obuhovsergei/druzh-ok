import { Router } from 'express';
import {
  createDog,
  getDogs,
  createWalkRequest,
  updateWalkStatus,
} from "@/controllers/dogs.controller";
import { protect, roleCheck } from "@/middlewares/auth.middleware";
import { body } from 'express-validator';
import multer from 'multer';
import { validate } from "@/middlewares/validate.middleware";

const router = Router();
const upload = multer({ dest: 'uploads/dogs/' });

// Публичные роуты
router.get('/', getDogs);

// Защищенные роуты
router.use(protect);

// Для владельцев собак
router.post(
  '/',
  roleCheck(['owner']),
  upload.array('photos', 3),
  validate([
    body('name').notEmpty().withMessage('Name is required'),
    body('breed').notEmpty().withMessage('Breed is required'),
    body('age').isInt({ min: 0 }).withMessage('Age must be positive number'),
  ]),
  createDog
);

// Для выгульщиков
router.post(
  '/:dogId/walks',
  roleCheck(['walker']),
  validate([
    body('date').isISO8601().withMessage('Invalid date format'),
    body('duration').isInt({ min: 1 }).withMessage('Duration must be at least 1 hour'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be positive'),
    body('address.street').notEmpty().withMessage('Street is required'),
    body('address.city').notEmpty().withMessage('City is required'),
    body('address.coordinates').isArray({ min: 2, max: 2 }).withMessage('Invalid coordinates'),
  ]),
  createWalkRequest
);

// Для владельцев (изменение статуса заявки)
router.patch(
  '/:dogId/walks/:requestId',
  roleCheck(['owner']),
  validate([
    body('status').isIn(['accepted', 'rejected', 'completed']).withMessage('Invalid status'),
  ]),
  updateWalkStatus
);

export default router;
