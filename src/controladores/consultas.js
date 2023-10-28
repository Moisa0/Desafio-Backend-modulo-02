const {consultas, consultorio} = require('../bancodedados')

let idProximaConsulta = 1

const listarConsultas = (req,res)=>{
    if(consultas.length===0){
        return res.status(204).json(consultas) 
    }
    return res.status(200).json(consultas)
}

const criarConsulta = (req,res)=>{
    const {tipoConsulta, valorConsulta, paciente, nome, cpf, dataNascimento, celular, email, senha} = req.body

    
//BLOCOS AUXILIARES
    let cpfRepetido = false
    let emailRepetido = false
    let contemEspecialidade = false
    let idMedico = 0

    for(let i = 0; i < consultas.length; i++) {
        if(consultas[i].paciente.cpf === paciente.cpf){
            cpfRepetido = true
        }
    }

    for(let i = 0; i < consultas.length; i++) {
        if(consultas[i].paciente.email === paciente.email){
            emailRepetido = true
        }
    }

    for(let i = 0; i < consultorio.medicos.length; i++) {
        if(consultorio.medicos[i].especialidade === tipoConsulta){
            idMedico = consultorio.medicos[i].identificador
        }
    }

    for(let i = 0; i < consultorio.medicos.length; i++) {
        if(consultorio.medicos[i].especialidade === tipoConsulta){
            contemEspecialidade = true
        }
    }



//VERIFICAÇÕES DE CPF DO PACIENTE
    if(cpfRepetido){
        return res.status(400).json({mensagem: 'Já existe uma consulta em andamento com o CPF informado!'})
    }
     
    if(!paciente.cpf){
        return res.status(400).json({mensagem: 'Informe o CPF do paciente'})
    }

    if(isNaN(paciente.cpf) || paciente.cpf.length!==11){
        return res.status(400).json({mensagem: 'O CPF deve conter apenas numeros, totalizando 11'})
    }

//VERIFICAÇÕES DE EMAIL DO PACIENTE
    if(emailRepetido){
        return res.status(400).json({mensagem: 'Já existe uma consulta em andamento com o e-mail informado!'})
    }

    if(!paciente.email){
        return res.status(400).json({mensagem: 'Informe o email do paciente'})
    }

//VERIFICAÇÕES DE TIPO DE CONSULTA DO PACIENTE
    if(!contemEspecialidade){
        return res.status(400).json({mensagem: 'A clínica ainda não oferta esta especialidade'})
    }

    if(!tipoConsulta){
        return res.status(400).json({mensagem: 'Informe o tipo da consulta'})
    }

//VERIFICAÇÕES DE VALORES DE CONSULTA DO PACIENTE
    if(!valorConsulta){
        return res.status(400).json({mensagem: 'Informe o valor da consulta'})
    }

    if(isNaN(valorConsulta)){
        return res.status(400).json({mensagem: 'O valor informado não é um numero'})
    }

//VERIFICAÇÕES DE NOME DO PACIENTE
    if(!paciente.nome){
        return res.status(400).json({mensagem: 'Informe o nome do paciente'})
    }

//VERIFICAÇÕES DE DATA DE NASCIMENTO DO PACIENTE 
    if(!paciente.dataNascimento){
        return res.status(400).json({mensagem: 'Informe a data de nascimento do paciente'})
    }

//VERIFICAÇÕES DE NUMERO DE CELULAR DO PACIENTE
    if(!paciente.celular){
        return res.status(400).json({mensagem: 'Informe o numero de celular do paciente'})
    }

    if(isNaN(paciente.celular)){
        return res.status(400).json({mensagem: 'O numero de celular deve conter apenas números'})
    }

//VERIFICAÇÕES DE SENHA DO PACIENTE
    if(!paciente.senha){
        return res.status(400).json({mensagem: 'Informe a senha do paciente'})
    }

    const novaConsulta = {
        identificador: idProximaConsulta,//o identificador não está somando quando criamos outro
        tipoConsulta,
        identificadorMedico:idMedico,
        finalizada:false,
        valorConsulta,
        paciente:{
            nome:paciente.nome,
            cpf:paciente.cpf,
            dataNascimento:paciente.dataNascimento,
            celular:paciente.celular,
            email:paciente.email,
            senha:paciente.senha
        }
    }
  
       consultas.push(novaConsulta)
       idProximaConsulta++
       console.log(novaConsulta)
       
        return res.status(201).send() 
}

const deletarConsulta = (req, res)=>{
    let booleanDeConfirmação = -1
    for(let i = 0; i < consultas.length; i++) {
        if(consultas[i].identificador === Number(req.params.id)){
            booleanDeConfirmação = i
        }
    }
    console.log(booleanDeConfirmação)
    if(booleanDeConfirmação===-1){
        return res.status(404).json({mensagem:"A consulta a ser removida não está presente na lista ou já foi finalizada"})
    }

    consultas.splice(booleanDeConfirmação, 1)

    return res.status(204).json(consultas)
}

module.exports= {
    listarConsultas,
    criarConsulta,
    deletarConsulta
}