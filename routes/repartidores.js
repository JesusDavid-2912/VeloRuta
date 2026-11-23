const express = require('express');
const router = express.Router();
const db = require('../db');

/**
 * @swagger
 * /api/repartidores:
 *   get:
 *     summary: Obtiene todos los repartidores
 *     tags: [Repartidores]
 *     responses:
 *       200:
 *         description: Lista de repartidores obtenida.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', async (req, res) => {
    try {
        const resultado = await db.query('SELECT * FROM repartidores');
        res.status(200).json(resultado.rows);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al consultar la BD" });
    }
});

/**
 * @swagger
 * /api/repartidores:
 *   post:
 *     summary: Registra un repartidor
 *     tags: [Repartidores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Carlos Eduardo Mendoza"
 *               numero_licencia:
 *                 type: string
 *                 example: "LIC-QRO-849201"
 *               telefono:
 *                 type: string
 *                 example: "442-318-9045"
 *     responses:
 *       201:
 *         description: Repartidor registrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/', async (req, res) => {
    try {
        const { nombre, numero_licencia, telefono } = req.body;
        const query = 'INSERT INTO repartidores (nombre, numero_licencia, telefono) VALUES ($1, $2, $3) RETURNING *';
        const resultado = await db.query(query, [nombre, numero_licencia, telefono]);
        res.status(201).json({ mensaje: "Repartidor creado", repartidor: resultado.rows[0] });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al guardar" });
    }
});

/**
 * @swagger
 * /api/repartidores/{id}:
 *   put:
 *     summary: Actualiza un repartidor
 *     tags: [Repartidores]
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
 *               nombre:
 *                 type: string
 *                 example: "Carlos Eduardo Mendoza"
 *               numero_licencia:
 *                 type: string
 *                 example: "LIC-QRO-849201"
 *               telefono:
 *                 type: string
 *                 example: "442-318-9045"
 *     responses:
 *       200:
 *         description: Repartidor actualizado.
 *       500:
 *         description: Error interno del servidor.
 *
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, numero_licencia, telefono } = req.body;
        const query = 'UPDATE repartidores SET nombre = $1, numero_licencia = $2, telefono = $3 WHERE id = $4 RETURNING *';
        const resultado = await db.query(query, [nombre, numero_licencia, telefono, id]);
        res.status(200).json({ mensaje: "Repartidor actualizado", repartidor: resultado.rows[0] });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar" });
    }
});

/**
 * @swagger
 * /api/repartidores/{id}:
 *   delete:
 *     summary: Elimina un repartidor
 *     tags: [Repartidores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Repartidor eliminado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM repartidores WHERE id = $1 RETURNING *';
        await db.query(query, [id]);
        res.status(200).json({ mensaje: "Repartidor eliminado" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar" });
    }
});

module.exports = router;