const express= require('express');
const cors=require('cors');
const mysql=require('mysql');
const app= express();
app.use(express.json());   

app.use(cors());

const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"user"
})

app.get("/",(req,res)=>{
    const sql= "select * from user1";
    db.query(sql, (err,data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.post("/create",(req,res)=>{
    const sql="insert into user1(`name`,`Email`,`MobNo`,`Address`) values(?)";
    const values=[
        req.body.name,
        req.body.Email,
        req.body.MobNo,
        req.body.Address
    ]
    db.query(sql,[values],(err,data)=>{
        
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put("/update/:id",(req,res)=>{
    const sql="update user1 set `name`= ? ,`Email`=?, `MobNo`=?, `Address=?` where id=?";
    const values=[
        req.body.name,
        req.body.Email,
        req.body.MobNo,
        req.body.Address
    ]
    const id=req.params.id;
    db.query(sql,[...values,id],(err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete("/student/:Id",(req,res)=>{
    const sql="delete from user1 where Id=?"
    const Id=req.params.Id;

    db.query(sql,[Id],(err,data)=>{
        if(err) return res.json("error");
        return res.json(data);
    })
})

app.listen(8080, ()=>{
    console.log("listening");
})