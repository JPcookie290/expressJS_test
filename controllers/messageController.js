const { body, validationResult } = require("express-validator")
const db = require("../db/querys")

const errorLengthTitle = "must have at least 1 and maximum 25 characters"
const errorLengthMessage = "must have at least 5 characters"
const errorCharMessage = "can contain letters, numbers, spaces, and special characters"

const validationSchema = [
  body("title")
    .isLength({ min: 1, max: 25 })
    .withMessage(`title ${errorLengthTitle}`)
    .trim(),
  body("message")
    .isLength({ min: 5 })
    .withMessage(`message ${errorLengthMessage}`)
    .matches(/^[A-Za-z0-9\s!@#$%^&*()_+{}\[\]:;"'<>,.?\/\\|`~-]*$/)
    .withMessage(`message ${errorCharMessage}`)
    .trim(),
]

const newMessageGet = (req, res) => {
  res.render("new-message", {
    title: "Add new message"
  })
}

const newMessagePost = [
  validationSchema,
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const { title, message } = req.body
      return res.render("new-message", {
        title: "Input Error",
        errors: errors.array(),
        message: { title, message }
      })
    }
    try {
      const user = await db.getUserByEmail(req.user.email)
      const message = {
        title: req.body.title,
        message: req.body.message,
        user_id: user.id
      }
      await db.addNewMessagePost(message)
      res.redirect("/")
    } catch (error) {
      next(error)
    }
  }
]

const deleteMessageGet = async (req, res) => {

  console.log("TEST");

  try {
      const messageId = req.params.msgId;
      console.log(messageId)
      await db.deleteMessage(messageId)

      res.redirect("/")
  } catch (err) {
      next(err)
  }

}

module.exports = {
  newMessageGet,
  newMessagePost,
  deleteMessageGet
}
