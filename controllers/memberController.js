const {body, validationResult} = require("express-validator")
const db = require("../db/querys")

const formatError = "Incorrect member code format!"

const validateSchema = [
    body ("memberCode")
        .matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)
        .withMessage(formatError)
        .trim()
]



const memberCodesGet = async (req, res) => {
    const allMemberCodes = await db.getMemberCodes()

    res.render("member-codes", {
        title: "Member Codes",
        allMemberCodes: allMemberCodes,
    })
}

const memberGet = (req, res) => {

    res.render("become-member", {
        title: "Become Member",
    })
}

const memberPost = [
    validateSchema,
    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.render("become-member", {
                title: "Become Member",
                errors: errors.array()
            })
        }

        try {
            const {memberCode} = req.body
            const code_id = await db.getMemberCodeIdByCode(memberCode)
            console.log(code_id);
            await db.removeMemberCode(code_id)

            await db.updateRole(req.user.id)

            res.redirect("/")

        } catch (err) {
            next(err)
        }
    }
]


module.exports = {memberCodesGet, memberGet, memberPost}