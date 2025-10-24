import express from "express";

const port = 4000;
const app = express();

app.get("/", (req, res) => {
    res.send("Listagem de Bebidas")
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
});