import express from "express"
import mysql from "mysql"
import cors from "cors"
import dotenv from "dotenv"

const app = express()
dotenv.config();

const db = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("hello this is backend")
})

app.get("/prior_auth", (req, res) => {
    const q = "SELECT * FROM prior_auth"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/prior_auth", (req, res) => {
    const q = "INSERT INTO prior_auth (`id`,`status`,`requestid`,`date`,`urgency`,`services`,`services2`,`requestedby`) VALUES (?)"
    const values = [
        req.body.id,
        req.body.status,
        req.body.requestid,
        req.body.date,
        req.body.urgency,
        req.body.services,
        req.body.services2,
        req.body.requestedby
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("data has been stored sucessfully!")
    })
})

app.put("/prior_auth", (req, res) => {
    const Id = req.body.id;
    const q = "UPDATE prior_auth SET `status`= ? WHERE id = ?";
  
    const values = [
      req.body.status
    ];
  
    db.query(q, [...values,Id], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

app.get("/claim", (req, res) => {
    const q = "SELECT * FROM claim"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/claim", (req, res) => {
    const q = "INSERT INTO claim (`id`,`claimid`,`dos`,`status`,`name`,`dob`,`smokes`,`empi`,`phone`,`pcp`,`doctor`,`docimg`,`docdetail`,`docgrp`,`contact`,`rid`,`authid`,`services`,`payer1`,`edi1`,`assignment`, `fdtp`,`payer2`,`edi2`,`assignment2`,`fdtp2`,`cpt`,`diagnosis`,`units`,`price`) VALUES (?)"
    const values = [
    req.body.id,
    req.body.claimid,
    req.body.dos,
    req.body.status,
    req.body.name,
    req.body.dob,
    req.body.smokes,
    req.body.empi,
    req.body.phone,
    req.body.pcp,
    req.body.doctor,
    req.body.docimg,
    req.body.docdetail,
    req.body.docgrp,
    req.body.contact,
    req.body.rid,
    req.body.authid,
    req.body.services,
    req.body.payer1,
    req.body.edi1,
    req.body.assignment,
    req.body.fdtp,
    req.body.payer2,
    req.body.edi2,
    req.body.assignment2,
    req.body.fdtp2,
    req.body.cpt,
    req.body.diagnosis,
    req.body.units,
    req.body.price
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("data has been stored sucessfully!")
    })
})


app.get("/psum", (req, res) => {
    const q = "SELECT * from psum";
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });
  
  app.post("/psum", (req, res) => {
    const q = "INSERT INTO psum( `id`, `pc`, `ha`, `ra`,`ipp`,`ipn`,`rap`,`hcc`,`ed1`,`ed2`,`edn`) VALUES (?)";
  
    const values = [
      req.body.id,
      req.body.pc,
      req.body.ha,
      req.body.ra,
      req.body.ipp,
      req.body.ipn,
      req.body.rap,
      req.body.hcc,
      req.body.ed1,
      req.body.ed2,
      req.body.edn
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  
  app.get("/pdetail", (req, res) => {
    const q = "SELECT * FROM pdetail;";
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });
  
  app.post("/pdetail", (req, res) => {
    const q = "INSERT INTO pdetail (`name`,`dob`,`age`,`gender`,`type`,`EMPIMRN`,`phone`,`PCP`,`title`,`subtitle`,`doctor`, `photo`, `percentage`, `time`) VALUES(?)";
  
    const values = [
      req.body.name,
      req.body.dob,
      req.body.age,
      req.body.gender,
      req.body.type,
      req.body.EMPIMRN,
      req.body.phone,
      req.body.PCP,
      req.body.title,
      req.body.subtitle,
      req.body.doctor,
      req.body.photo,
      req.body.percentage,
      req.body.time,
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  

app.listen(process.env.PORT || 5500, () => {
    console.log("connected to backend!")
})