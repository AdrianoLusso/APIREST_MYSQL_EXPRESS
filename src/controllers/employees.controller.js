import { pool } from '../db.js'

export const getEmployees = async (req, res) => {

    //Es importante manejar los errores por si llega a haber caida en el servidor.
    try {
        const [rows] = await pool.query('SELECT * FROM employee;');
        res.json(rows);
    }
    catch (e) {
        return res.status(500).json({ message: "Something goes wrong" });
    }

};

export const getEmployee = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id]);

        //Si el arreglo es de longitud 0, significa que no se encontro ningun empleados.
        //Por lo tanto, deberiamos retornar error 404.
        if (rows.length <= 0) { return res.status(404).json({ message: 'Employee not found.' }) }

        res.json(rows[0]);
    } catch (e) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
};

export const createEmployee = async (req, res) => {
    const { name, salary } = req.body;
    try {
        //Es buena costumbre usar await cuando se hace pool.query
        const [rows] = await pool.query('INSERT INTO employee (name,salary) VALUES (?,?)', [name, salary])
        res.send({
            id: rows.insertId,
            name,
            salary
        });
    } catch (e) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
};

export const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, salary } = req.body;

    try {
        //El IFNULL(a,b) significa que si el valor a es vacio, se tomara el valor b por defecto.
        //Ese name y salary no hacen referencia a {name,salary}, sino a los valores de la respectiva tupla de la BD.
        const [result] = await pool.query('UPDATE employee SET name = IFNULL(?,name),salary = IFNULL(?,salary) WHERE id = ?', [name, salary, id])
        console.log(result);

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'employee not found'
            })
        }

        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id]);

        res.json(rows[0]);
    } catch (e) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}
export const deleteEmployee = async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id]);

        if (result[0].affectedRows <= 0) {
            return res.status(404).json({
                message: 'Employee not found'
            })
        }

        console.log(result);
        res.sendStatus(204);
    } catch (e) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}