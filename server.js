const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const users = [
    {username: "alice", age: 25, email: "alice@example.com"},
    {username: "bob", age: 30, email: "bob@example.com"},
    {username: "charlie", age: 28, email: "charlie@example.com"}
];

app.get("/", (req, res) => {
    res.send("Welcome to the users API!");
});

app.post("/users",(req,res)=>{
    users.push(req.body);
    res.json({message: "user added!", users: req.body})
});

app.get("/users", (req, res) => {
    if(!users) return req.status(400).json({error: "User parameter cannot be empty"});
    res.json(users);
});

app.get("/users/:id", (req, res) => {
    const user = users.find(u => u.user_id == req.params.id);
    res.json(user || { error: "user not found" });
});

app.delete("/users/:id", (req, res) => {
    users = users.filter(u => u.user_id != req.params.id);
    res.json({ message: "user deleted!" });
});

app.listen(port, () => {
    console.log(`users API running at http://localhost:${port}`);
});

