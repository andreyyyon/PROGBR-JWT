
/*
    Autenticação do token
*/
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("authoriztion-token");
    // valido se tem o token no header
    if (!token) return res.status(400).send("Access Denied");

    try {
        // verifico a integridade do token com o secret
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET);
        // setando uma propriedade user como verdadeira
        req.user = userVerified;
        next();
    } catch (error) {
        res.status(400).send("Access Denied");
    }
}