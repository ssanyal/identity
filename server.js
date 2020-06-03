'use strict'
const Hapi = require('@hapi/hapi')
const basic = require('@hapi/basic')
const config = require('./config.json')
const handler = require ('./app/handler/getuserlist')
const Bcrypt = require('bcrypt')
const Joi = require('joi')
const pg_connect = require ('./app/plugin/hapi-pg') 
const _ = require('lodash')
const fs = require('fs')

let logfile = fs.createWriteStream(config.logfile)

const init = async ()=> {

const server = new Hapi.server(config.connection)
await server.register({
    plugin: require('hapi-pino'),
    options: {
      stream: logfile, 
      redact: ['req.headers.authorization']
    }
  })

await server.register(pg_connect)

server.route ({
        method : 'GET',
        path: '/users',
        handler : require ('./app/handler/getuserlist')
    })

server.route ({
        method : 'GET',
        path: '/user/{id}',
        handler : require ('./app/handler/getuser')
    })
    
server.route ({
        method : 'post',
        path: '/user',
        handler : require ('./app/handler/createuser')
    })

server.route ({
        method : 'post',
        path: '/login',
        handler : require ('./app/handler/login')
    })

await server.start()
}

process.on('unhandledRejection', (err) => {

    console.log(err)
    process.exit(1)
})

init()
