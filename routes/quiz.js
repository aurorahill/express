const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');

/* GET home page. */
router.get('/', async (req, res) => {
  const show = !req.session.vote;
  try {
    let sum = 0;
    const data = await Quiz.find({});
    data.forEach((item) => {
      sum += item.vote;
    });

    res.render('quiz', { title: 'Quiz', data, show, sum });
  } catch (err) {
    console.log(err);
  }
});

router.post('/', async (req, res) => {
  const id = req.body.quiz;

  try {
    const data = await Quiz.findOne({ _id: id });
    data.vote = data.vote + 1;
    try {
      data.save();
      req.session.vote = 1;
      res.redirect('/quiz');
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
