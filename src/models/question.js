const fs = require('fs');
const path = require('path');

// Path to the JSON file containing question data
const dataPath = path.join(__dirname, '../../data/questions.json');

class Question {
  static getQuestions() {

    // Reading the content of the JSON file synchronously
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
  }
}

module.exports = Question;
