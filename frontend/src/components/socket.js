let socket = {}
var socketFunctions = {
    initialize: function() {
        socket = new WebSocket("ws://localhost:5000/ws");
    },
    sendMessage: function(obj) {
        socket.send(
            JSON.stringify(obj)
        );
    }
}
module.exports = {socketFunctions};