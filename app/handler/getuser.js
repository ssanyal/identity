
var getuser = async (request, h) => {
        let cmd = "select * from users where userid = $1"
        console.log("client" + request.pg)
        try {
        let result = await request.pg.client.query( cmd, [request.params.id]) 
        return h.response(result.rows[0]) 
        } catch (err){
        console.log("error getting user list " + err)
      }
    }

  module.exports = getuser


  