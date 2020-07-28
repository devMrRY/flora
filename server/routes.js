'use strict'

module.exports=(app)=>{
    app.use('/api/user', require('./api/user'))
    app.use('/api/maintainance', require('./api/maintainance'))
}