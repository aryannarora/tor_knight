const DEFAULT_ICE_SERVERS = [
    {
        urls: "stun:stun.l.google.com:19302"
    }
];

const getICEServers = _ => Promise.resolve(DEFAULT_ICE_SERVERS);

module.exports = getICEServers;