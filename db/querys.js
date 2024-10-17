const pgPool = require("./pool");

const pushUser = async (user) => {
  await pgPool.query(
    "INSERT INTO users (forename, surname, email, password) VALUES ($1, $2, $3, $4)",
    [user.forename, user.surname, user.email, user.password]
  );
};

const getUserCredentials = async (email) => {
  const { rows } = await pgPool.query(
    "SELECT id, email, password FROM users WHERE email=$1",
    [email]
  );
  return rows[0];
};

const getUserById = async (id) => {
  const { rows } = await pgPool.query(
    "SELECT u.*, r.role FROM users as u JOIN roles as r ON u.role_id=r.id WHERE u.id=$1",
    [id]
  );
  return rows[0];
};

module.exports = {
  pushUser,
  getUserCredentials,
  getUserById,
};
