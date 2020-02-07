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

function findSteps(id) {
  return db("schemes as sc")
    .join("steps as st", "sc.id", "=", "st.scheme_id")
    .select("sc.id", "scheme_name", "step_number", "instructions")
    .where({ scheme_id: id })
    .orderBy("step_number");
}

function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then(([id]) => this.findById(id));
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(() => this.findById(id));
}

async function remove(id) {
  const deleted = await this.findById(id);

  return db("schemes")
    .where({ id })
    .del()
    .then(() => deleted);
}
