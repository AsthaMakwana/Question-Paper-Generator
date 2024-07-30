# Question-Paper-Generator

The Question Paper Generator is a Node.js application designed to automate the creation of question papers based on specified criteria. It reads from a predefined set of questions and generates a question paper that meets the required total marks and difficulty distribution.

# Prior setup 

Ensure Node.js is installed

# Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/AsthaMakwana/Question-Paper-Generator
cd question-paper-generator
```

2. Install the necessary dependencies:

```bash
npm install
```

The questions are pre-defined in the questions.json file as the question store. If you prefer not to specify your own questions, you can proceed to run the application directly. For custom questions, use the following format:

``` javascript
const questions = [
  { question: "Question 1", subject: "Subject 1", topic: "Topic 1", difficulty: "Difficulty", marks: 5 },
  { question: "Question 2", subject: "Subject 2", topic: "Topic 2", difficulty: "Difficulty", marks: 10 },
];

```

4. Launch the server

```
node src/app.js
```

Access the API endpoint using a tool like Postman or cURL:

```
Endpoint: http://localhost:3000/api/questions/generate
```

Method: POST

Body: JSON object with keys totalMarks and difficulty. Example:

```
{
  "totalMarks": 100,
  "difficultyDistribution": {
    "Easy":30,    
    "Medium": 50,  
    "Hard":20
  }
}
```

Send the POST request to retrieve a list of questions filtered based on the provided totalMarks and difficulty criteria.
