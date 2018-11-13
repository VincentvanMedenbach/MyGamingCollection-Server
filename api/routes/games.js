const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Game = require('../models/games');

router.get('/', (req, res, next) => {
  Game.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({
        error: err.message
      });
    });
});

router.post('/', (req, res, next) => {
  const game = new Game({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
  });
  game
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Handling POST requests to /games',
        createdGame: result
      });
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({
        error: err.message
      });
    })

});

router.get('/:gameId', (req, res, next) => {
  const id = req.params.gameId;
  Game.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "No valid entry found for provided ID"
        });
      }
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    });
});

router.patch('/:gameId', (req, res, next) => {
  const id = req.params.gameId;
  Game
    .updateOne(
      { _id: id },
      { $set: { name: req.body.newName } }
    )
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({
        error: err.message
      });
    });
});

router.delete('/:gameId', (req, res, next) => {
  const id = req.params.gameId;
  Game.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({
        error: err.message
      });
    });
});

module.exports = router;
