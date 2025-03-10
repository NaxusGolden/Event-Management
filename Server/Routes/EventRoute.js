const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = require('../Models/EventModel');

// Rutas CRUD

router.post('/events', async (req, res) => { 
    try {
        const { title, date, description, location } = req.body;
        if (!title || !date || !description || !location) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        const newEvent = new Event({ title, date, description, location });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/events', async (req, res) => { 
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/events/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/events/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/events/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.json({ message: 'Evento eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;