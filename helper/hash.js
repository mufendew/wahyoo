const bcrypt = require('bcrypt')

const hash = (password) =>{
    if (!password) {
        return null
    }
    return bcrypt.hashSync(password,10)
}

const compare = (password="", hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
}

module.exports = {hash,compare}