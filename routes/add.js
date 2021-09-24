const {Router} = require ('express');
const Course = require('../models/course');
const {validationResult} = require('express-validator');
const {courseValidators} = require('../utils/validators');
const auth = require('../middleware/auth');

const router = Router();

router.get('/', auth, (req, res) => {
    res.render('add', {
        title: 'Добавить курс',
        isAdd: true
    });
});

router.post('/', auth, courseValidators, async (req, res) => {
    //console.log(req.body);
    //const course = new Course(req.body.title, req.body.price, req.body.img);
   const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).render('add', {
            title: 'Добавить курс',
            isAdd: true,
            errors: errors.array()[0].msg,
            data: {
                title: req.body.title,
                price: req.body.price,
                img: req.body.img
            }
        });
    }
    
    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        userId: req.user
    });
    
    try {
      await course.save();
      res.redirect('/courses');
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;    