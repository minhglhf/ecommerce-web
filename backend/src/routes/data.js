const express = require('express');
const { fetchDatas } = require('../controller/data');

const router = express.Router();

router.get('/datas', fetchDatas);

module.exports = (router);