
// var express = require('express'); 
// var app = express();
// app.set('view engine', 'ejs'); 

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        "question": "Who is the villain in Guardians of the Galaxy: Vol 1?",
        "choice1": " Thanos",
        "choice2": " Ronan The Accuser",
        "choice3": "Obidiah Stane",
        "choice4": "Yondu Udonta",
        "answer": 2
      },
      {
        "question": "What type of scientist is Jane Foster in Thor?",
        "choice1": "Astronomer",
        "choice2": "Biologist",
        "choice3": "Chemist",
        "choice4": "Dioptrics",
        "answer": 1
      },
      {
        "question": "During which war did Captain America get his superhuman abilities?",
        "choice1": "Civil War",
        "choice2": "World War 1",
        "choice3": "World War 2",
        "choice4": "The cold war",
        "answer": 3
      },
    
      {
        "question": "In which order are the Infinity Stones revealed in the Marvel Cinematic Universe?",
        "choice1": "Time Stone, Space Stone, Power Stone, Soul Stone, Reality Stone and Mind Stone",
        "choice2": "Power Stone, Reality Stone, Time Stone, Space Stone, Mind Stone and Soul Stone",
        "choice3": "Reality Stone, Time Stone, Mind Stone, Soul Stone, Power Stone and Space Stone",
        "choice4": "Space Stone, Mind Stone, Reality Stone, Power Stone, Time Stone and Soul Stone",
        "answer": 4
      },
      {
        "question": "What is the name of Peter Quill’s home planet?",
        "choice1": "Mordor",
        "choice2": "Goddricks Hollow",
        "choice3": "Earth",
        "choice4": "Morag",
        "answer": 3
      },
      {
        "question":"Which infinity stone was first introduced in the MCU?",
        "choice1": "Time Stone",
        "choice2": "Power Stone",
        "choice3": "Mind Stone",
        "choice4": "Space Stone",
        "answer": 4
      },
      {
        "question":"What was the command given by Captain America to Hulk while fighting the Chitauri army in The Avengers?",
        "choice1": "Destroyyyy",
        "choice2": "SMASH",
        "choice3": "PUNCH",
        "choice4": "SLAM",
        "answer": 2
      },
      {
        "question":"What was name of Thor’s love interest in the MCU?",
        "choice1": "Carol Denvers",
        "choice2": "Sif",
        "choice3": "Jane Foster",
        "choice4": "Proxima Midnight",
        "answer": 3
      },
      {
        "question":"Which of the following infinity stone is in liquid form?",
        "choice1": "Reality Stone",
        "choice2": "Time Stone",
        "choice3": "Space Stone",
        "choice4": "Mind Stone",
        "answer": 1
      },
      {
        "question":"Which animal does Rocket resemble in Guardians of the Galaxy?",
        "choice1": "Rabbit",
        "choice2": "Racoon",
        "choice3": "Cat",
        "choice4": "Monkey",
        "answer": 2
      },
      {
        "question":"What is Natasha Romanoff known as in the MCU?",
        "choice1": "Valkyrie",
        "choice2": "Scarlet Witch",
        "choice3": "Black Widow",
        "choice4": "Captain America",
        "answer": 3
      },
      {
        "question":"What is the name of Thor’s hammer in the MCU?",
        "choice1": "Storm Breaker",
        "choice2": "Vanir",
        "choice3": "Mjolnir",
        "choice4": "Balder",
        "answer": 3
      },
      {
        "question":"Where did Scott Lang work before becoming Ant-Man?",
        "choice1": "McDonalds",
        "choice2": "Pizza Hut",
        "choice3": "Burger King",
        "choice4": "Baskin Robbins",
        "answer": 4
      },
      {
        "question":"Who is Gamora’s sister in the MCU?",
        "choice1": "Aurora",
        "choice2": "Nevada",
        "choice3": "Minerva",
        "choice4":"Nebula",
        "answer": 4
      },
      {
        "question":"What fast food does Professor Hulk offer to Scott Lang in Avengers: Endgame?",
        "choice1": "Nachos",
        "choice2": "Tacos",
        "choice3": "Burger",
        "choice4": "Fries",
        "answer": 2
      },
      {
        "question":"What was Stan Lee’s cameo in Avengers: Infinity War?",
        "choice1": "Bartender",
        "choice2": "FedEx Delivery Guy",
        "choice3": "Librarian",
        "choice4": "School Bus Driver",
        "answer": 4
      },
      {
        "question":"How many infinity stones exist in the MCU?",
        "choice1": "5",
        "choice2": "6",
        "choice3": "7",
        "choice4": "4",
        "answer": 2
      },
      {
        "question":"How does Yondu control his arrow in Guardians of the Galaxy?",
        "choice1": "Clapping",
        "choice2": "Tapping",
        "choice3": "Whistling",
        "choice4": "Shouting",
        "answer": 3
      },
      {
        "question":"In which MCU movie did Spiderman make his first appearance?",
        "choice1": "Avengers: Infinity War",
        "choice2": "Avengers: Endgame",
        "choice3": "Spiderman: Homecoming",
        "choice4": "Captain America - Civil War",
        "answer": 4
      },
      {
        "question":"In which of the following MCU movIe the term ‘Infinity Stone’ was first introduced?",
        "choice1": "Captain America: The First Avenger",
        "choice2": "Avengers:Age of Ultron",
        "choice3": "Thor: The Dark World",
        "choice4": "Guardians of the Galaxy",
        "answer": 1
      },
      {
        "question":"Which hero is considered as “The First Avenger?”",
        "choice1": "Captain America",
        "choice2": "Iron Man",
        "choice3": "Batman",
        "choice4": "Dr. America",
        "answer": 1
      },
      {
        "question":"What name did Black Widow use when first introduced to Tony Stark in Iron Man 2?",
        "choice1": "Natalia Ramanoff",
        "choice2": "Natalie Russel",
        "choice3": "Natalia Roman",
        "choice4": "Natalie Rushman",
        "answer": 4
      },
      {
        "question":"Which of these characters is NOT an original Avenger?",
        "choice1": "Captain America",
        "choice2": "Thor",
        "choice3": "Scarlet Witch",
        "choice4": "Black Widow",
        "answer": 3
      },
      {
        "question":"What's Captain America’s shield made of?",
        "choice1": "Adamantium",
        "choice2": "Vibranium",
        "choice3": "Promethium",
        "choice4": "Carbonadium",
        "answer": 2
      },
      {
        "question":"Who does Captain America give his shield to in Avengers: Endgame?",
        "choice1": "Sam Wilson",
        "choice2": "Bucky Barnes",
        "choice3": "Tony Stark",
        "choice4": "Bruce Banner",
        "answer": 3
      }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = (req,res) => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    window.location.href = "/end";
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
