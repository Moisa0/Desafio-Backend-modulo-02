const verificarSenhaCnes = (req, res, next)=>{
    if(req.query.cnes_consultorio!=="1001" || req.query.senha_consultorio!=="CubosHealth@2022"){
        return res.status(401).json({"mensagem": "Cnes ou senha inválidos!"})
    }
    next()
}

module.exports = {
    verificarSenhaCnes
}