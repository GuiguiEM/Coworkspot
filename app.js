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

const controllerUsuarios = require('./Controller/controller_usuario')

/***************************************************************************************************************** */

app.get('/v2/coworkspot/getUsuario', cors(), async function(request, response, next){

    //Chama a função para retornar os dados de filme
    let dadosUsuarios = await controllerUsuarios.getListarUsuarios();

    // Validação para retornar os dados ou o erro e quando não houver dados
    if(dadosUsuarios){
        response.json(dadosUsuarios);
        response.status(200);
    } else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }
})

app.get('/v2/coworkspot/getUsuario/:id', cors(), async function(request, response, next){

    let idUsuario = request.params.id
    let dadosUsuarios = await controllerUsuarios.getBuscarUsuario(idUsuario)

    response.status(dadosUsuarios.status_code)
    response.json(dadosUsuarios)
})

app.post('/v2/coworkspot/postUsuario', cors(), async function(request, response, next){

    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let dadosUsuarios = await controllerUsuarios.setInserirUsuario(dadosBody, contentType)

    response.status(dadosUsuarios.status_code)
    response.json(dadosUsuarios)
})

/***************************************************************************************************************** */

app.listen('8080', function(){
    console.log('API FUNCIONANDO')
})

