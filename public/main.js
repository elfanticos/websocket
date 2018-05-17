var socket = io('http://localhost:3000', {forceNew : true});

socket.on('messages', function (data) {
    render(data);
});

function render(msjs) {
    var html = msjs.map((data, index) => {
        return (
            `<div>
                <strong>${data.author}</strong>
                <em>${data.text}</em>
            </div>`
        );
    }).join(' ');
    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
    var payload = {
        id: 1,
        text: document.getElementById('texto').value,
        author: document.getElementById('username').value
    };
    socket.emit('new-message', payload);
    return false;
}