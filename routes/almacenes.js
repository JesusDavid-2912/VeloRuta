const express = require('express');
const router = express.Router();
const db = require('../db');

/**
 * @swagger
 * /api/almacenes:
 *   get:
 *     summary: Obtiene todos los almacenes
 *     tags: [Almacenes]
 *     responses:
 *       200:
 *         description: Lista de almacenes obtenida.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', async (req, res) => {
    try {
        const resultado = await db.query('SELECT * FROM almacenes');
        res.status(200).json(resultado.rows);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al consultar la BD" });
    }
});

/**
 * @swagger
 * /api/almacenes:
 *   post:
 *     summary: Registra un almacen
 *     tags: [Almacenes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ciudad:
 *                 type: string
 *                 example: "Querétaro"
 *               direccion:
 *                 type: string
 *                 example: "Av. 5 de Febrero 1405, Zona Industrial Benito Juárez"
 *               capacidad_max:
 *                 type: integer
 *                 example: 5000
 *     responses:
 *       201:
 *         description: Almacen registrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/', async (req, res) => {
    try {
        const { ciudad, direccion, capacidad_max } = req.body;
        const query = 'INSERT INTO almacenes (ciudad, direccion, capacidad_max) VALUES ($1, $2, $3) RETURNING *';
        const resultado = await db.query(query, [ciudad, direccion, capacidad_max]);
        res.status(201).json({ mensaje: "Almacen creado", almacen: resultado.rows[0] });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al guardar" });
    }
});

/**
 * @swagger
 * /api/almacenes/{id}:
 *   put:
 *     summary: Actualiza un almacen
 *     tags: [Almacenes]
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
 *               ciudad:
 *                 type: string
 *                 example: "Querétaro"
 *               direccion:
 *                 type: string
 *                 example: "Av. 5 de Febrero 1405, Zona Industrial Benito Juárez"
 *               capacidad_max:
 *                 type: integer
 *                 example: 5000
 *     responses:
 *       200:
 *         description: Almacen actualizado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { ciudad, direccion, capacidad_max } = req.body;
        const query = 'UPDATE almacenes SET ciudad = $1, direccion = $2, capacidad_max = $3 WHERE id = $4 RETURNING *';
        const resultado = await db.query(query, [ciudad, direccion, capacidad_max, id]);
        res.status(200).json({ mensaje: "Almacen actualizado", almacen: resultado.rows[0] });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar" });
    }
});

/**
 * @swagger
 * /api/almacenes/{id}:
 *   delete:
 *     summary: Elimina un almacen
 *     tags: [Almacenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Almacen eliminado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM almacenes WHERE id = $1 RETURNING *';
        await db.query(query, [id]);
        res.status(200).json({ mensaje: "Almacen eliminado" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar" });
    }
});

module.exports = router;