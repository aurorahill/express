const express = require('express');
const router = express.Router();
const News = require('../models/news');
const { default: mongoose } = require('mongoose');

router.all('*', (req, res, next) => {
  if (!req.session.admin) {
    res.redirect('login');
    return;
  }
  next();
});

/* GET home page. */
router.get('/', async (req, res) => {
  const data = await News.find({});
  // console.log(data);

  res.render('admin/index', { title: 'Admin', data });
});

router.get('/news/add', (req, res) => {
  res.render('admin/news-form', { title: 'Dodaj news', body: {}, errors: {} });
});

router.post('/news/add', async (req, res) => {
  const body = req.body;

  const newsData = new News(body);
  const errors = newsData.validateSync();

  try {
    await newsData.save();
    res.redirect('/admin');
  } catch (err) {
    console.log(err);
    if (err) {
      res.render('admin/news-form', { title: 'Dodaj news', errors, body });
      return;
    }
  } finally {
    // await mongoose.disconnect();
  }
});

router.get('/news/delete/:id', async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/admin');
});

module.exports = router;
