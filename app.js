/*********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistências e regra de negócio para os filmes
 * Data: 30/01/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/

/**********************************************
 * Para realizar a conexão com o Banco de Dados precisamos de uma biblioteca:
 * 
 *    - SEQUELIZE ORM (Biblioteca mais antiga)
 *    - PRISMA    ORM (Biblioteca mais atual)
 *    - FASTFY    ORM (Biblioteca mais atual)
 * 
 * Intalação do PRISMA ORM
 *      npm install 
 * 
 * Prisma - Para utilizar o prisma é necessário os comandos abaixos
 *     npm install prisma --save
 *     npm install @prisma/client --save
 *     
 * Para inicializar o prisma:
 *     npx prisma init
 * 
 *******************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors)
    next()

});

//Cria um objeto para definir o tipo de dados que irá chegar no BODY (JSON)
const bodyParserJSON = bodyParser.json();

/******************************************** Import dos arquivos internos do projeto ******************************/

const controllerMembros = require('./Controller/controller_membro')
const controllerEmpresas = require('./Controller/controller_empresa')
const controllerEspacos = require('./Controller/controller_espaco')
const contrlollerSalas = require('./Controller/controller_sala')

/***************************************************************************************************************** */

app.get('/v2/coworkspot/getMembro', cors(), async function(request, response, next){

    //Chama a função para retornar os dados de filme
    let dadosMembros = await controllerMembros.getListarMembros();

    // Validação para retornar os dados ou o erro e quando não houver dados
    if(dadosMembros){
        response.json(dadosMembros);
        response.status(200);
    } else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }
})

app.get('/v2/coworkspot/getMembro/:id', cors(), async function(request, response, next){

    let idMembro = request.params.id
    let dadosMembros = await controllerMembros.getBuscarMembro(idMembro)

    response.status(dadosMembros.status_code)
    response.json(dadosMembros)
})

app.post('/v2/coworkspot/postMembro', cors(), bodyParser.json(), async function(request, response, next){

    let contentType = request.headers['content-type']
    let dadosBody = await request.body

    let dadosMembros = await controllerMembros.setInserirMembro(dadosBody, contentType)

    response.status(dadosMembros.status_code)
    response.json(dadosMembros)
})

app.put('/v2/coworkspot/putMembro/:id', cors(), bodyParser.json(), async function(request, response, next){

    const id = request.params.id

    let contentType = request.headers['content-type']
    let novosDados = request.body

    let result = await controllerMembros.setAtualizarMembro(id, novosDados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.delete('/v2/coworkspot/deleteMembro/:id', cors(), async function(request, response, next){

    let idMembro = request.params.id
    let dadosMembros = await controllerMembros.setExcluirMembro(idMembro)

    response.status(dadosMembros.status_code)
    response.json(dadosMembros)
})

/***************************************************************************************************************** */

app.get('/v2/coworkspot/getEmpresa', cors(), async function(request, response, next){

    let dadosEmpresas = await controllerEmpresas.getListarEmpresas()

    if(dadosEmpresas){
        response.json(dadosEmpresas)
        response.status(200)
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }
})

app.get('/v2/coworkspot/getEmpresa/:id', cors(), async function(request, response, next){

    let idEmpresa = request.params.id
    let dadosEmpresas = await controllerEmpresas.getBuscarEmpresa(idEmpresa)

    response.status(dadosEmpresas.status_code)
    response.json(dadosEmpresas)
})

app.post('/v2/coworkspot/postEmpresa', cors(), bodyParser.json(), async function(request, response, next){

    const contentType = request.headers['content-type']
    let dadosBody = await request.body

    let dadosEmpresas = await controllerEmpresas.setInserirEmpresa(dadosBody, contentType)

    response.status(dadosEmpresas.status_code)
    response.json(dadosEmpresas)
})

app.put('/v2/coworkspot/putEmpresa/:id', cors(), bodyParser.json(), async function(request, response, next){

    const id = request.params.id

    let contentType = request.headers['content-type']
    let novosDados = request.body

    let result = await controllerEmpresas.setAtuliazarEmpresa(id, novosDados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.delete('/v2/coworkspot/deleteEmpresa/:id', cors(), async function(request, response, next){

    let idEmpresa = request.params.id
    let dadosEmpresas = await controllerEmpresas.setExcluirEmpresa(idEmpresa)

    response.status(dadosEmpresas.status_code)
    response.json(dadosEmpresas)
})

/***************************************************************************************************************** */

app.get('/v2/coworkspot/getEspaco', cors(), async function(request, response, next){

    let dadosEspacos = await controllerEspacos.getListarEspacos()

    if(dadosEspacos){
        response.json(dadosEspacos)
        response.status(200)
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }
})

app.get('/v2/coworkspot/getEspaco/:id', cors(), async function(request, response, next){

    let idEspaco = request.params.id
    let dadosEspacos = await controllerEspacos.getBuscarEspaco(idEspaco)

    response.status(dadosEspacos.status_code)
    response.json(dadosEspacos)
})

app.post('/v2/coworkspot/postEspaco', cors(), bodyParser.json(), async function(request, response, next){

    let contentType = request.headers['content-type']
    let dadosBody = await request.body

    let dadosEspacos = await controllerEspacos.setinserirEspaco(dadosBody, contentType)

    response.status(dadosEspacos.status_code)
    response.json(dadosEspacos)
})

app.put('/v2/coworkspot/putEspaco/:id', cors(), bodyParser.json(), async function(request, response, next){

    const id = request.params.id

    let contentType = request.headers['content-type']
    let novosDados = request.body

    let result = await controllerEspacos.setAtualizarEspaco(id, novosDados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.delete('/v2/coworkspot/deleteEspaco/:id', cors(), async function(request, response, next){

    let idEspaco = request.params.id
    let dadosEspacos = await controllerEspacos.setExcluirEspaco(idEspaco)

    response.status(dadosEspacos.status_code)
    response.json(dadosEspacos)
})

/***************************************************************************************************************** */

app.get('/v2/coworkspot/getSala', cors(), async function(request, response, next){

    let dadosSalas = await contrlollerSalas.getListarSalas()

    if(dadosSalas){
        response.json(dadosSalas)
        response.status(200)
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }
})

app.get('/v2/coworkspot/getSala/:id', cors(), async function(request, response, next){

    let idSala = request.params.id
    let dadosSalas = await contrlollerSalas.getBuscarSala(idSala)

    response.status(dadosSalas.status_code)
    response.json(dadosSalas)
})

app.post('/v2/coworkspot/postSala', cors(), bodyParser.json(), async function(request, response, next){

    let contentType = request.headers['content-type']
    let dadosBody = await request.body

    let dadosSalas = await contrlollerSalas.setInserirSala(dadosBody, contentType)

    response.status(dadosSalas.status_code)
    response.json(dadosSalas)
})

app.put('/v2/coworkspot/putSala/:id', cors(), bodyParser.json(), async function(request, response, next){

    const id = request.params.id

    let contentType = request.headers['content-type']
    let novosDados = request.body

    let result = await contrlollerSalas.setAtualizarSala(id, novosDados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.delete('/v2/coworkspot/deleteSala/:id', cors(), async function(request, response, next){

    let idSala = request.params.id
    let dadosSalas = await contrlollerSalas.setExcluirSala(idSala)

    response.status(dadosSalas.status_code)
    response.json(dadosSalas)
})

/***************************************************************************************************************** */

app.listen('8080', function(){
    console.log('API FUNCIONANDO')
})

