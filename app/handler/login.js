
const loginschema = require('../schema/login')
const bcrypt = require("bcrypt") // https://github.com/nelsonic/
const Boom = require("boom");


var login = async (request, h) => {

        let value = validateinput(request,h)

        let cmd = 'select * from users where userid = $1'
        console.log("user id is " +request.payload.userid)
        try {
        let result = await request.pg.client.query( cmd, [request.payload.userid])
        console.log("result count "+ result.rowCount)
        if (result.rowCount == 0){
          console.log("error in fetching userid "+result.rows[0].userid)
           request.logger.error('login failed')
           throw Boom.badRequest('login failed')
        } else {
          if (result.rowCount ==1){
           let output = await bcrypt.compare(request.payload.password, result.rows[0].password)
            if (!output){
              request.logger.error('login failed')
              throw Boom.badRequest('login failed')
            }
          }
        }
        console.log()
        return h.response(result.rows[0]) 
        } catch (err){
        console.log("error getting in user list " + err)
        request.logger.error('login failed')
        throw Boom.badRequest('login failed')  
      }
    }

  var validateinput = (request,h) => {
    const { error, value } = loginschema.validate(request.payload);
    if (error) {
      request.logger.error(error.message)
      throw Boom.badRequest(error);
    }
    return value

  }

  module.exports = login


  