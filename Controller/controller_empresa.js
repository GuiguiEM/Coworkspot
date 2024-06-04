/*********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistências e regra de negócio para os filmes
 * Data: 01/06/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/

// Import do arquivo de configuração do Projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados dos filmes
const empresaDAO = require('../Model/DAO/empresa.js')

/***************************************************************************************************************** */

const setInserirEmpresa = async function(dadosEmpresas, content){

    try{

        if (String(content).toLowerCase() == 'application/json') {

            let statusValidate = false
            let novaEmpresaJSON = {}

            if (dadosEmpresas.nome == '' || dadosEmpresas.nome == undefined || dadosEmpresas.nome == null || dadosEmpresas.nome.length > 100 ||
                dadosEmpresas.email == '' || dadosEmpresas.email == undefined || dadosEmpresas.email == null || dadosEmpresas.email.length > 100 ||
                dadosEmpresas.cnpj == '' || dadosEmpresas.cnpj == undefined || dadosEmpresas.cnpj == null || dadosEmpresas.cnpj.length > 18 ||
                dadosEmpresas.senha == '' || dadosEmpresas.senha == undefined || dadosEmpresas.senha == null || dadosEmpresas.senha.length > 100 ||
                dadosEmpresas.telefone == '' || dadosEmpresas.telefone == undefined || dadosEmpresas.telefone == null || dadosEmpresas.telefone.length > 13
            ) {
                return message.ERROR_REQUIRED_FIELDS;
            }

            statusValidate = true

            if(statusValidate){
                let novaEmpresa = await empresaDAO.insertEmpresa(dadosEmpresas)

                if(novaEmpresa){
                    novaEmpresaJSON.empresa = dadosEmpresas
                    novaEmpresaJSON.status = message.SUCCESS_CREATED_ITEM.status
                    novaEmpresaJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    novaEmpresaJSON.message = message.SUCCESS_CREATED_ITEM.message

                    return novaEmpresaJSON
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

const setAtuliazarEmpresa = async function(id, dadosEmpresas, content){

    try{

        if(String(content).toLowerCase() == 'application/json'){

            let statusValidate = false
            let empresaAtualizadaJSON = {}

            if (dadosEmpresas.nome == '' || dadosEmpresas.nome == undefined || dadosEmpresas.nome == null || dadosEmpresas.nome.length > 100 ||
                dadosEmpresas.email == '' || dadosEmpresas.email == undefined || dadosEmpresas.email == null || dadosEmpresas.email.length > 100 ||
                dadosEmpresas.cnpj == '' || dadosEmpresas.cnpj == undefined || dadosEmpresas.cnpj == null || dadosEmpresas.cnpj.length > 18 ||
                dadosEmpresas.senha == '' || dadosEmpresas.senha == undefined || dadosEmpresas.senha == null || dadosEmpresas.senha.length > 100 ||
                dadosEmpresas.telefone == '' || dadosEmpresas.telefone == undefined || dadosEmpresas.telefone == null || dadosEmpresas.telefone.length > 13
            ){
                return message.ERROR_REQUIRED_FIELDS;
            }else{
                statusValidate = true
            }

            if(statusValidate){
                let idEmpresa = id
                let empresaAtualizada = await empresaDAO.updateEmpresa(idEmpresa, dadosEmpresas)

                if(empresaAtualizada){
                    empresaAtualizadaJSON.empresa = dadosEmpresas
                    empresaAtualizadaJSON.status = message.SUCCESS_UPDATED_ITEM.status
                    empresaAtualizadaJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    empresaAtualizadaJSON.message = message.SUCCESS_UPDATED_ITEM.message
                    empresaAtualizadaJSON.idEmpresaAtualizada = idEmpresa

                    return empresaAtualizadaJSON
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

const setExcluirEmpresa = async function(id){

    try{

        let idEmpresa = id

        let validaEmpresa = await getBuscarEmpresa(idEmpresa)

        let dadosEmpresas = await empresaDAO.deleteEmpresa(idEmpresa)

        if(idEmpresa == '' || idEmpresa == undefined || isNaN(idEmpresa)){
            return message.ERROR_INVALID_ID

        }else if(validaEmpresa.status == false){
            return message.ERROR_NOT_FOUND

        }else{
            if(dadosEmpresas)
                return message.SUCCESS_DELETED_ITEM
            else
                return message.ERROR_INTERNAL_SERVER_DB
        }
    }catch(error){
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}

const getListarEmpresas = async function(){

    let empresaJSON = {}
    let dadosEmpresas = await empresaDAO.selectAllEmpresas()

    if(dadosEmpresas){
        empresaJSON.empresas = dadosEmpresas
        empresaJSON.quantidade = dadosEmpresas.length
        empresaJSON.status_code = 200

        return empresaJSON
    }else{
        return false 
    }
}

const getBuscarEmpresa = async function(id){

    let idEmpresa = id
    let empresaJSON = {}

    if(idEmpresa == '' || idEmpresa == undefined || isNaN(idEmpresa)){
        return message.ERROR_INVALID_ID
    }else{

        let dadosEmpresas = await empresaDAO.selectByIdEmpresa(idEmpresa)

        if(dadosEmpresas){
            if(dadosEmpresas.length > 0){
                empresaJSON.empresa = dadosEmpresas
                empresaJSON.status_code = 200

                return empresaJSON
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setInserirEmpresa,
    setAtuliazarEmpresa,
    setExcluirEmpresa,
    getListarEmpresas,
    getBuscarEmpresa
}