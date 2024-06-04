/*********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistências e regra de negócio para os filmes
 * Data: 16/05/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/

// Import do arquivo de configuração do Projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados dos filmes
const membroDAO = require('../Model/DAO/membro.js')

/***************************************************************************************************************** */

const setInserirMembro = async function(dadosMembros, content){
    
    try {
        if (String(content).toLowerCase() == 'application/json') {
    
            let statusValidate = false;
            let novoMembroJSON = {};
    
            // Verificar condições de nome, email e senha
            if (dadosMembros.nome == '' || dadosMembros.nome == undefined || dadosMembros.nome == null || dadosMembros.nome.length > 100 ||
                dadosMembros.email == '' || dadosMembros.email == undefined || dadosMembros.email == null || dadosMembros.email.length > 100 ||
                dadosMembros.cpf == '' || dadosMembros.cpf == undefined || dadosMembros.cpf == null || dadosMembros.cpf.length > 14 ||
                dadosMembros.senha == '' || dadosMembros.senha == undefined || dadosMembros.senha == null || dadosMembros.senha.length > 100 ||
                dadosMembros.telefone == '' || dadosMembros.telefone == undefined || dadosMembros.telefone == null || dadosMembros.telefone.length > 13
            ) {
                return message.ERROR_REQUIRED_FIELDS;
            }
    
            // Se passar todas as validações, continuar com o processamento
            statusValidate = true;
    
            if (statusValidate) {
                let novoMembro = await membroDAO.insertMembro(dadosMembros);
    
                if (novoMembro) {
                    novoMembroJSON.Membro = dadosMembros;
                    novoMembroJSON.status = message.SUCCESS_CREATED_ITEM.status;
                    novoMembroJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                    novoMembroJSON.message = message.SUCCESS_CREATED_ITEM.message;
    
                    return novoMembroJSON;
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB;
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
}

const setAtualizarMembro = async function(id, dadosMembros, content){

    try{

        if(String(content).toLowerCase() == 'application/json'){

            let statusValidate = false
            let membroAtualizadoJSON = {}

            if (dadosMembros.nome == '' || dadosMembros.nome == undefined || dadosMembros.nome == null || dadosMembros.nome.length > 100 ||
                dadosMembros.email == '' || dadosMembros.email == undefined || dadosMembros.email == null || dadosMembros.email.length > 100 ||
                dadosMembros.cpf == '' || dadosMembros.cpf == undefined || dadosMembros.cpf == null || dadosMembros.cpf.length > 14 ||
                dadosMembros.senha == '' || dadosMembros.senha == undefined || dadosMembros.senha == null || dadosMembros.senha.length > 100 ||
                dadosMembros.telefone == '' || dadosMembros.telefone == undefined || dadosMembros.telefone == null || dadosMembros.telefone.length > 13
            ) {
                return message.ERROR_REQUIRED_FIELDS;
            }else{
                statusValidate = true
            }

            if(statusValidate){

                let idMembro = id
                let membroAtualizado = await membroDAO.updateMembro(idMembro, dadosMembros)

                if(membroAtualizado){
                    membroAtualizadoJSON.Membro = dadosMembros
                    membroAtualizadoJSON.status = message.SUCCESS_UPDATED_ITEM.status
                    membroAtualizadoJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    membroAtualizadoJSON.message = message.SUCCESS_UPDATED_ITEM.message
                    membroAtualizadoJSON.idMembroAtualizado = idMembro

                    return membroAtualizadoJSON
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

const setExcluirMembro = async function(id){
    
    try{

        let idMembro = id

        let validaMembro = await getBuscarMembro(idMembro)

        let dadosMembros = await membroDAO.deleteMembro(idMembro)

        if(idMembro == '' || idMembro == undefined || isNaN(idMembro)){
            return message.ERROR_INVALID_ID

        }else if(validaMembro.status == false){
            return message.ERROR_NOT_FOUND

        }else{
            if(dadosMembros)
                return message.SUCCESS_DELETED_ITEM
            else
                return message.ERROR_INTERNAL_SERVER_DB
        }
    }catch(error){
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}

const getListarMembros = async function(){
    
    let membroJSON = {}
    let dadosMembros = await membroDAO.selectAllMembros()

    if(dadosMembros){
        membroJSON.membros = dadosMembros
        membroJSON.quantidade = dadosMembros.length
        membroJSON.status_code = 200

        return membroJSON
    }else{
        return false
    }
}

const getBuscarMembro = async function(id){

    let idMembro = id
    let membroJSON = {}

    if(idMembro == '' || idMembro == undefined || isNaN(idMembro)){
        return message.ERROR_INVALID_ID
    }else{

        let dadosMembros = await membroDAO.selectByIdMembro(idMembro)

        if(dadosMembros){
            if(dadosMembros.length > 0){
                membroJSON.membro = dadosMembros
                membroJSON.status_code = 200

                return membroJSON
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setInserirMembro,
    setAtualizarMembro,
    setExcluirMembro,
    getListarMembros,
    getBuscarMembro
}