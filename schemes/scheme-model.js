const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findSteps(id) {}

function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then(([id]) => this.findById(id));
}

function update() {}

function remove() {}
