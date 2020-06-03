const Joi = require('@hapi/joi');

const inputschema = Joi.object ({

    userid : Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    
    firstname : Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

    lastname : Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

    email : Joi.string()
    .email()
    .min(3)
    .max(30)
    .required(),

    password : Joi.string()
    .required(), 

    repeatpassword : Joi.string()
    .required()
})

const dbschema = Joi.object ({
    userid : Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    
    firstname : Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

    lastname : Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

    email : Joi.string()
    .email()
    .min(3)
    .max(30)
    .required(),

    password : Joi.string()
    .required(), 


    created_at : Joi.date()
    .required(), 


    updated_at : Joi.date()
    .required(), 


})
const outputschema = Joi.object ({
    userid : Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    
    firstname : Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

    lastname : Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

    email : Joi.string()
    .email()
    .min(3)
    .max(30)
    .required()
})

const schema = {inputschema, dbschema, outputschema}
module.exports = schema