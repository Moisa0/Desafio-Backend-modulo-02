const express = require('express')
const {listarConsultas, criarConsulta, deletarConsulta} = require('./controladores/consultas')
const {verificarSenhaCnes} = require('./middlewares')
const rotas = express()


rotas.get('/consultas', verificarSenhaCnes, listarConsultas)
rotas.post('/consulta', criarConsulta)
rotas.delete('/consulta/:id', deletarConsulta)

module.exports = rotas