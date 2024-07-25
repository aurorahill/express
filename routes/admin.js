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
router.get('/', (req, res) => {
  // const newsData = new News({
  //   title: 'Tytul testowy',
  //   description: 'Opis...',
  // });

  // async function main() {
  //   try {
  //     await newsData.save();
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     // await mongoose.disconnect();
  //   }
  // }

  // main();

  res.render('admin/index', { title: 'Admin' });
});

router.get('/news/add', (req, res) => {
  res.render('admin/news-form', { title: 'Dodaj news' });
});

module.exports = router;
