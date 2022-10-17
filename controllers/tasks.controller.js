import { isValidObjectId } from "mongoose"
import TaskModel from "../models/task.model.js"
import { createError } from "../error.js"

export const createTask = async(req, res, next) => {
    try {
        const { name, completed } = req.body
        if (!name) {
            return res.status(400).json({ sucess: false, error: "task name is missing" })
        }

        const alreadyExist = await TaskModel.findOne({ name: name })
        if (alreadyExist) {
            return res.status(403).json({ sucess: false, error: "task already exist" })
        }
        const task = await TaskModel.create({
            name,
            completed
        })
        res.status(201).json({ sucess: true, task })
    } catch (err) {
        next(err)
    }
}

export const getTasks = async(req, res, next) => {
    try {
        const allTask = await TaskModel.find({}).lean()
        if (!allTask.length) {
            return res.stat(200).json({ sucess: true, allTask: [] })
        }
        res.status(200).json({ sucess: true, allTask })
    } catch (err) {
        next(err)
    }
}

export const getTaskById = async(req, res, next) => {
    try {
        const { id } = req.params
        if (!id || isValidObjectId(id)) {
            return res.status(400).json({ sucess: false, error: "task id missing" })
        }

        const task = await TaskModel.findById(id)
        if (!task) {
            return res.status(404).json({ sucess: false, message: "task not found or not a valid id" })
        }
        res.status(200).json({ sucess: true, task })
    } catch (err) {
        next(err)
    }
}

export const updateTask = async(req, res, next) => {
    try {
        const { id } = req.params
        const data = req.body
        if (!id || isValidObjectId(id)) {
            return res.status(400).json({ sucess: false, error: "task id missing or not a valid id" })
        }

        const task = await TaskModel.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        })
        if (!task) {
            return res.status(404).json({ sucess: false, error: "no task update with this id" })
        }
        res.status(200).json({ sucess: true, task })
    } catch (err) {
        next(err)
    }
}

export const deleteTask = async(req, res, next) => {
    try {
        const { id } = req.params
        if (!id || isValidObjectId(id)) {
            return res.status(400).json({ sucess: false, error: "task id missing or not a valid id" })
        }

        const task = await TaskModel.findByIdAndDelete(id)
        if (!task) {
            return res.status(404).json({ sucess: false, error: "no task delete with this id" })
        }
        res.status(200).json({ sucess: true, task: null })
    } catch (err) {
        next(err)
    }
}