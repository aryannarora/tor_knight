const seedFiles = (client, files) => {
    return client.seed(files, torrent => {
        console.log("mathafucka client is seeding bruhh");
        console.log(files, torrent, torrent.infoHash);
    })
};

module.exports = seedFiles;