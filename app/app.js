const newMessageForm = document.getElementById('message-form')
const message = document.getElementById('message')
const messagesList = document.getElementById('messages-list')
const userIdEl = document.getElementById('user-id')

const socket = io('ws://localhost:8080')
let userId = ''

const getUserId = setTimeout(() => {
    userId = socket.id?.slice(0, 4)
    if (!userId || userId === '') {
        getUserId()
        return
    }
    console.log("🚀 ~ file: app.js ~ line 10 ~ userId", userId)
    userIdEl.innerText = `User ID: ${userId}`
}, 300);

socket.on('message', data => {
    const li = document.createElement('li')
    li.classList.add('message', 'alert')
    li.classList.add(data.id === userId ? 'alert-success' : 'alert-primary')
    li.innerHTML = data.message
    messagesList.append(li)
})

newMessageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const text = message.value
    if (text === '/creator') {
        nameCreator()
        newMessageForm.reset()
        return
    }
    switch (text) {
        case '/creator':
            nameCreator()
            newMessageForm.reset()
            return
            break;
        case '/help':
            help()
            newMessageForm.reset()
            return
            break;
        default:
            break;
    }
    socket.emit('message', text)
    newMessageForm.reset()
})

function nameCreator() {
    const li = document.createElement('li')
    li.classList.add('message', 'alert', 'alert-danger')
    li.innerHTML = `<strong><i>App creator is:</i></strong> Armando J. Peña Tamayo`
    messagesList.append(li)
}

function help() {
    const li = document.createElement('li')
    li.classList.add('message', 'alert', 'alert-warning')
    li.innerHTML = `<strong><i>Current functions are:</i></strong> /creator : Shows the creator of this app's name`
    messagesList.append(li)
}