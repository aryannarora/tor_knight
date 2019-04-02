const seedFiles = (client, files) => {
    return client.seed(files, torrent => {
        console.log("seeding started");
    })
};

module.exports = seedFiles;
