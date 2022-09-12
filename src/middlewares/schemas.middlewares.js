import joi from 'joi';

const newUserSchema = joi.object({
    name: joi.string().empty(' ').required(),
    email: joi.string().email().required(),
    password: joi.string().empty(' ').required()
});
const userLoginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().empty(' ').required()
});
const registerSchema = joi.object({
    type: joi.string().empty(' ').required(),
    date: joi.string().empty(' ').required(),
    description: joi.string().empty(' ').required(),
    amount: joi.number().empty(' ').required(),
});

async function checkNewUser (req, res, next) {
    const validation = newUserSchema.validate(req.body, {abortEarly: false});

    if (validation.error) {
        const errors = validation.error.details.map(details => details.message);
        res.status(422).send(errors);
    }

    next();
}

async function checkUserLogin (req, res, next) {
    const validation = userLoginSchema.validate(req.body, {abortEarly: false});

    if (validation.error) {
        const errors = validation.error.details.map(details => details.message);
        res.status(422).send(errors);
    }

    next();
}

async function checkRegister (req, res, next) {
    const validation = registerSchema.validate(req.body, {abortEarly: false});

    if (validation.error) {
        const errors = validation.error.details.map(details => details.message);
        res.status(422).send(errors);
    }

    next();
}

export { checkNewUser, checkUserLogin, checkRegister };