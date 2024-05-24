const express = require('express');
const router = express.Router();
const Task = require('../models/task.js');


// POST /create
router.post('/create', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Hubo un problema creando la tarea' });
    }
});

// GET 
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).send(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Hubo un problema encontrando la tarea' });
    }
});

// GET  id
router.get('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findById(req.params._id);
        if (!task) {
            return res.status(404).send({ message: 'Tarea no encontrada' });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Hubo un problema encontrando la tarea' });
    }
});

// PUT /markAsCompleted/:_id: Endpoint para marcar una tarea como completada
router.put('/markAsCompleted/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params._id, { completed: true }, { new: true });
        if (!task) {
            return res.status(404).send({ message: 'Tarea no encontrada' });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Hubo un problema actualizando la tarea' });
    }
});

// PUT  título
router.put('/id/:_id', async (req, res) => {
    try {
        const { title } = req.body;
        const task = await Task.findByIdAndUpdate(req.params._id, { title }, { new: true });
        if (!task) {
            return res.status(404).send({ message: 'Tarea no encontrada' });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Hubo un problema en la actualizacion de la tarea' });
    }
});

// DELETE 
router.delete('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params._id);
        if (!task) {
            return res.status(404).send({ message: 'Tarea no encontrada' });
        }
        res.status(200).send({ message: 'Tarea eliminada con exito' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Hubo un problema en el borrado la tarea' });
    }
});

module.exports = router;
