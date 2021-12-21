const express= require('express')
const app= express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config()

const port= 9000

const url=process.env.DB_URL
mongoose.connect(url,{
useNewUrlParser:true,
useUnifiedTopology:true,
}).then(()=>{
    // if data base is connected successfullnpm
    console.log('DataBase connection successful....')
    //if error occurs
}).catch((error)=>{console.log(error)
})

app.use(express.json())
//welcome client msg



app.get('/back',(req,res)=>{res.send('ok')})
app.get('/',(req,res)=> {res.send({
name: 'ben',
age:23,
height:12})
})
app.get('/fans',(req,res)=>{res.send(
    [{name: 'Tracy',
    fan_level: 1},{name:'Jake', fan_level:5},{name: "Sam",fan_level:4},{name: 'Grace',
fan_level: 5},{name:'Mike', fan_level:2},{name: "Jane",fan_level:4}]
)})

app.listen(port,()=>{console.log(`todo is running at ${port}`)})
