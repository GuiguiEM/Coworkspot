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

const insertMembro = async function(dadosMembros) {

    try {
        let sql = `
            INSERT INTO tbl_membros(
                nome,
                email,
                cpf,
                senha,
                telefone
            ) VALUES (
                '${dadosMembros.nome}',
                '${dadosMembros.email}',
                '${dadosMembros.cpf}',
                '${dadosMembros.senha}',
                '${dadosMembros.telefone}'
            )`

        let rsMembro = await prisma.$queryRawUnsafe(sql);
        
        if (rsMembro) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

const updateMembro = async function(id, dadosMembros){

    try {

        let sql = `
            UPDATE tbl_membros set
            nome = '${dadosMembros.nome}',
            email = '${dadosMembros.email}',
            cpf = '${dadosMembros.cpf}',
            senha = '${dadosMembros.senha}',
            telefone = '${dadosMembros.telefone}'
            where id = ${id}`

        let rsMembro = await prisma.$queryRawUnsafe(sql);
        
        if (rsMembro) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

const deleteMembro = async function(id){

    try{

        let sql = `delete from tbl_membros where id = ${id}`

        let rsMembro = await prisma.$queryRawUnsafe(sql)

        return rsMembro
    
    }catch(error){
        return false
    }
}

const selectAllMembros = async function(){

    let sql = `select * from tbl_membros`

    let rsMembro = await prisma.$queryRawUnsafe(sql)

    if(rsMembro.length > 0)
        return rsMembro
    else
        return false
}

const selectByIdMembro = async function(id){

    try{

        let sql = `select * from tbl_membros where id = ${id}`

        let rsMembro = await prisma.$queryRawUnsafe(sql)

        return rsMembro
    }catch(error){
        return false
    }
}

module.exports = {
    insertMembro,
    updateMembro,
    deleteMembro,
    selectAllMembros,
    selectByIdMembro
}