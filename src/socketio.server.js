const io = require('socket.io')();
const cc = require('./wt/create.client');
io.on('connection', (client) => {
    client.on('upload', (x) => {
        console.log("upload received");
        return cc().then(c => {
            return c.add(x.magnetURI, torrent => {
                const updateSpeed = () => {
                    this.setState({
                        speedUp: torrent.uploadSpeed,
                        speedDown: torrent.downloadSpeed,
                        peers: torrent.numPeers
                    })
                }

                torrent.on('upload', updateSpeed)
                torrent.on('download', updateSpeed)
                setInterval(updateSpeed, 5000)
                console.log('Client is downloading:', torrent);
                console.log("client surpassed")
            });
        });
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
