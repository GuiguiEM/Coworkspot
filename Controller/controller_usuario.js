const message = require('../modulo/config.js')

const usuarioDAO = require('../model/DAO/usuario')

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