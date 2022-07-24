const PORT = 8080

const http = require('http').createServer()

const io = require('socket.io')(http, {
    cors: { origin: "*" }
})

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('message', (message) => {
        console.log(message)
        const userId = socket.id.substr(0, 4)
        io.emit('message', {
            id: userId,
            message: `<strong><i>${userId} dijo:</i></strong> ${message}`
        })
    })
})

http.listen(PORT, () => console.log(`listening on port: ${PORT}`))