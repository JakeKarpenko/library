const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://Yevhen:Yevhen0101@library.euki6.mongodb.net/Library?retryWrites=true&w=majority",{
    useNewUrlParser: true
})

const bookSchima = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    cover:{
        type:String,
        required:true
    },
    overview:{
        type:String,
        required:true
    }
})

const Book = new mongoose.model("Book", bookSchima)

app.get("/read", (req, res) => {
    Book.find({}, (err, result)=>{
        if(!err){
            res.send(result)
        }
    })
})

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    Book.findByIdAndRemove(id).exec();
})

app.put("/update", (req, res) => {
    const id = req.body.id;
    const newData = {
        name: req.body.name,
        overview: req.body.overview
    }
    Book.findById(id, (err, updatedFood) =>{
        if(!err){
            if(newData.name != ""){
                updatedFood.name = newData.name;
            } 
            if(newData.overview != ""){
                updatedFood.overview = newData.overview;
            } 
            updatedFood.save()
        }
    })
})


app.post("/insert", (req, res) => {
    const name = req.body.name;
    const cover = req.body.cover;
    const overview = req.body.overview;

    const newBook = new Book({name:name, cover: cover, overview: overview});
    newBook.save();
})

app.listen(3001, () =>{
    console.log("Server started on port 3001");
})