const schema = require("../schema/user")
const Joi = require("@hapi/joi")
const bcrypt = require("bcrypt") // https://github.com/nelsonic/
const DateTime = require("luxon")
const _ = require("lodash")
const escape = require("pg-escape") // https://github.com/segmentio/pg-escape
const { v4: uuidv4 } = require("uuid")
const Boom = require("boom");

var validateinput = async (request) => {
  const { error, value } = schema.inputschema.validate(request.payload);
    if (error){
    request.logger.error(error.message)
    throw Boom.badRequest(error)
    }
  if (request.payload.password === request.payload.repeatpassword) {
    try {
      let userid = await request.pg.client.query(
        "select * from  users where userid = $1",
        [request.payload.userid]
      )
      if (userid.rows[0]) {
        request.logger.error("userid already exist")
        throw Boom.conflict("userid already exist");
      }
    } catch (err) {
      throw err
    }
    try {
      let email = await request.pg.client.query(
        "select * from  users where email = $1",
        [request.payload.email]
      )
      console.log(email.rows[0]);
      if (email.rows[0]) {
        request.logger.error("email already exist")
        throw Boom.conflict("email already exist");
      }
    } catch (err) {
      throw err
    }
  } else {
    request.logger.error("Passwords don't match")
    throw Boom.conflict("Password and Repeat password do not match");
  }
  // if userid or email alreayd exist throw err

};
var preparepayload = async (inputpayload) => {
  let password = await bcrypt.hashSync(inputpayload.password, 12)
  let userdata = {
    userid: inputpayload.userid,
    firstname: inputpayload.firstname,
    lastname: inputpayload.lastname,
    email: inputpayload.email,
    password: await bcrypt.hashSync(inputpayload.password, 12),
    uuid: uuidv4(),
    created_at : new Date().toISOString(),
    updated_at : new Date().toISOString()
  };
  return userdata
};

var preparecmd = (userdata) => {
  let input = _.join(_.keysIn(userdata), ",")
  let data = "'" + _.join(_.valuesIn(userdata), "','") + "'"
  let cmd = escape("INSERT INTO users(" + input + ") VALUES(" + data + ") RETURNING *")
  console.log("cmd is" + cmd)
  return cmd;
};

var createuser = async (request, h) => {
  console.log("before validateinput")
  try {
    await validateinput(request);
    let payload = await preparepayload(request.payload)
    let cmd = preparecmd(payload)
      let result = await request.pg.client.query(cmd)
      if (result.rowCount == 1) {
        return h.response(result.rows[0]).code(201)
      }
    } catch (err) {
      throw Boom.boomify(err)
    }
}
module.exports = createuser
