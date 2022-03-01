const { getAsync, setAsync } = require('../redis/index')

const express = require('express');
const router = express.Router();

router.get('/', async (_, res) => {
    const stats = await getAsync('added_todos');
    res.json( { added_todos: Number(stats) } )
});

module.exports = router;