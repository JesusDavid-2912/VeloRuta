const express = require('express');
const router = express.Router();
const db = require('../db');

/**
 * @swagger
 * /api/paquetes:
 *   get:
 *     summary: Obtiene todos los paquetes
 *     tags: [Paquetes]
 *     responses:
 *       200:
 *         description: Lista de paquetes obtenida.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', async (req, res) => {
    try {
        const resultado = await db.query('SELECT * FROM paquetes');
        res.status(200).json(resultado.rows);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al consultar la BD" });
    }
});

/**
 * @swagger
 * /api/paquetes:
 *   post:
 *     summary: Registra un paquete
 *     tags: [Paquetes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               peso_kg:
 *                 type: number
 *                 example: 2.50
 *               dimensiones:
 *                 type: string
 *                 example: "30x20x15 cm"
 *               almacen_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Paquete creado.
 *       500:
 *         description: Error interno del servidor.
 * 
 */
router.post('/', async (req, res) => {
    try {
        const { peso_kg, dimensiones, almacen_id } = req.body;
        const query = 'INSERT INTO paquetes (peso_kg, dimensiones, almacen_id) VALUES ($1, $2, $3) RETURNING *';
        const resultado = await db.query(query, [peso_kg, dimensiones, almacen_id]);
        res.status(201).json({ mensaje: "Paquete creado", paquete: resultado.rows[0] });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al guardar" });
    }
});

/**
 * @swagger
 * /api/paquetes/{id}:
 *   put:
 *     summary: Actualiza un paquete
 *     tags: [Paquetes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               peso_kg:
 *                 type: number
 *                 example: 2.50
 *               dimensiones:
 *                 type: string
 *                 example: "30x20x15 cm"
 *               almacen_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Paquete actualizado.
 *       500:
 *         description: Error interno del servidor.
 *
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { peso_kg, dimensiones, almacen_id } = req.body;
        const query = 'UPDATE paquetes SET peso_kg = $1, dimensiones = $2, almacen_id = $3 WHERE id = $4 RETURNING *';
        const resultado = await db.query(query, [peso_kg, dimensiones, almacen_id, id]);
        res.status(200).json({ mensaje: "Paquete actualizado", paquete: resultado.rows[0] });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar" });
    }
});

/**
 * @swagger
 * /api/paquetes/{id}:
 *   delete:
 *     summary: Elimina un paquete
 *     tags: [Paquetes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paquete eliminado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM paquetes WHERE id = $1 RETURNING *';
        await db.query(query, [id]);
        res.status(200).json({ mensaje: "Paquete eliminado" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar" });
    }
});

module.exports = router;