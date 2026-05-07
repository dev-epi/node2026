const TaskModel = require('../models/Task.model')

const create = async (req, res) => {
    try {
        let task = new TaskModel(req.body)
        await task.save()
        res.send(task)
    } catch (err) {
        res.status(410).send({ success: false, message: err.message })
    }
}

const getAll = async (req, res) => {
    try {
        let tasks = await TaskModel.find().populate('assignee', 'firstName lastName')
        res.send(tasks)
    } catch (err) {
        res.status(430).send(err)
    }
}

const getById = async (req, res) => {
    try {
        let task = await TaskModel.findById(req.params.id).populate('assignee', 'firstName lastName')
        res.send(task)
    } catch (err) {
        res.status(430).send(err)
    }
}

const update = async (req, res) => {
    try {
        let task = await TaskModel.updateOne({ _id: req.params.id }, req.body)
        res.send(task)
    } catch (err) {
        res.status(430).send(err)
    }
}

const remove = async (req, res) => {
    try {
        let task = await TaskModel.deleteOne({ _id: req.params.id })
        res.send(task)
    } catch (err) {
        res.status(430).send(err)
    }
}

module.exports = { create, getAll, getById, update, remove }
