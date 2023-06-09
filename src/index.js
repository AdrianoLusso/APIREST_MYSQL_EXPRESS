import {PORT} from './config.js'
import app from './app.js'

//Este es el codigo que inicializa la aplicacion.

app.listen(PORT);
console.log("Server running in port ",PORT);


