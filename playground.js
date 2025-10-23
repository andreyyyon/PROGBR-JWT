/*
    Testando criptografia do bcrypt
*/

const bcrypt = require("bcryptjs");

const password = "Meu password";
const salt = bcrypt.genSaltSync(14);

/*
    hash - é uma promisse, precisa de um callback.
    hashSync - await nativo.
    salt - valor utilizado no algoritmo para garantir que a 
           string criptografada não seja a mesma, mesmo que 
           gerado novamente.
*/
const cryptPassword = bcrypt.hashSync(password, salt);

const dbSavedPassword = "$2b$14$dHM6zqVxg2UGpU6ZDrJe0O0M8WW5tFn5BezYPxau1wiSaEUUi0jnq"

console.log(cryptPassword);
console.log(bcrypt.compareSync(password, dbSavedPassword));

/*
    Testando geração de JWT
*/
const jwt = require("jsonwebtoken");

const user = {
    id: "001",
    name: "Nome",
    username: "NomeUser",
    password: "123456"
}

const secret = "asjdahsdou093"


function createToken(){
    const newToken = jwt.sign({id: user.id, username: user.username}, secret, {expiresIn: 20}) // opção para expirar o token em segundos
    console.log(newToken);
}

function testToken(token){
    try{
        const validData = jwt.verify(token, secret);
        console.log(validData);
    }catch (error){
        console.log(error)
    }
}

createToken();
testToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMSIsInVzZXJuYW1lIjoiTm9tZVVzZXIiLCJpYXQiOjE3NjEyMzYxNzF9.p228-DTuiVnwiHhpJ_g_7IBEe5Zvwb7ab3dVvpy87kY");
