/*********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistências e regra de negócio para os filmes
 * Data: 01/06/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/

// Import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// Instanciando a classe do prismaClient
const prisma = new PrismaClient();

/***************************************************************************************************************** */

const insertEmpresa = async function(dadosEmpresas){

    try{
        
        let sql = `
        INSERT INTO tbl_empresas(
            nome,
            email,
            cnpj,
            senha,
            telefone
        ) VALUES (
            '${dadosEmpresas.nome}',
            '${dadosEmpresas.email}',
            '${dadosEmpresas.cnpj}',
            '${dadosEmpresas.senha}',
            '${dadosEmpresas.telefone}'
        )`

        let rsEmpresa = await prisma.$queryRawUnsafe(sql)

        if(rsEmpresa){
            return true
        }else{
            return false
        }
    }catch(error){
        console.log(error)
        return false
    }
}

const updateEmpresa = async function(id, dadosEmpresas){

    try{

        let sql = `
            UPDATE tbl_empresas set
            nome = '${dadosEmpresas.nome}',
            email = '${dadosEmpresas.email}',
            cnpj = '${dadosEmpresas.cnpj}',
            senha = '${dadosEmpresas.senha}',
            telefone = '${dadosEmpresas.telefone}'
            where id = ${id}`

        let rsEmpresa = await prisma.$queryRawUnsafe(sql)

        if(rsEmpresa){
            return true
        }else{
            return false
        }
    }catch(error){
        console.log(error)
        return false
    }
}

const deleteEmpresa = async function(id){

    try{

        let sql = `delete from tbl_empresas where id = ${id}`

        let rsEmpresa = await prisma.$queryRawUnsafe(sql)

        return rsEmpresa
    }catch(error){
        console.log(error)
        return false
    }
}

const selectAllEmpresas = async function(){

    let sql = `select * from tbl_empresas`

    let rsEmpresa = await prisma.$queryRawUnsafe(sql)

    if(rsEmpresa.length > 0)
        return rsEmpresa
    else
        return false
}

const selectByIdEmpresa = async function(id){

    try{

        let sql = `select * from tbl_empresas where id = ${id}`

        let rsEmpresa = await prisma.$queryRawUnsafe(sql)

        return rsEmpresa
    }catch(error){
        console.log(error)
        return false
    }
}

module.exports = {
    insertEmpresa,
    updateEmpresa,
    deleteEmpresa,
    selectAllEmpresas,
    selectByIdEmpresa
}

