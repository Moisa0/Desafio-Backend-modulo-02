const { identificadorConsultas } = require('../../../desafio outra pessoa/desafio-backend-modulo-02-alternativo-b2b-ifood-t11/src/bancodedados')
const {consultas, consultorio, consultasFinalizadas, laudos} = require('../bancodedados')

let idProximaConsulta = 1
let idDoLaudo = 1
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
        if(consultas[i].paciente.cpf === paciente.cpf && consultas[i].finalizada===false){
            cpfRepetido = true
            
        }
        
    }


    for(let i = 0; i < consultas.length; i++) {
        if(consultas[i].paciente.email === paciente.email && consultas[i].finalizada===false){
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
       
       
        return res.status(201).send() 
}

const deletarConsulta = (req, res)=>{
    let indiceDeConfirmação = -1
    for(let i = 0; i < consultas.length; i++) {
        if(consultas[i].identificador === Number(req.params.id)){
            indiceDeConfirmação = i
        }
    }
    
    if(consultas.length===0){
        return res.status(204).json(consultas) 
    }

    if(indiceDeConfirmação===-1 || consultas.finalizada===true){
        return res.status(404).json({mensagem:"A consulta a ser removida não está presente na lista ou já foi finalizada"})
    }

    consultas.splice(indiceDeConfirmação, 1)

    return res.status(204).json(consultas)
}

const atualizarIntrutor = (req,res)=>{
    const {nome, cpf, dataNascimento, celular, email, senha} = req.body

    let cpfRepetido = false
    let emailRepetido = false
    

    for(let i = 0; i < consultas.length; i++) {
        if(consultas[i].paciente.cpf === cpf){
            cpfRepetido = true
        }
    }

    for(let i = 0; i < consultas.length; i++) {
        if(consultas[i].paciente.email === email){
            emailRepetido = true
        }
    }

    if(cpfRepetido){
        return res.status(400).json({mensagem: 'Já existe uma consulta em andamento com o CPF informado!'})
    }
    
    if(isNaN(cpf) || cpf.length!==11){
        return res.status(400).json({mensagem: 'O CPF deve conter apenas numeros, totalizando 11'})
    }
    if(emailRepetido){
        return res.status(400).json({mensagem: 'Já existe uma consulta em andamento com o e-mail informado!'})
    }

    if(!cpf){
        return res.status(400).json({mensagem: 'Informe o CPF do paciente'})
    }

    if(!nome){
        return res.status(400).json({mensagem: 'Informe o nome do paciente'})
    }

    if(!dataNascimento){
        return res.status(400).json({mensagem: 'Informe a data de nascimento do paciente'})
    }

    if(!celular){
         return res.status(400).json({mensagem: 'Informe o numero de celular do paciente'})
    }

    if(!senha){
        return res.status(400).json({mensagem: 'Informe a senha do paciente'})
    }

    if(!email){
        return res.status(400).json({mensagem: 'Informe o email do paciente'})
    }
    let idPaciente = -2
    for(let i = 0; i < consultas.length; i++) {
        if(consultas[i].identificador === identificadorConsultas){
            idPaciente = consultas[i]
        }
    }
    if(idPaciente===-2){
        return res.status(404).json({mensagem:"O identificador não existe"})
    }

    if(idPaciente.finalizada===true){
        return res.status(404).json({mensagem:"A consulta já foi finalizada"})
    }

    

    idPaciente.paciente.nome= nome
    idPaciente.paciente.cpf= cpf
    idPaciente.paciente.dataNascimento= dataNascimento
    idPaciente.paciente.celular= celular
    idPaciente.paciente.email= email
    idPaciente.paciente.senha= senha

    return res.status(204).json(idPaciente)
}

const finalizarConsulta = (req,res)=>{
    const {identificadorConsulta, textoMedico} = req.body

    let consultaParaFinalizar = -2
    
    

    for(let i = 0; i < consultas.length; i++) {
        if(consultas[i].identificador === identificadorConsulta){
            consultaParaFinalizar = consultas[i]
        }
    }
    if(consultaParaFinalizar && consultaParaFinalizar.finalizada===true){
        return res.status(400).json({mensagem: 'A consulta não existe ou já foi finalizada'})
    }

    if(consultaParaFinalizar===-2){
        return res.status(404).json({mensagem: 'O identificador não existe! Informe um válido.'})
    }
    
    if(textoMedico.length<=0 || textoMedico.length>200){
        return res.status(400).json({mensagem: "O tamanho do textoMedico não está dentro do esperado"})
    }
    

    consultaParaFinalizar.finalizada= true
    consultaParaFinalizar.identificadorLaudo= idDoLaudo
    
    
    const novoLaudo = {
        identificador: idDoLaudo,
        identificadorConsulta:consultaParaFinalizar.identificador,
        textoMedico,
        identificadorMedico:consultaParaFinalizar.identificadorMedico,
        paciente:{
            nome:consultaParaFinalizar.paciente.nome,
            cpf:consultaParaFinalizar.paciente.cpf,
            dataNascimento:consultaParaFinalizar.paciente.dataNascimento,
            celular:consultaParaFinalizar.paciente.celular,
            email:consultaParaFinalizar.paciente.email,
            senha:consultaParaFinalizar.paciente.senha
        }
    }
    laudos.push(novoLaudo)
    consultasFinalizadas.push(consultaParaFinalizar)
    idDoLaudo++
    

    return res.status(204).json(consultaParaFinalizar)
}


const listarLaudo = (req,res)=>{
    const {identificador_consulta, senha}= req.query
    let laudoParaListar= 0

    for(let i = 0; i < laudos.length; i++) {
        if(laudos[i].identificadorConsulta === Number(identificador_consulta)){
            laudoParaListar = laudos[i]
        }
    }
    
    if(laudoParaListar===0){
        return res.status(404).json({mensagem: 'Consulta médica não encontrada!'})
    }

if(senha!==laudoParaListar.paciente.senha){
    return res.status(401).json({mensagem:"A consulta existe, mas a senha está incorreta"})
    }

    return res.status(200).json(laudoParaListar)

}


const listarConsultaMedico = (req, res)=>{
    const {identificador_medico}= req.query
    let verificacaoBaseDeMedicos=-1
    let consultasDoMedico = []

    if(!identificador_medico){
        return res.status(404).json({mensagem:"Informe o identificador do médico"})
    }

    for(let i = 0; i < consultorio.medicos.length; i++) {
        if(consultorio.medicos[i].identificador === Number(identificador_medico)){
            verificacaoBaseDeMedicos=consultorio.medicos[i]

        }
    }
    if(verificacaoBaseDeMedicos===-1){
        return res.status(404).json({mensagem:"O médico informado não existe na base!"})
    }

    for(let i = 0; i < consultasFinalizadas.length; i++) {
        if(consultasFinalizadas[i].identificadorMedico === Number(identificador_medico)){
            consultasDoMedico.push(consultasFinalizadas[i])
        }
    }
    if(consultasDoMedico.length===0){
        res.status(204).json(consultasDoMedico)
    }

    res.status(200).send(consultasDoMedico)


}

module.exports= {
    listarConsultas,
    criarConsulta,
    deletarConsulta,
    atualizarIntrutor,
    finalizarConsulta,
    listarLaudo,
    listarConsultaMedico
}