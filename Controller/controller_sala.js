/*********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistências e regra de negócio para os filmes
 * Data: 02/06/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/

// Import do arquivo de configuração do Projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados dos filmes
const salaDAO = require('../Model/DAO/sala.js')

/***************************************************************************************************************** */

const setInserirSala = async function(dadosSalas, content){

    try{

        if(String(content).toLowerCase() == 'application/json'){

            let statusValidate = false
            let novaSalaJSON = {}

            if (dadosSalas.nome_sala == '' || dadosSalas.nome_sala == undefined || dadosSalas.nome_sala == null || dadosSalas.nome_sala.length > 50 ||
                dadosSalas.descricao == '' || dadosSalas.descricao == undefined || dadosSalas.descricao == null || dadosSalas.descricao > 2500 ||
                dadosSalas.valor.length > 5 || isNaN(dadosSalas.valor)
            ){
                return message.ERROR_REQUIRED_FIELDS
            }

            statusValidate = true

            if(statusValidate){
                let novaSala = await salaDAO.insertSala(dadosSalas)

                if(novaSala){
                    novaSalaJSON.sala = dadosSalas
                    novaSalaJSON.status = message.SUCCESS_CREATED_ITEM.status
                    novaSalaJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    novaSalaJSON.message = message.SUCCESS_CREATED_ITEM.message

                    return novaSalaJSON
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

const setAtualizarSala = async function(id, dadosSalas, content){

    try{

        if(String(content).toLowerCase() == 'application/json'){

            let statusValidate = false
            let salaAtualizadaJSON = {}

            if (dadosSalas.nome_sala == '' || dadosSalas.nome_sala == undefined || dadosSalas.nome_sala == null || dadosSalas.nome_sala.length > 50 ||
                dadosSalas.descricao == '' || dadosSalas.descricao == undefined || dadosSalas.descricao == null || dadosSalas.descricao > 2500 ||
                dadosSalas.valor.length > 5 || isNaN(dadosSalas.valor)
            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                statusValidate = true
            }

            if(statusValidate){
                let idSala = id
                let salaAtualizada = await salaDAO.updateSala(idSala, dadosSalas)

                if(salaAtualizada){
                    salaAtualizadaJSON.sala = dadosSalas
                    salaAtualizadaJSON.status = message.SUCCESS_UPDATED_ITEM.status
                    salaAtualizadaJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    salaAtualizadaJSON.message = message.SUCCESS_UPDATED_ITEM.message
                    salaAtualizadaJSON.idSalaAtualizada = idSala
                    
                    return salaAtualizadaJSON
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

const setExcluirSala = async function(id){

    try{

        let idSala = id
        let validaSala = await getBuscarSala(idSala)

        let dadosSalas = await salaDAO.deleteSala(idSala)

        if(idSala == '' || idSala == undefined || isNaN(idSala)){
            return message.ERROR_INVALID_ID

        }else if(validaSala.status == false){
            return message.ERROR_NOT_FOUND

        }else{
            if(dadosSalas)
                return message.SUCCESS_DELETED_ITEM
            else
                return message.ERROR_INTERNAL_SERVER_DB
        }
    }catch(error){
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}

const getListarSalas = async function(){

    let salaJSON = {}
    let dadosSalas = await salaDAO.selectAllSalas()

    if(dadosSalas){
        salaJSON.sala = dadosSalas
        salaJSON.quantidade = dadosSalas.length
        salaJSON.status_code = 200

        return salaJSON
    }else{
        return false
    }
}

const getBuscarSala = async function(id){

    let idSala = id
    let salaJSON = {}

    if(idSala == '' || idSala == undefined || isNaN(idSala)){
        return message.ERROR_INVALID_ID
    }else{

        let dadosSalas = await salaDAO.selectByIdSala(idSala)

        if(dadosSalas){
            if(dadosSalas.length > 0){
                salaJSON.sala = dadosSalas
                salaJSON.status_code = 200

                return salaJSON
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setInserirSala,
    setAtualizarSala,
    setExcluirSala,
    getListarSalas,
    getBuscarSala
}