const socket = io.connect();

// let submit = document.getElementById('form-product');
// let submitChat = document.getElementById('form-Chat');

//Pedimos la data que hay actualmente enviando un socket
socket.emit('Productos');
socket.emit('Mensajes');

// Si emite un mensaje individual
socket.on('mensajes', (data) => {
    console.log('RECIBI MENSAJE');
    alert(data);
});

// Mensaje para todos los clientes
socket.on('update', (products) => {
    products.forEach((product) => {
      render(product);
    });
});

// // WebSocket que recibe mensajes desde le backend para pintar un nuevo mensaje del chat
socket.on('updateChat', (messages) => {
    messages.forEach((message) => {
      renderChat(message);
    });
});


//Reestructurando las nuevas llamadas de mensajes con normalizr

const formMensaje = document.getElementById('formMensajes');
const mensajesContainer = document.getElementById('mensajesContainer');


let date = new Date();
let now = date.toLocaleString();

formMensaje.addEventListener('submit', (event) => {
  event.preventDefault();
  if (email.value && mensaje.value) {
    let data = {
      author: {
        email: email.value,
        nombre: nombre.value,
        apellido: apellido.value,
        alias: alias.value,
        edad: edad.value,
        url: url.value,
      },
      msg: mensaje.value,
    //   timestamp: data.value,
    };
    console.log('EMITIENDO SOCKET');

    socket.emit('newMessage', data);
    email.value = '';
    nombre.value = '';
    apellido.value = '';
    (alias.value = ''), (edad.value = ''), (url.value = '');
    mensaje.value = '';
  }
});

socket.on('receiveMessages', (mensajes) => {
  console.log(mensajes);
});

socket.on('newMessage', (mensaje) => {
  let p = document.createElement('p');
  p.innerHTML = `
        <span class='mx-2 mensaje__email'>${mensaje.author.email}</span>
        <span class='mx-2 mensaje__time'>${mensaje.author.nombre}</span>
        <span class='mx-2 mensaje__text'>${mensaje.msg}</span>`;
  mensajesContainer.appendChild(p);
});


