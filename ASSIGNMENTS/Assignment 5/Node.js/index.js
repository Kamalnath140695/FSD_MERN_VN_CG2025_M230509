const express= require('express')
const app=express();
const PORT=8000;
const mongoose=require('mongoose')
const bookRoutes=require('./Routes/bookRoutes.JS')

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/',(req,res)=>{
    res.send("Server running successfully")
})

app.use(bookRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/BookManagementAPI',{}).
then(()=>console.log("mongodb connected successfully")).catch((err)=>console.log("Mongodb connection err",err))

app.listen(PORT, ()=>{
    console.log(`server running successfully on http://localhost:${PORT}`)
})

