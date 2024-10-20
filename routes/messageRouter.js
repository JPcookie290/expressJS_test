const messageRouter = require("express").Router();
const { isAuth, isAdmin } = require("../middleware/authMiddleware");

const messageController = require("../controllers/messageController");

messageRouter.get("/new", isAuth, messageController.newMessageGet);
messageRouter.post("/new", isAuth, messageController.newMessagePost);

messageRouter.get("/:msgId/delete", isAuth, messageController.deleteMessageGet)

module.exports = messageRouter;