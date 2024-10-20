const db = require("../db/querys")

const indexMessageGet = async (req, res, next) => {
  //TODO: db call for all messages (limit 10)
  const latestMessages = await db.getLatestMessages()
  console.log("test: indexController: " + latestMessages);

  res.render("index", {
    title: "Message Board - Home",
    messages: latestMessages
  });
};

module.exports = { indexMessageGet };
