const express=require("express");
const app=express();
const bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
var items=["buy food","eat food","cook food"];

var workitems=[];

app.get("/",function(req,res){

  var today=new Date();

  current=today.getDay();
  //for creating in a shorter day
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var day= today.toLocaleDateString("en-US",options);
  // switch(current){
  //   case 0:
  //     day="sunday";
  //     break;
  //   case 1:
  //     day="monday";
  //     break;
  //   case 2:
  //     day="tuesday";
  //     break;
  //   case 3:
  //     day="wednesday";
  //     break;
  //   case 4:
  //     day="thursday";
  //     break;
  //   case 5:
  //     day="friday";
  //     break;
  //   case 6:
  //     day="saturday";
  //     break;
  //   default:
  //     console.log("error");
  // }

  res.render("index",{dayname: day, newlistitems: items});

});

app.post("/",function(req,res){
  item= req.body.newItem
   if(req.body.list === "work"){
     workitems.push(item);
     res.redirect("/work");
   }
   else {

     items.push(item);
     res.redirect("/");
   }


});


app.get("/work",function(req,res){
  res.render("index",{dayname:"work list",newlistitems: workitems})
})

app.post("/work",function(req,res){
  let item = req.body.newItem;
  workitems.push(item);
  res.redirect("/work");
})
 app.get("/about", function(req,res){
   res.render("about");
 })



app.listen(3000,function(){
  console.log("server runnning in port 3000");
})
