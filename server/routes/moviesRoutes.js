const express = require('express');
const mongodb = require('mongodb').MongoClient;
const assert = require('assert');
const router = express.Router();

let url = 'mongodb+srv://Krza:Konjusnica112233@cluster0-bs1ki.mongodb.net/test?retryWrites=true&w=majority';

router.get('/', (req, res) => {
    res.status(400);
});

router.post('/', (req, res) => {
    res.status(400);
});

//Get all movies
router.get('/movies', (req, res) => {
    let movies = [];
    let pageNo = parseInt(req.query.pageNo) || 1;
    let size = parseInt(req.query.size) || 10;
    let query = {};
    mongodb.connect(url, (err, client) => {
        assert.equal(null, err);
        const db = client.db('mistral-imdb-task');
        let moviesTemp = db.collection('filmovi').find().skip((pageNo - 1) * size).limit(size);
        moviesTemp.forEach(function(doc, err){
            assert.equal(null, err);
            movies.push(doc);
        }, function() {
            client.close();
            res.send(movies);
        });
    });
});

//Get movie by id 
router.get('/movies/:product_id', (req, res) => {
    let movie = [];
    mongodb.connect(url, (err, client) => { 
        assert.equal(null, err);
        const db = client.db('mistral-imdb-task');
        let movieTemp = db.collection('filmovi').find();
        movieTemp.forEach(function(doc, err){
            if (doc.product_id == parseInt(req.params.product_id)) {
               movie.push(doc); 
            }
        }, function() {
            client.close();
            res.send(movie);
        });
    });
});

//Get all series
router.get('/series', (req, res) => {
    let series = [];
    mongodb.connect(url, (err, client) =>{
        assert.equal(null, err);
        const db = client.db('mistral-imdb-task');
        let seriesTemp = db.collection('serije').find();
        seriesTemp.forEach(function(doc, err){
            assert.equal(null, err);
            series.push(doc);
        }, function() {
            client.close();
            res.send(series);
        });
    });
});

//Do a review
router.post('/movies/:product_id/review', (req, res) => {
    let newReview = {
        product_id: parseInt(req.params.product_id),
        review: parseFloat(req.body.review)
    };

    mongodb.connect(url, (err, client) => {
        assert.equal(null, err);
        const db = client.db('mistral-imdb-task');

        db.collection('reviews').insertOne(newReview, function(err, result){
            assert.equal(null, err);
            console.log('Added new review!');
            client.close();
            res.send(newReview).status(201);
        });
    });
});

//Get all reviews
router.get('/reviews', (req, res) => {
    let reviews = [];
    mongodb.connect(url, (err, client) =>{
        assert.equal(null, err);
        const db = client.db('mistral-imdb-task');
        let reviewsTemp = db.collection('reviews').aggregate([
            {"$match": {}},
            {"$group": {_id: "$product_id", review: {"$avg": "$review"}}}
        ]);
        reviewsTemp.forEach(function(doc, err){
            assert.equal(null, err);
            reviews.push(doc);
        }, function() {
            client.close();
            res.send(reviews);
        });
    });
});

//Get reviews by id
router.get('/reviews/:product_id', (req, res) => {
    let reviews = [];
    mongodb.connect(url, (err, client) => { 
        assert.equal(null, err);
        const db = client.db('mistral-imdb-task');
        let reviewsTemp = db.collection('reviews').find();
        reviewsTemp.forEach(function(doc, err){
            assert.equal(null, err);
            if (doc.product_id == parseInt(req.params.product_id)) {
               reviews.push(doc); 
            }
        }, function() {
            client.close();
            res.send(reviews);
        });
    });
});

module.exports = router;