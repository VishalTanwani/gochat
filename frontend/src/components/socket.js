let socket = {}
var socketFunctions = {
    initialize: function() {
        socket = new WebSocket(process.env.REACT_APP_SOCKET_CONNECTION_URL);
    },
    sendMessage: function(obj) {
        socket.send(
            JSON.stringify(obj)
        );
    }
}
module.exports = {socketFunctions};