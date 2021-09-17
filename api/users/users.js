const db = require("../../data/dbConfig");

const find = () => {return db("users");}

const findBy = (filter) => { return db("users").where(filter);}

const findById = (id) => {
    return db("users")
        .select('id', 'username', 'password')
        .where("id",id)
        .orderBy(id)}

const addUser = async (user) => {
    const id = await db("users").insert(user);
    return findById(id);
}

module.exports = { find, findBy, findById,  addUser }