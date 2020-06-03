
var getuserlist = async (request, h) => {
        let cmd = "select * from users"
        console.log("client" + request.pg)
        try {
        let result = await request.pg.client.query( cmd ) 
        return h.response(result.rows) 
        } catch (err){
        console.log("error getting user list " + err)
      }
    }

  module.exports = getuserlist

