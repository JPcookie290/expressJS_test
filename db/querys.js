const pgPool = require('./pool')

const pushUser = async ( user ) => {
    await pgPool.query("INSERT INTO users (forename, surname, email, password) VALUES ($1, $2, $3, $4)",
        [user.forename, user.surname, user.email, user.password]
    );
};

module.exports = {
    pushUser,
}