
const {body, validationResult} = require("express-validator");
const db = require("../db/querys")
//TODO change to node crypt
const bcrypt = require("bcrypt")

const alphaError = 'must have alphabetical chars';
const lengthError = 'must have at least 5 and max 30 chars';
const emailError = 'must be of format example@mailserver.domain';
const passwordLengthError = 'must be at least 12 characters';
const passwordCharError = 'must contain at least one lowercase letter, one uppercase letter, one number, and one special character';
const passConfirmError = 'do not match';


const validateSchema = [
    // read data over the request body
    // check forename & surname are letters and their current length
    body('forename')
    .isAlpha()
    .withMessage(`forename ${alphaError}`) 
    .isLength({min: 3, max: 30})
    .withMessage(`forename ${lengthError}`)
    .trim(),
    body('surname')
    .isAlpha()
    .withMessage(`surname ${alphaError}`)
    .isLength({min: 5, max: 30})
    .withMessage(`surname ${lengthError}`)
    .trim(),
    // check email format
    body('email')
    .isEmail()
    .withMessage(`email ${emailError}`)
    .trim(),
    // check password has eg.: a, A, 1, ! and is 12 long (for testing 4)
    body('password')
    .isLength({min: 4}) //TODO: change to 12
    .withMessage(`password ${passwordLengthError}`)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/) 
    .withMessage(`password ${passwordCharError}`)
    .trim(),
    // check if pass-confirm is the same as password
    body('pass-confirm')
    .trim()
    .custom((value, {req}) => value === req.body.password) // form data is saved in the body object
    .withMessage(`password ${passConfirmError}`)
    .trim(), 
];

//render /views/signup.ejs
const singUpGet = (req, res) => {
    res.render("signup", {
        title: "Create new Account"
    })
};

const singUpPost = [
    validateSchema, 
    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const { forename, surname, email } = req.body;
            return res.render('signup', { // alle eigenschaften werden ins object locals gespeichert
                title: "Sign-In Errors",
                user: { forename, surname, email },
                errors: errors.array()
            });
        }

        try {
            const { forename, surname, email, password } = req.body
            bcrypt.hash(password, 10, async (err, hashedPassword) => {
                if (err) return res.render("error-page", {title: "Error"}) //TODO: create error page
                await db.pushUser({
                    forename,
                    surname,
                    email,
                    password: hashedPassword
                });
            })
            res.render("/login");
        } catch (error) {
            next(error)
        }
        
    },

];

module.exports = {
    singUpGet,
    singUpPost
};