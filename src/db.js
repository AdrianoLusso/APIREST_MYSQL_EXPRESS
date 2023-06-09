//El /promise es para que se utilice mysql2 utilizando promesas y poder usar correctamente await.
import {createPool} from 'mysql2/promise'
import 
{
    DB_HOST,
    DB_PORT,
    DB_PASSWORD,
    DB_USER,
    DB_NAME
} from './config.js'

export const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    //Si no ingresamos port, toma el por defecto
    port: DB_PORT,
    database: DB_NAME
})

/*
Cuando queramos enviar consultar de sql, debemos hacer llamado a pool,que es el accedo a nuestra
base de datos.
 */