/*********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistências e regra de negócio para os filmes
 * Data: 16/05/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/

// Import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// Instanciando a classe do prismaClient
const prisma = new PrismaClient();

/***************************************************************************************************************** */

const insertUsuario = async function(dadosUsuarios){
    
    try{
        
        let sql

        sql = `insert into tbl_usuarios(
                                    nome,
                                    cpf,
                                    cnpj,
                                    email,
                                    senha
        )values(
                                    '${dadosUsuarios.nome}',
                                    '${dadosUsuarios.cpf}',
                                    '${dadosUsuarios.cnpj}',
                                    '${dadosUsuarios.email}',
                                    '${dadosUsuarios.senha}'
        )`

        let rsUsuario = await prisma.$queryRawUnsafe(sql)
        
        if(rsUsuario){
            return true
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

const updateUsuario = async function(){

}

const deleteUsuario = async function(){

}

const selectAllUsuarios = async function(){

    let sql = 'select * from tbl_usuarios'

    let rsUsuario = await prisma.$queryRawUnsafe(sql)

    if(rsUsuario.length > 0)
        return rsUsuario
    else
        return false
}

const selectByIdUsuario = async function(id){

    try{

        let sql = `select * from tbl_usuarios where id = ${id}`

        let rsUsuario = await prisma.$queryRawUnsafe(sql)

        return rsUsuario
    }catch(error){
        return false
    }
}

module.exports = {
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuarios,
    selectByIdUsuario
}