import express from 'express'
import employeesRoutes from './routes/employees.routes.js'
import indexRoutes from './routes/index.routes.js'
import './config.js'

//Este codigo implementa codigo del framework express para configurar la aplicacion.

const app = express();

//Este metodo json() de express seencarga de recibir un elemento json y procesarlo correctamente,
//liberando de la responsabilidad al usuario. Es importante que esto se haga ANTES de usar las rutas.
app.use(express.json());

//Nos permite usar la ruta employeesRoutes definida y exportada. Router nos permite modularixar
//Las diferentes peticiones HTTP en diferentes archivos.
app.use(indexRoutes);
//Puedo puedo /api/ para que todos los handlers de employeesRoutes tengan esa dir. por delante
app.use('/api/',employeesRoutes);

//Esto permite que, al buscar una ruta no conocida con alguna peticion HTTP.
app.use((req,res,next) => {
    res.status(404).json({
        message:"endpoint not found"
    })
})

export default app;