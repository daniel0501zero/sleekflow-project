import express from 'express'
import todos from '../models/todos.js'
import users from '../models/User.js'

export const createTodo = async (req, res) => {

    try {
        const newTodo = new todos(req.body)
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

export const viewAllTodo = async (req, res) => {
    try {
        const { name, status, dueTime, sort, select } = req.query;
        const queryObj = {};
        if (name) {
            queryObj.name = { $regex: name, $option: 'i' };
        }
        if (status) {
            queryObj.status = status === "Not Started" ? "Not Started" : status === "In Progress" ? "In Progress" : "Completed"
        }

        let results = todos.find(queryObj);

        if (sort) {
            results = results.sort(sort.split(',').join(' '));
        }

        if (select) {
            results = results.select(select.split(',').join(' '));
        }


        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        results.skip(skip).limit(limit);

        const allTodos = await results;

        res.status(200).json({ results: allTodos.length, allTodos })
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

export const viewTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const thatTodo = await todos.findOne({ _id: id })
        if (!thatTodo) {
            res.status(404).json({ msg: "Todo not found" })
        }
        res.status(200).json({ thatTodo });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

export const updateTodo = async (req, res) => {
    try {
        const id = req.params.id
        const todo = await todos.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        })
        if (!todo) {
            res.status(404).json({ msg: "Todo not found" })
        }
        res.status(200).json({ todo });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id
        const todo = await todos.findOneAndDelete({ _id: id })
        if (!todo) {
            res.status(404).json({ msg: "Todo not found" })
        }
        res.status(200).send("Todo has been deleted.")
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

export const shareTodo = async (req, res) => {
    try {
        const id  = req.params.id;
        const email = req.body.email;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const user = await users.findOne({email: email});
        if (!user) {
            return res.status(400).json({ message: 'User not exists!' });
        }

        const todo = await todos.findOne({_id: id});
        if (!todo) {
            return res.status(404).json({message: "Todo or Account not found"});
        }

        if (todo.users && todo.users.includes(email)) {
            return res.status(400).json({message: "User already has access to this todo"})
        }

        if (!todo.users) {
            todo.users = [];
        }
        todo.users.push(email);

        await todo.save();
        res.status(200).json({message: 'Todo shared successfully', todo})
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}