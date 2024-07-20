const db = require('../db')

async function postClip(title, video_url, server_id) {
    await db.query('INSERT INTO clips (title, video_url, server_id) VALUES ($1, $2, $3)', [title, video_url, server_id]);
}

module.exports = { postClip };