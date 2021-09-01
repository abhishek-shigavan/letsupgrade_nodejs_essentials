// importing express package
const express = require('express');
// importing mongoose -- used to connect database 
const mongoose = require('mongoose');

// creating object of express
const app = express();

// applying middleware
app.use(express.json());

// connecting project to server
mongoose.connect("mongodb://localhost:27017/stateSymbolsApi",{useNewUrlParser:true},()=>{
    console.log("Connected To Mongo Server");
});

// creating schema
const stateSymbolSchema = new mongoose.Schema({
    stateName : String,
    stateAnimal : String,
    stateBird : String,
    stateTree : String,
    stateFruit : String,
    stateFlower : String
});

// creating model
const stateSymbolModel = new mongoose.model('statesymbols',stateSymbolSchema);

// getting all statesymbols data
app.get("/statesymbols",async (req,res)=>{
    let stateSymbols = await stateSymbolModel.find();
    res.send(stateSymbols);
});

// getting statesymbols data by state name
app.get("/statesymbols/stateName/:stateName",async (req,res)=>{
    let nameOfState = req.params.stateName;

    let stateSymbols = await stateSymbolModel.find({stateName:nameOfState});
    res.send(stateSymbols);
})

// getting statesymbols data by state fruit
app.get("/statesymbols/stateFruit/:stateFruit",async (req,res)=>{
    let fruitName = req.params.stateFruit;

    let stateSymbols = await stateSymbolModel.find({stateFruit:fruitName});
    res.send(stateSymbols);
})

// sending / creating new statesymbols data entry
app.post("/statesymbols/new",(req,res)=>{
    let symbolData = req.body;

    let stateSymbolObj = new stateSymbolModel(symbolData);
    stateSymbolObj.save((err,data)=>{
        if(err === null){
            console.log(symbolData);
            res.send({message:"new state with state symbols created"})
        }
    })
})

// updating statesymbols data
app.put("/statesymbols/:id",(req,res)=>{
    let id = req.params.id;
    // getting data
    let stateSymbolData = req.body;
    stateSymbolModel.updateOne({_id:id},stateSymbolData,(err,data)=>{
        if(err === null){
            res.send({message:"State Symbols Data Updated"})
        }
    })
})

// deleting statesymbols data entry by its state name
app.delete("/statesymbols/stateName/:stateName",(req,res)=>{
    // reading name
    let nameOfState = req.params.stateName;

    stateSymbolModel.deleteOne({stateName:nameOfState},(err,data)=>{
        if(err === null){
            res.send({message:"statesymbols entry of state deleted"});
        }
    })    
})

// creating & starting server
app.listen(8000,()=>{
    console.log("server is running");
});