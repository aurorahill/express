const express = require('express');
const router = express.Router();
const News = require('../models/news');

/* GET home page. */
router.get('/', async (req, res) => {
  const search = req.query.search || '';
  let data;
  try {
    data = await News.find({ title: new RegExp(search.trim(), 'i') })
      .sort({ created: -1 })
      .exec();

    // data.exec();
  } catch (err) {
    console.log(err);
  }
  res.render('news', { title: 'News', data, search });
});

module.exports = router;
