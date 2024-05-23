/*********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistências e regra de negócio para os filmes
 * Data: 16/05/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/

// Import do arquivo de configuração do Projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados dos filmes
const usuarioDAO = require('../model/DAO/usuario')

/***************************************************************************************************************** */

const setInserirUsuario = async function(dadosUsuarios, content){
    
    try {
        if (String(content).toLowerCase() == 'application/json') {
    
            let statusValidate = false;
            let novoUsuarioJSON = {};
    
            // Função auxiliar para verificar se um campo está vazio
            const isEmpty = (field) => !field || field.trim() === '';
    
            // Verificar condições de nome, email e senha
            if (dadosUsuarios.nome == '' || dadosUsuarios.nome == undefined || dadosUsuarios.nome == null || dadosUsuarios.nome.length > 100 ||
                dadosUsuarios.email == '' || dadosUsuarios.email == undefined || dadosUsuarios.email == null || dadosUsuarios.email.length > 100 ||
                dadosUsuarios.senha == '' || dadosUsuarios.senha == undefined || dadosUsuarios.senha == null || dadosUsuarios.senha.length > 100
            ) {
                return message.ERROR_REQUIRED_FIELDS;
            }
    
            // Verificar condições específicas para CPF e CNPJ
            const cpfPreenchido = !isEmpty(dadosUsuarios.cpf);
            const cnpjPreenchido = !isEmpty(dadosUsuarios.cnpj);
    
            if ((cpfPreenchido && cnpjPreenchido) || (!cpfPreenchido && !cnpjPreenchido)) {
                return message.ERROR_REQUIRED_FIELDS;
            }
    
            // Verificar comprimento de CPF e CNPJ apenas se estiverem preenchidos
            if ((cpfPreenchido && dadosUsuarios.cpf.length > 14) || (cnpjPreenchido && dadosUsuarios.cnpj.length > 18)) {
                return message.ERROR_REQUIRED_FIELDS;
            }
    
            // Se passar todas as validações, continuar com o processamento
            statusValidate = true;
    
            if (statusValidate) {
                let novoUsuario = await usuarioDAO.insertUsuario(dadosUsuarios);
    
                if (novoUsuario) {
                    novoUsuarioJSON.usuario = dadosUsuarios;
                    novoUsuarioJSON.status = message.SUCCESS_CREATED_ITEM.status;
                    novoUsuarioJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                    novoUsuarioJSON.message = message.SUCCESS_CREATED_ITEM.message;
    
                    return novoUsuarioJSON;
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

const setAtualizarUsuario = async function(){
    
}

const setExcluirUsuario = async function(){
    
}

const getListarUsuarios = async function(){
    
    let usuarioJSON = {}
    let dadosUsuarios = await usuarioDAO.selectAllUsuarios()

    if(dadosUsuarios){
        usuarioJSON.usuarios = dadosUsuarios
        usuarioJSON.quantidade = dadosUsuarios.length
        usuarioJSON.status_code = 200

        return usuarioJSON
    }else{
        return false
    }
}

const getBuscarUsuario = async function(id){

    let idUsuario = id
    let usuarioJSON = {}

    if(idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)){
        return message.ERROR_INVALID_ID
    }else{

        let dadosUsuarios = await usuarioDAO.selectByIdUsuario(idUsuario)

        if(dadosUsuarios){
            if(dadosUsuarios.length > 0){
                usuarioJSON.usuario = dadosUsuarios
                usuarioJSON.status_code = 200

                return usuarioJSON
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setInserirUsuario,
    setAtualizarUsuario,
    setExcluirUsuario,
    getListarUsuarios,
    getBuscarUsuario
}

// try{

//     if(String(content).toLowerCase() == 'application/json'){

//         let statusValidate = false
//         let novoUsuarioJSON = {}

//         if (dadosUsuarios.nome == '' || dadosUsuarios.nome == undefined || dadosUsuarios.nome == null || dadosUsuarios.nome.length > 100 ||
//             dadosUsuarios.cpf == '' || dadosUsuarios.cpf == undefined || dadosUsuarios.cpf == null || dadosUsuarios.cpf.length > 14 ||
//             dadosUsuarios.cnpj == '' || dadosUsuarios.cnpj == undefined || dadosUsuarios.cnpj == null || dadosUsuarios.cnpj.length > 18 ||
//             dadosUsuarios.email == '' || dadosUsuarios.email == undefined || dadosUsuarios.email == null || dadosUsuarios.email.length > 100 ||
//             dadosUsuarios.senha == '' || dadosUsuarios.senha == undefined || dadosUsuarios.senha == null || dadosUsuarios.senha.length > 100 
//         ){
//             return message.ERROR_REQUIRED_FIELDS
//         }else{
//             statusValidate = true
//         }

//         if(statusValidate){

//             let novoUsuario = await usuarioDAO.insertUsuario(dadosUsuarios)

//             if(novoUsuario){
//                 novoUsuarioJSON.status = message.SUCCESS_CREATED_ITEM.status
//                 novoUsuarioJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
//                 novoUsuarioJSON.message = message.SUCCESS_CREATED_ITEM.message
//                 novoUsuarioJSON.usuario = dadosUsuarios

//                 return novoUsuarioJSON
//             }else{
//                 return message.ERROR_INTERNAL_SERVER_DB
//             }
//         }
//     }else{
//         return message.ERROR_CONTENT_TYPE
//     }
// }catch(error){
//     console.log(error)
//     return message.ERROR_INTERNAL_SERVER
// }