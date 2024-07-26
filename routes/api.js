const express = require('express');
const router = express.Router();
const News = require('../models/news');
const defaultSort = -1;

/* GET home page. */
router.get('/', async (req, res) => {
  const search = req.query.search || '';
  let sort = req.query.sort || defaultSort;
  let data;

  if (sort !== -1 || sort !== 1) {
    sort = defaultSort;
  }

  try {
    data = await News.find({ title: new RegExp(search.trim(), 'i') })
      .sort({ created: sort })
      .select('_id title description')
      .exec();
  } catch (err) {
    console.log(err);
  }
  res.json(data);
});

router.get('/:id', async (req, res) => {
  let data;
  const id = req.params.id;

  try {
    data = await News.findById(id).select('_id title description');
  } catch (err) {
    console.log(err);
  }
  res.json(data);
});

module.exports = router;
