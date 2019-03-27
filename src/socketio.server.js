const io = require('socket.io')();
const cc = require('./wt/create.client');
io.on('connection', (client) => {
    client.on('upload', (x) => {
        console.log("upload received", x);
        cc().then(c => {
            console.log("client created")
            c.add(x.magnetURI, torrent => {
                console.log('Client is downloading:', torrent.infoHash);
            })
            console.log("client surpassed")
        })
    })
});

const port = 8000;

const start = _ => {
    io.listen(port);
    console.log('socket io listening on port ', port);
};

io.listen(port);
console.log('socket io listening on port ', port);

// export default start;
