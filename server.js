const express = require ('express');
const db = require ('./db/index.js');
const app = express();


//db.query("SELECT * FROM users").then(res => console.log(res.rows));

//body parser
app.use(express.json());

app.post('/register', (req, res)=>{
    console.log(req.body);

    const { username, password, email, address } = req.body;
    db.query("INSERT INTO users (username, password, email, address) VALUES ($1, $2, $3, $4)", [username, password, email, address]).then(res => console.log(res));

    res.status(200).send("Success");
});

app.listen(3000, ()=>{
    console.log("Server started at Port 3000");
})