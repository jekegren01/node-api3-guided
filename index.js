const express = require("express")
// const morgan = require('morgan')
// const deny = require('./middleware/deny')
const logger = require('./middleware/logger')
const welcomeRouter = require("./welcome/welcome-router")
const usersRouter = require("./users/users-router")

const server = express()
const port = 4000

server.use(express.json())
// server.use(morgan('combined'))
// server.use(deny())
server.use(logger('long'))

// writing the middleware morgan from scratch to demonstrate custom middleware
// then take below and extract to its own middleware file and export

// server.use((req, res, next) => {
// 	const time = new Date().toISOString()
// 	console.log(`${time} ${req.ip} ${req.method} ${req.url}`)

// 	// this middleware is finished, move on to the next piece of middleware in the stack
// 	next()
// })


server.use(welcomeRouter)
server.use(usersRouter)

// end of stack handler to catch errors
// by using 4 parameters, express defines this as an error handler
server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong, please try again"
	})
})

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
