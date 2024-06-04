/*********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistências e regra de negócio para os filmes
 * Data: 01/06/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/

// Import do arquivo de configuração do Projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados dos filmes
const espacoDAO = require('../Model/DAO/espaco.js')

/***************************************************************************************************************** */

const setinserirEspaco = async function(dadosEspacos, content){

    try{

        if(String(content).toLowerCase() == 'application/json'){

            let statusValidate = false
            let novoEspacoJSON = {}

            if (dadosEspacos.nome_espaco == '' || dadosEspacos.nome_espaco == undefined || dadosEspacos.nome_espaco == null || dadosEspacos.nome_espaco.length > 50 ||
                dadosEspacos.descricao == '' || dadosEspacos.descricao == undefined || dadosEspacos.descricao == null || dadosEspacos.descricao > 2500 ||
                dadosEspacos.valor.length > 5 || isNaN(dadosEspacos.valor)
            ){
                return message.ERROR_REQUIRED_FIELDS
            }

            statusValidate = true

            if(statusValidate){
                let novoEspaco = await espacoDAO.insertEspaco(dadosEspacos)

                if(novoEspaco){
                    novoEspacoJSON.espaco = dadosEspacos
                    novoEspacoJSON.status = message.SUCCESS_CREATED_ITEM.status
                    novoEspacoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    novoEspacoJSON.message = message.SUCCESS_CREATED_ITEM.message

                    return novoEspacoJSON
                }else{
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    }catch(error){
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarEspaco = async function(id, dadosEspacos, content){

    try{

        if(String(content).toLowerCase() == 'application/json'){

            let statusValidate = false
            let espacoAtualizadoJSON = {}

            if (dadosEspacos.nome_espaco == '' || dadosEspacos.nome_espaco == undefined || dadosEspacos.nome_espaco == null || dadosEspacos.nome_espaco.length > 50 ||
                dadosEspacos.descricao == '' || dadosEspacos.descricao == undefined || dadosEspacos.descricao == null || dadosEspacos.descricao > 2500 ||
                dadosEspacos.valor.length > 5 || isNaN(dadosEspacos.valor)
            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                statusValidate = true
            }

            if(statusValidate){
                let idEspaco = id
                let espacoAtualizado = await espacoDAO.updateEspaco(idEspaco, dadosEspacos)

                if(espacoAtualizado){
                    espacoAtualizadoJSON.espaco = dadosEspacos
                    espacoAtualizadoJSON.status = message.SUCCESS_UPDATED_ITEM.status
                    espacoAtualizadoJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    espacoAtualizadoJSON.message = message.SUCCESS_UPDATED_ITEM.message
                    espacoAtualizadoJSON.idEspacoAtualizado = idEspaco

                    return espacoAtualizadoJSON
                }else{
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    }catch(error){
        console.log(error)
        return false
    }
}

const setExcluirEspaco = async function(id){

    try{

        let idEspaco = id

        let validaEspaco = await getBuscarEspaco(idEspaco)

        let dadosEspacos = await espacoDAO.deleteEspaco(idEspaco)

        if(idEspaco == '' || idEspaco == undefined || isNaN(idEspaco)){
            return message.ERROR_INVALID_ID

        }else if(validaEspaco.status == false){
            return message.ERROR_NOT_FOUND

        }else{
            if(dadosEspacos)
                return message.SUCCESS_DELETED_ITEM
            else
                return message.ERROR_INTERNAL_SERVER_DB
        }
    }catch(error){
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}

const getListarEspacos = async function(){

    let espacoJSON = {}
    let dadosEspacos = await espacoDAO.selectAllEspacos()

    if(dadosEspacos){
        espacoJSON.espacos = dadosEspacos
        espacoJSON.quantidade = dadosEspacos.length
        espacoJSON.status_code = 200

        return espacoJSON
    }else{
        return false
    }
}

const getBuscarEspaco = async function(id){

    let idEspaco = id
    let espacoJSON = {}

    if(idEspaco == '' || idEspaco == undefined || isNaN(idEspaco)){
        return message.ERROR_INVALID_ID
    }else{

        let dadosEspacos = await espacoDAO.selectByIdEspaco(idEspaco)

        if(dadosEspacos){
            if(dadosEspacos.length > 0){
                espacoJSON.espaco = dadosEspacos
                espacoJSON.status_code = 200

                return espacoJSON
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setinserirEspaco,
    setAtualizarEspaco,
    setExcluirEspaco,
    getListarEspacos,
    getBuscarEspaco
}