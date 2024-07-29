const Question = require('../models/question');

class QuestionController {

    /**
   * Generating a question paper based on the total marks and difficulty distribution.
   * 
   * @param {Object} req - The request object containing the input data.
   * @param {Object} res - The response object to send the results.
   */

    static generateQuestionPaper(req, res) {
        const { totalMarks, difficultyDistribution } = req.body;

        // Validating input data
        if (typeof totalMarks !== 'number' || totalMarks <= 0 || !difficultyDistribution) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        // Retrieving all questions from the Question model
        const questions = Question.getQuestions();
        const result = { questions: [], totalMarks: 0 };

        // Calculating the required marks for each difficulty level based on the provided distribution
        const difficultyMarks = {
            Easy: Math.round(totalMarks * (difficultyDistribution.Easy / 100)),
            Medium: Math.round(totalMarks * (difficultyDistribution.Medium / 100)),
            Hard: Math.round(totalMarks * (difficultyDistribution.Hard / 100)),
        };

        // Iterating through each difficulty level to select questions
        for (const [difficulty, requiredMarks] of Object.entries(difficultyMarks)) {

            // Filtering questions based on the current difficulty level
            const filteredQuestions = questions.filter(q => q.difficulty === difficulty);

            // If no questions are available for this difficulty, returning an error
            if (filteredQuestions.length === 0) {
                return res.status(400).json({ message: `No questions available for difficulty level: ${difficulty}` });
            }
            let accumulatedMarks = 0;
            let selectedQuestions = [];

            // Select questions until the required marks are met
            for (let i = 0; i < filteredQuestions.length && accumulatedMarks < requiredMarks; i++) {
                const q = filteredQuestions[i];
                if (accumulatedMarks + q.marks <= requiredMarks) {

                    // If adding the current question does not exceed the required marks, add it
                    selectedQuestions.push(q);
                    accumulatedMarks += q.marks;
                } else {

                    // Adjusting the question's marks if adding the full question would exceed the required marks
                    const remainingMarks = requiredMarks - accumulatedMarks;
                    if (q.marks > remainingMarks) {
                        selectedQuestions.push({ ...q, marks: remainingMarks });
                    } else {
                        selectedQuestions.push(q);
                    }
                    accumulatedMarks = requiredMarks;// Ensuring that the loop exits
                }
            }

            // If not enough questions were found to meet the mark requirement, return an error
            if (accumulatedMarks < requiredMarks) {
                return res.status(400).json({ message: `Not enough questions to meet the mark distribution for difficulty level: ${difficulty}` });
            }

            // Adding the selected questions to the result
            result.questions.push(...selectedQuestions);
            result.totalMarks += accumulatedMarks;
        }

        // Checking if the total marks of the selected questions meet the requirement
        if (result.totalMarks < totalMarks) {
            return res.status(400).json({ message: 'Not enough questions to meet the total marks requirement.' });
        }

        // Returning the generated question paper
        return res.json(result);
    }
}

module.exports = QuestionController;
