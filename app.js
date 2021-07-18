//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-prashant:Test123@cluster0.xqu7s.mongodb.net/todolistDB",{useNewUrlParser:true});

const itemSchema={
  name:String
};

const Item=mongoose.model("Item",itemSchema);

const item1=new Item({
  name:"Jogging"
});

const item2=new Item({
  name:"Playing"
});

const item3=new Item({
  name:"Music"
});

const arr=[item1,item2,item3];

app.get("/", function(req, res) {

     Item.find({},function(err,foundItems) {
       if(foundItems.length===0)
       {
         Item.insertMany(arr,function(err) {
           if(err)
           console.log(err);
           else {
             console.log("Added");
           }
         });
         res.redirect("/");
       }
       else{
       res.render("list", {listTitle:"Today", newListItems: foundItems});
     }
     });
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const item=new Item({
    name:itemName
  });
  item.save();
  res.redirect("/");
});

app.post("/delete",function(req,res) {
  const chkid=req.body.chkbox;
  Item.findByIdAndRemove(chkid,function(err) {
    if(err)
    console.log(err);
    else {
      console.log("Deleted");
    }
  });
  res.redirect("/");
})

app.get("/:name",function(req,res) {
  console.log(req.params.name);
});

let port=process.env.PORT;
if(port==NULL || port=="")
{
  port=3000;
}



app.listen(port, function() {
  console.log("Server started successfully");
});
