import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config.js"
import Todo from "./models/todoModel.js"

const app = express()
app.use(cors())

//data from client stored in request.body and formatted as json
app.use(express.json())

const PORT = 8080

app.get('/test', (req, res) => {
  res.json('Hello (from Server)!')
})

//CRUD

// a route that gets all todos and sends it to client(READ)
app.get('/todos', async(req, res) => {
  try{
    //use find method on the model to retrieve all documents from the todos collection
    const todos = await Todo.find()
    //send those documents to the client
    res.status(200).json(todos)
  }
  catch(e){
    console.log(e)
    res.status(400).json(e)
  }
})
//route that created and adds a todo document to the database
app.post('/todos', async (req,res) =>{
  try{
    const newTodo = await Todo.create(req.body)
    res.status(201).json(newTodo)
    console.log('POST /todos')
  }
  catch(e){
    console.log("Can't add a new data");
    res.status(400).json(e)
}
})

app.delete('/todos/:id', async (req, res) => {
  try{
    //use the id from the params to find and delete the document
    const deleteTodo = await Todo.findByIdAndDelete(req.params.id)
    console.log(deleteTodo);
    res.status(200).json(deleteTodo)
    
  }
  catch(e){
    console.log(e);
    res.status(400).json(e)
    
  }
})
// a route for updating a todo document from the database
app.put('/todos/:id', async( req, res) => {
  try{
    //use the model to find the document and replace it with the updated one (req.body)
    // we can add {new: true} to the options object to get the updated version of the document in 
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new:true})
    console.log(updatedTodo)
    console.log("PUT/todos/:id")
    res.status(200).json(updatedTodo)
  }
  catch(e){
    console.log(e)
    res.status(400).json(e)
  }
})

app.listen(PORT, () => {
  console.log('Listening on port :' + PORT)
  connectDB()
})