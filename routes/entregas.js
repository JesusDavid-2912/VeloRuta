const express = require('express');
const router = express.Router();
const db = require('../db');

/**
 * @swagger
 * /api/entregas:
 *   get:
 *     summary: Obtiene todos las entregas
 *     tags: [Entregas]
 *     responses:
 *       200:
 *         description: Lista de entregas obtenida.
 */
router.get('/', async (req, res) => {
    try {
        const resultado = await db.query('SELECT * FROM entregas');
        res.status(200).json(resultado.rows);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al consultar la BD" });
    }
});

/**
 * @swagger
 * /api/entregas:
 *   post:
 *     summary: Registra una entrega
 *     tags: [Entregas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha_estimada:
 *                 type: string
 *                 example: "2026-11-22"
 *               direccion_destino:
 *                 type: string
 *                 example: "Calle Ezequiel Montes 45, Centro Histórico, Querétaro"
 *               estado:
 *                 type: string
 *                 example: "entregado"
 *               repartidor_id:
 *                 type: integer
 *                 example: 1
 *               paquete_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Entrega creada.
 */
router.post('/', async (req, res) => {
    try {
        const { fecha_estimada, direccion_destino, estado, repartidor_id, paquete_id } = req.body;
        const query = 'INSERT INTO entregas (fecha_estimada, direccion_destino, estado, repartidor_id, paquete_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const resultado = await db.query(query, [fecha_estimada, direccion_destino, estado, repartidor_id, paquete_id]);
        res.status(201).json({ mensaje: "Entrega creada", entrega: resultado.rows[0] });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al guardar" });
    }
});

/**
 * @swagger
 * /api/entregas/{id}:
 *   put:
 *     summary: Actualiza una entrega
 *     tags: [Entregas]
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
 *               fecha_estimada:
 *                 type: string
 *                 example: "2026-11-22"
 *               direccion_destino:
 *                 type: string
 *                 example: "Calle Ezequiel Montes 45, Centro Histórico, Querétaro"
 *               estado:
 *                 type: string
 *                 example: "entregado"
 *               repartidor_id:
 *                 type: integer
 *                 example: 1
 *               paquete_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Entrega actualizada.
 *
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { fecha_estimada, direccion_destino, estado, repartidor_id, paquete_id } = req.body;
        const query = 'UPDATE entregas SET fecha_estimada = $1, direccion_destino = $2, estado = $3, repartidor_id = $4, paquete_id = $5 WHERE id = $6 RETURNING *';
        const resultado = await db.query(query, [fecha_estimada, direccion_destino, estado, repartidor_id, paquete_id, id]);
        res.status(200).json({ mensaje: "Entrega actualizada", entrega: resultado.rows[0] });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar" });
    }
});

/**
 * @swagger
 * /api/entregas/{id}:
 *   delete:
 *     summary: Elimina una entrega
 *     tags: [Entregas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Entrega eliminada.
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM entregas WHERE id = $1 RETURNING *';
        await db.query(query, [id]);
        res.status(200).json({ mensaje: "Entrega eliminada" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar" });
    }
});

module.exports = router;