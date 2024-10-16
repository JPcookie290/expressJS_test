const indexMessageGet = (req, res, next) => {
  //TODO: db call for all messages (limit 10)
  res.render("index", {
    title: "Message Board - Home",
  });
};

module.exports = { indexMessageGet };
