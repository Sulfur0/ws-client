import  {Manager, Socket } from 'socket.io-client'
let socket: Socket;
export const connectToServer = ( token: string ) => {
  const manager = new Manager(
    // 'http://localhost:4000/socket.io/socket.io.js',
    'https://teslo-shop-production-ae40.up.railway.app/socket.io/socket.io.js',
    { 
      extraHeaders: {
        hola: 'mundo',
        authentication: token
      } 
    }
  )
  socket?.removeAllListeners();
  socket = manager.socket('/');
  // console.log(socket);
  addListeners();
}

const addListeners = () => { 
  const serverStatusLabel = document.querySelector('#server-status')!;
  const clientsUL = document.querySelector('#clients-ul')!;

  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
  const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
  const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;
  

  socket.on('connect', () => {
    serverStatusLabel.innerHTML = 'Connected'
  })
  socket.on('disconnect', () => {
    serverStatusLabel.innerHTML = 'Disconnected'
  })
  socket.on('clients-updated', (clients: string[]) => {
    let clientsHtml = '';
    clients.forEach( clientId => {
      clientsHtml += `<li>${clientId}</li>`
    })
    clientsUL.innerHTML=clientsHtml
  })

  messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if(messageInput.value.trim().length <= 0) return;
    socket.emit('message-from-client', ({id:'YO', message: messageInput.value}));
    messageInput.value = "";
  })

  socket.on('message-from-server', (payload: {fullname: string, message: string}) => {
    const newMessage = 
    `<li>
      <strong>${payload.fullname}</strong>
      <span>${payload.message}</span>
    </li>`
    const li = document.createElement('li');
    li.innerHTML = newMessage;
    messagesUl.append(li);
  })
 }