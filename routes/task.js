const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');

const Task = require('../models/task');

route.get('/getTask', (req, res, next) => {
    Task.find().exec().then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

route.post('/createTask', (req, res, next) => {
    const { name, description } = req.body;
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        name,
        description
    });

    task.save().then(result => {
        res.status(200).json({
            message: 'Creado con exito!',
            task: result
        })
    }).catch(err => {
        res.status(500).json({
            message: 'Not found',
            error: err
        })
    });
});

module.exports = route;