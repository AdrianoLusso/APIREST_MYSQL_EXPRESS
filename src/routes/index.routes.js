import { Router } from "express";
import { ping } from '../controllers/index.controller.js';

const router = Router();

//Con esto se maneja el get a la base de datos.
router.get('/ping',ping);

export default router;