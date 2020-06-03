const Joi = require('@hapi/joi');

const loginschema = Joi.object ({

    userid : Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    
    password : Joi.string()
    .required()

    })
module.exports = loginschema