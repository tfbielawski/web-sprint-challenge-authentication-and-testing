const db = require("../../data/dbConfig");

const findBy = (filter) => { return db("users").where(filter);}

const findById = (id) => { return db("users").where("id",id).first();}

const addUser = async (user) => {
    const id = await db("users").insert(user);
    return findById(id);
}

module.exports = { findBy, findById,  addUser}