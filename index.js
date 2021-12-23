import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import TodoModel from "./todoSchema/todoSchema.js"

const app = express()

dotenv.config()

const port =  process.env.PORT||9000

const url = process.env.DB_URL
app.use(express.json())
app.use(cors())

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(()=>{
    console.log("Database connected successfully")
}).catch((error)=>{
    console.log(error)
})

///home route
app.get("/",(req,res)=>{
    res.send("Welcome to Benvid Todo API")
})
//Get all Todos rout
app.get("/getAllTodos",async(req,res)=>{
    const todo= await TodoModel.find({});

    if (todo){

       return res.status(200).json( todo
        )
    }else{
       return res.status(400).json({
            message:"Failed to fetch todos from database"
        })
    }

})


//Create a new Todo into the database
app.post("/createTodo",async(req,res)=>{
    const{title, description, isCompleted}=req.body
    const createTodo = await TodoModel.create({
        title,
        
        
        description,
        isCompleted
    })
    if(createTodo){
        return res.status(200).json({
            message:"Todo created successfully",
            data: createTodo
        
        })
    }else{
        return{
            message:"Failed to create a new Todo",
            
        }
    }

})

//Update:
app.patch("/updateTodos/:id",async(req,res)=>{

    const{id}=req.params;
    const{isCompleted}=req.body
    const updateTodo = await TodoModel.updateOne({isCompleted:isCompleted}).where({_id:id})

if(updateTodo){
    return res.status(200).json({
        message:"Todo update successfully",
        data: updateTodo
    
    })
}else{
    return res.status(400).json({ message:"Failed to update Todo",
})
       
        
    }


})
//Delete Todo From Database

app.delete("/deleteTodos/:id", async(req,res)=>{
    const {id}=req.params;
    const deleteTodo= await TodoModel.findByIdAndDelete({_id:id})

    if(deleteTodo){
        return res.status(200).json({
            message:"Todo delete successfully",
            data: deleteTodo
        
        })
    }

})


app.listen(port,() => {
    console.log(`Todo server running at ${port}`)
});
