const express = require('express');
const router = express.Router();

const route = '/';

router.get('/', (req, res)=>{
    //res.send("Hello res")
    res.render('pages/index');
});

module.exports = { route, router }