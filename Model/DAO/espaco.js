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

const insertEspaco = async function(dadosEspacos){

    try{

        let sql = `
        INSERT INTO tbl_espaco(
            nome_espaco,
            descricao,
            valor
        ) VALUES (
            '${dadosEspacos.nome_espaco}',
            '${dadosEspacos.descricao}',
            '${dadosEspacos.valor}'
        )`

        let rsEspaco = await prisma.$queryRawUnsafe(sql)

        if(rsEspaco){
            return true
        }else{
            return false
        }
    }catch(error){
        console.log(error)
        return false
    }
}

const updateEspaco = async function(id, dadosEspacos){

    try{

        let sql = `
        UPDATE tbl_espaco set
        nome_espaco = '${dadosEspacos.nome_espaco}',
        descricao = '${dadosEspacos.descricao}',
        valor = '${dadosEspacos.valor}'
        where id = ${id}`

        let rsEspaco = await prisma.$queryRawUnsafe(sql)

        if(rsEspaco){
            return true
        }else{
            return false
        }
    }catch(error){
        console.log(error)
        return false
    }
}

const deleteEspaco = async function(id){

    try{
        
        let sql = `DELETE FROM tbl_espaco where id = ${id}`

        let rsEspaco = await prisma.$queryRawUnsafe(sql)

        return rsEspaco
    }catch(error){
        console.log(error)
        return false
    }
}

const selectAllEspacos = async function(){

    let sql = `select * from tbl_espaco`

    let rsEspaco = await prisma.$queryRawUnsafe(sql)

    if(rsEspaco.length > 0)
        return rsEspaco
    else
        return false
}

const selectByIdEspaco = async function(id){

    try{

        let sql = `select * from tbl_espaco where id = ${id}`

        let rsEspaco = await prisma.$queryRawUnsafe(sql)

        return rsEspaco
    }catch(error){
        console.log(error)
        return false
    }
}

module.exports = {
    insertEspaco,
    updateEspaco,
    deleteEspaco,
    selectAllEspacos,
    selectByIdEspaco
}