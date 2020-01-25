const db = require('../database/dbConfig.js');

module.exports = {
    find,
    findById,
    addUser,
    removeUser,
    findBy
}


function find() {
    return db('users').select('id', 'username');
}

function findBy(filter) {
    return db('users').where(filter).first();
}

function findById(id) {
    return db('users').where({id}).first();
}

function addUser(user) {
    return db('users').insert(user)
           .then(ids => {
               const [id] = ids;
               return findById(id)
           }) 
}

function removeUser(id) {
    return db('users').where('id', id).del()
            .then(count => {
                return db('users');
            })
            .then(users => {
                return users
            })
}