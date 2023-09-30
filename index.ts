import express from "express";

const app = express();

app.use('/', (req, res) => {
    return res.json("hello from food app")
})

app.listen(8000, () => {
    console.log("app is listening on port 8000")
})