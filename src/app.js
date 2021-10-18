import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "hello test~" });
});

app.get("/tasks", (req, res) => {
    res.json([]);
});

app.post("/tasks", (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) return res.sendStatus(400);

    res.json({ title, description, id: uuidv4() });
});

export default app;
