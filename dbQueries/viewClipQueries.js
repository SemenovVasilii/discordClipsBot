const db = require('../db')

async function getClips(server_id) {
    const res = await db.query('SELECT id, title FROM clips WHERE server_id = $1', [server_id]);
    return res.rows;
}

async function getClip(id) {
    const res = await db.query('SELECT video_url FROM clips WHERE id = $1', [id]);
    return res.rows[0];
}

module.exports = { getClips, getClip };