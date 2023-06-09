import { Router } from "express";
import {
    getEmployees,
    createEmployee,
    deleteEmployee,
    updateEmployee,
    getEmployee
} from '../controllers/employees.controller.js'

const router = Router();

router.get('/employees', getEmployees);

//:id es un PARAMETRO. Para ejecutar getEmployees se debe pasar el un idd como parametro
router.get('/employees/:id', getEmployee);

router.post('/employees', createEmployee);

//El metodo put actualiza todo el objeto, pero es mucho mejor usar la peticion patch.
//Esta peticion permite realizar actualizacion parcial. Hay que usar put cuando queramos actualizacion completa.
router.patch('/employees/:id', updateEmployee);

router.delete('/employees/:id', deleteEmployee);

export default router;