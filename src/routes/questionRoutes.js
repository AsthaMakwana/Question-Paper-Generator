const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/questionController');

// Defining a POST route for generating a question paper
// This route will use the generateQuestionPaper method from QuestionController
router.post('/generate', QuestionController.generateQuestionPaper);

module.exports = router;
