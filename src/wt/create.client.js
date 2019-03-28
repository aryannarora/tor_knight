/* eslint-disable */
const getIceServers = require('./get.ice.servers');
const wt = require('webtorrent');

const createClient = () => {
    return getIceServers()
        .then(iceServers => {
            const client = new wt({
                tracker: {
                    rtcConfig: {}
                }
            });
            return client;
        });
};

module.exports = createClient;