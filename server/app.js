const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const env = require("custom-env").env();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
        origin: '*',
        credentials: true
    }
});

const cookieParser = require('cookie-parser');

app.use(cors({
    origin: 'http://localhost:63342',
    credentials: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/book", require("./routes/bookRoute"));
app.use("/auth", require("./routes/authRoute"));
app.use("/admin", require("./routes/adminRoute"));
app.use("/map", require("./routes/mapRoute"));
app.use("/cart", require("./routes/cartRoute"));
app.use("/order", require("./routes/orderRoute"));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        const port = process.env.PORT;
        httpServer.listen(3000, () => console.log('Server has started on port: 3000')); // Start HTTP server on port 3000
        console.log('MongoDB Connected');
    })
    .catch(err => console.log(err));

const users = {}

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    });
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
    });
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    });
});
