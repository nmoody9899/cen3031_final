
const express = require('express');

const router = express.Router();

const BlogPost = require('../models/blogPost');


// Routes


router.get('/', (req, res) => {

    BlogPost.find({})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});



router.post('/save', (req, res) => {
    const data = req.body;

    const newBlogPost = new BlogPost(data);

    console.log('started save');

    newBlogPost.save((error) => {
        if (error) {
            console.log('good job saving!');
            res.status(500).json({ msg: 'Internal server errors' });
            return;
        }
        console.log('bad job saving');
        res.json({
            msg: 'your data has been saved'
        });

    });


});

router.delete('/:id', (req, res) => {

    BlogPost.remove({
        _id: req.params.id
    }, function (err, transaction) {
        if (err)
            res.send(err);
        res.json({ message: 'Transaction deleted!' })
    });


});


router.get('/name', (req, res) => {
    const data = {
        username: 'peterson',
        age: 5
    };
    res.json(data);
});


ObjectID = require('mongodb').ObjectID;
var db;

router.get('/infoapi/:id', (req, res) => {
    db = req.db;

    var newObjectId = new String(req.params.id)
    console.log(newObjectId);


    res.json(newObjectId);
});



module.exports = router;
