const express = require('express');
//const bodyParser = require('body-parser');
  const app = express();
//app.use(bodyParser.json());
let idn=0;
const tasks= [{id:idn++,title:"Study DSA", description: "Cover Linked Lists in 3hours",completed: false},{id: idn++,title:"GYM", description: "Do 60kgs deadlift", completed: false}]

app.get("/todos",function(req,res){
  //res.json({tasks}) gives {"tasks":[{"title":"Study DSA","description":"Cover Linked Lists in 3hours"},{"title":"GYM","description":"Do 60kgs deadlift"}]}
  //when .json is called, you cannot send request again, outgoes only once.
  let Title=[], Descriptions=[];
  for (let i=0; i<tasks.length; i++){
    Title.push(tasks[i].title);
    Descriptions.push(tasks[i].description);

  }
  res.status(200)//called by default but must be put above json
  res.json({Title, Descriptions})
})

app.get("/todos/:id",function(req,res){
  const userId = req.params.id; // Accessing the route parameter ':id'
  for (let i=0;i<tasks.length;i++){
    if(tasks[i].id==userId){
      
      const task= tasks[i].title;
      return res.status(202).json(task); // use return not res.json only, res.json causes errors
    }
  }
  res.status(404).json({message: "To do not found"}); //json(key:value), sorta like a object bhejo
})

app.use(express.json())
app.post("/todos",function(req,res){
  const {title,completed= false,description}= req.body;
  tasks.push({
    title: title, 
    completed: completed ||false, 
    description: description,
    id:idn++
  })
  res.status(201).json({"id":idn--})
})

app.put("/todos/:id",function(req,res){
  const userId = parseInt(req.params.id);
  const {title,completed,description}= req.body;
  for (let i=0;i<tasks.length;i++){
    if(tasks[i].id==userId){
      tasks[i].title = title !== undefined ? title : tasks[i].title;
      tasks[i].completed = completed !== undefined ? completed : tasks[i].completed;
      tasks[i].description = description !== undefined ? description : tasks[i].description;
      
      return res.status(200).json({message: "Item Updated"}); // use return not res.json only, res.json causes errors
    }
  }
  res.status(404).json({message: "Not found"}); //json(key:value), sorta like a object bhejo
})

app.delete("/todos/:id",function(req,res){
  const userId = req.params.id;
  for (let i=0;i<tasks.length;i++){
    if(tasks[i].id==userId){
      
      tasks.splice(i,1);
      return res.status(200).json({message: "Deleted"}); // use return not res.json only, res.json causes errors
    }
  }
  res.status(404).json({message: "Not found: Could not be deleted"}); //json(key:value), sorta like a object bhejo
})

app.listen(3000,() => {
  console.log('Server is running on port 3000');
})