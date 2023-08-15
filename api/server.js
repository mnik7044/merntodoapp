const express = require('express')  // Require express
const mongoose = require('mongoose')  // To handle our database
const cors = require('cors')  // For cross origin request

const app = express()

app.use(express.json())
app.use(cors()) // To protect us from any cross origin errors

mongoose.connect('mongodb://127.0.0.1:27017/mern-todo',{
    useNewUrlParser : true, // Idk what they do
    useUnifiedTopology : true // But if we dont have these there will be a problem
}).then(() => console.log("Connected to Database")).catch(console.error)  // This is how we connect mongodb with local database

const Todo = require('./models/Todo') // Importing the model


// Routes

app.get('/todos', async (req,res) => {
    const todos = await Todo.find()
    res.json(todos)
}) // This is finding our todos using the Todo model and rendering a json data 


// Here we are actually creating the task/todo thing
app.post('/todos/new', async (req, res) => {
    try {
      const todo = new Todo({
        text: req.body.text, // Here we are requesting the body for the text
      });
      await todo.save();
      res.json(todo);  // Parsing  out our new todo
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while saving the todo.' });
    }
  });

// This route is just deleting the task by finding it using the id.

app.delete('/todos/delete/:id', async (req,res) =>{ 
    const result = await Todo.findByIdAndDelete(req.params.id) //Findbyid and delete is a built in mongoose function to delete the give
    res.json(result)
})

// This is gonna toggle completing our tasks
app.put('/todos/complete/:id', async(req,res) =>{
   try{
    const todo = await Todo.findById(req.params.id)
    todo.complete = !todo.complete // Here it is making it complete if it is not complete and vice versa
   
    await todo.save()
    res.json(todo)
   }
   catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving the todo.' });
  }
})

app.listen(3050, () => console.log("Server Started on port 3050"))
