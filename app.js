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

const controllerUsuarios = require('./Controller/controller_usuario')

app.get('/v2/coworkspot/getUsuario', cors(), async function(request, response, next){

    //Chama a função para retornar os dados de filme
    let dadosUsuarios = await controllerUsuarios.getListarUsuario();

    // Validação para retornar os dados ou o erro e quando não houver dados
    if(dadosUsuarios){
        response.json(dadosUsuarios);
        response.status(200);
    } else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }
})