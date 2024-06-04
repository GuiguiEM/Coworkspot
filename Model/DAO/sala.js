/*********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistências e regra de negócio para os filmes
 * Data: 02/06/2024
 * Auto: Guilherme Abel
 * Versão 1.0
 ********************************************************************************************************/

// Import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// Instanciando a classe do prismaClient
const prisma = new PrismaClient();

/***************************************************************************************************************** */

const insertSala = async function(dadosSalas){
    
    try{

        let sql = `
        INSERT INTO tbl_sala(
            nome_sala,
            descricao,
            valor
        ) VALUES (
            '${dadosSalas.nome_sala}',
            '${dadosSalas.descricao}',
            '${dadosSalas.valor}'
        )`

        let rsSala = await prisma.$queryRawUnsafe(sql)

        if(rsSala){
            return true
        }else{
            return false
        }
    }catch(error){
        console.log(error)
        return false
    }
}

const updateSala = async function(id, dadosSalas){

    try{
        
        let sql = `
        UPDATE tbl_sala SET
        nome_sala = '${dadosSalas.nome_sala}',
        descricao = '${dadosSalas.descricao}',
        valor = '${dadosSalas.valor}'
        where id = ${id}`

        let rsSala = await prisma.$queryRawUnsafe(sql)

        if(rsSala){
            return true
        }else{
            return false
        }
    }catch(error){
        console.log(error)
        return false
    }
}

const deleteSala = async function(id){
    
    try{
        
        let sql = `DELETE FROM tbl_sala where id = ${id}`

        let rsSala = await prisma.$queryRawUnsafe(sql)

        return rsSala
    }catch(error){
        console.log(error)
        return false
    }
}

const selectAllSalas = async function(){

    let sql = `select * from tbl_sala`

    let rsSala = await prisma.$queryRawUnsafe(sql)

    if(rsSala.length > 0)
        return rsSala
    else
        return false
}

const selectByIdSala = async function(id){

    try{

        let sql = `select * from tbl_sala where id = ${id}`

        let rsSala = await prisma.$queryRawUnsafe(sql)

        return rsSala
    }catch(error){
        console.log(error)
        return false
    }
}

module.exports = {
    insertSala,
    updateSala,
    deleteSala,
    selectAllSalas,
    selectByIdSala
}