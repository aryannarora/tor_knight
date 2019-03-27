const db = {};

export const create = (url, token) => {
    db[token] = url;
    console.log("db => ", db);
};

export const get = token => db[token] || null;

export const remove = url => delete db[url];
