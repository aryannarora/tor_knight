var WebTorrent = require('webtorrent')
var server = require('http').createServer()
var client = new WebTorrent()

var magnetURI = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'

client.add(magnetURI, function (torrent) {
    console.log('added');
    torrent.on('done', function () {
        console.log('torrent download finished')
    })

    var interval = setInterval(function () {
        console.log('Progress: ' + (torrent.progress * 100).toFixed(1) + '%')
    }, 5000)

})

server.listen(5000, _ => console.log("liosteniong"))