module.exports = (format) => {
return (req, res, next) => {
    switch (format) {
        case 'short':
            console.log(`${req.method} ${req.url}`)
            break
        case 'long': 
        const time = new Date().toISOString()
        console.log(`${time} ${req.ip} ${req.method} ${req.url}`)
    }
    
	// this middleware is finished, move on to the next piece of middleware in the stack
	next()
    }
}


// basic format of an exported function 
// module.exports = () => {
//     return (req, res, next) => {
        
//     }
// }