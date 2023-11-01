const express = require('express')
const {listarConsultas, criarConsulta, deletarConsulta, atualizarIntrutor, finalizarConsulta, listarLaudo, listarConsultaMedico} = require('./controladores/consultas')
const {verificarSenhaCnes} = require('./middlewares')
const rotas = express()


rotas.get('/consultas', verificarSenhaCnes, listarConsultas)
rotas.post('/consulta', criarConsulta)
rotas.delete('/consulta/:id', deletarConsulta)
rotas.put('/consulta/:identificadorConsulta/paciente', atualizarIntrutor)
rotas.post('/consulta/finalizar', finalizarConsulta)
rotas.get('/consulta/laudo', listarLaudo)
rotas.get('/consultas/medico', listarConsultaMedico)

module.exports = rotas