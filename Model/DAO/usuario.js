const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const selectAllUsuarios = async function(){

    let sql = 'select * from tbl_usuarios'

    let rsUsuario = await prisma.$queryRawUnsafe(sql)

    if(rsUsuario.length > 0)
        return rsUsuario
    else
        return false
}

module.exports = {
    selectAllUsuarios
}