/*
    JWT - https://www.jwt.io/

    Token que será a resposta do login para o frontend, onde ele
    devera ser armazenado e utilizado para a execução das chamadas
    de api.

    JWT é dividido em três partes:
    1° header do token com configurações de leitura
    2° conteudo do token: user, email, telefone...
    3° secret - assinatura do token para saber se o token não foi adulterado
*/

require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_CONNECTION_URL);
let db = mongoose.connection;

db.on("error", () => { console.log("Erro na abertura do Banco de Dados") });
db.once("open", () => { console.log("Sucesso na abertura do Banco de Dados") });

app.use("/user", express.json(), userRouter);

app.use("/admin", express.json(), adminRouter);

app.listen(process.env.PORT, () => {
    console.log("Server Running");
})