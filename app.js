const express=require("express");
const bodyParser=require("body-parser");
const date=require(__dirname+"/date.js");
const mongoose=require("mongoose");

mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true, useUnifiedTopology: true});


const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////hobbies////////////////////////////////////



const itemSchema=mongoose.Schema({
  name:String
});

const Item=mongoose.model("Item",itemSchema);
const item1=new Item({
  name:"one"
});
const item2=new Item({
  name:"two"
});
const item3=new Item({
  name:"three"
});




// const addhobbies=["Guitar"];
app.get("/",function(req,res){

  let day=date.getDate();
  Item.find({},function(error,data){
    if(data.length==0){
      Item.insertMany([item1,item2,item3],function(err){
        if(err){
          console.log(err);
        }else{
          console.log("success");
        }
      });
      res.redirect("/");
    }else{
      res.render("list",{listTitle:'Hobbies',kindofday:day,newitem:data,location:"/"});
    }

});
});

app.post("/",function(req,res){
  const item4=new Item({
    name:req.body.item
  });
  item4.save();
  res.redirect("/");
});

app.post("/delete",function(req,res){
  const checkid=req.body.check;
  Item.deleteOne({_id:checkid},function(err){
    if(err){
      console.log(err);
    }
  });
  res.redirect("/");
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////study-cg////////////////////////////////////////////////////////////////
var cgitems=[];
app.get("/cg",function(req,res){

  let day=date.getDate();

  res.render("list",{listTitle:'CG',kindofday:day,newitem:cgitems,location:"/cg"});

});
app.post("/cg",function(req,res){
  cgitems.push(req.body.item);
  res.redirect("/cg");

});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////clubs////////////////////////////////////////////////////////////////
var clubsitems=[];
app.get("/clubs",function(req,res){

  let day=date.getDate();

  res.render("list",{listTitle:'Clubs',kindofday:day,newitem:clubsitems,location:"/clubs"});

});
app.post("/clubs",function(req,res){
  clubsitems.push(req.body.item);
  res.redirect("/clubs");

});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////CP////////////////////////////////////////////////////////////////
var cpitems=[];
app.get("/cp",function(req,res){

  let day=date.getDate();

  res.render("list",{listTitle:'CP',kindofday:day,newitem:cpitems,location:"/cp"});

});
app.post("/cp",function(req,res){
  cpitems.push(req.body.item);
  res.redirect("/cp");

});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////WEBD////////////////////////////////////////////////////////////////
var webdevitems=[];
app.get("/webdev",function(req,res){

  let day=date.getDate();

  res.render("list",{listTitle:'WEBDEV',kindofday:day,newitem:webdevitems,location:"/webdev"});

});
app.post("/webdev",function(req,res){
  webdevitems.push(req.body.item);
  res.redirect("/webdev");

});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////FUTURE FIELDS////////////////////////////////////////////////////////////////
var futfieldsitems=[];
app.get("/futfields",function(req,res){

  let day=date.getDate();

  res.render("list",{listTitle:'Future Fields',kindofday:day,newitem:futfieldsitems,location:"/futfields"});

});
app.post("/futfields",function(req,res){
  futfieldsitems.push(req.body.item);
  res.redirect("/futfields");

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////about////////////////////////////////////////////////
app.get("/about",function(req,res){
  res.render("about");

});
///////////////////////////////////////////////////////////////////////////////////////////////
app.listen(3000,function(){
  console.log("the server is running at port 3000!");
});
