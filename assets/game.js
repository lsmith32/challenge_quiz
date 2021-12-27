var questions = [
    {
        title: "Which serial killer also worked at a suicide hotline center?",
        choices: ["Jeffery Dahmer", "Ed Gein", "Ted Bundy", "John Wayne Gacy"],
        answer: "Ted Bundy"
    },
    {
        title: "Which woman is thought to be the first female serial killer in America?",
        choices: ["Lavina Fisher", "Aileen Wuormos", "Belle Gunnes", "Jane Toppan"],
        answer: "Lavina Fisher"
    },
    {
        title: "Where was H. H. Holmes's Muder Castle located?",
        choices: ["Milwaukee, Wisconsin", "Boston, Massachusetts", "Chicago, Illinois", "San Fransisco, California"],
        answer: "Chicago, Illinois"
    },
    {
        title: "Dennis Rader's self choosen moniker was the ______ killer.",
        choices: ["Axe", "BTK", "Dating Game", "Interstate"],
        answer: "BTK"
    },
    {
        title: "How many murders was Jeffery Dahmer convicted of?",
        choices: ["22", "9", "13", "16"],
        answer: "16"
    },
];
// Declared variables
var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

// Seconds left is 15 seconds per question:
var secondsLeft = 76;
// Holds interval time
var holdInterval = 0;
var penalty = 10;
// Creates new element
var ulCreate = document.createElement("ul");

// Triggers timer on button, shows user a display on the screen
timer.addEventListener("click", function () {
    // We are checking zero because its originally set to zero
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time left: " + secondsLeft;
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Renders questions and choices to page: 
function render(questionIndex) {
    //clears data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop through all info in array
    for (var i = 0; i < questions.length; i++) {
        // changes question title only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// varify choice with answer
function compare(event) {
    var element = event.target;
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            // Correct
        } else {
            // deducts 5 seconds if incorrect
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }
    }
    // Question Index
    questionIndex++;
    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "Out of Time!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
}
// All done will append last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";
    //heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"
    questionsDiv.appendChild(createH1);
    //Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    questionsDiv.appendChild(createP);
    //calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;
        questionsDiv.appendChild(createP2);
    }

 // Label
 var createLabel = document.createElement("label");
 createLabel.setAttribute("id", "createLabel");
 createLabel.textContent = "Enter your initials: ";
 questionsDiv.appendChild(createLabel);
 //Input
 var createInput = document.createElement("input");
 createInput.setAttribute("type", "text");
 createInput.setAttribute("id", "initials");
 createInput.textContent = "";
 questionsDiv.appendChild(createInput);
 //submit
 var createSubmit = document.createElement("button");
 createSubmit.setAttribute("type", "submit");
 createSubmit.setAttribute("id", "Submit");
 createSubmit.textContent = "Submit";
 questionsDiv.appendChild(createSubmit);
 //saves initials and score to local storage
 createSubmit.addEventListener("click", function () {
     var initials = createInput.value;
     if (initials === null) {
         console.log("Please enter initials");
     } else {
         var finalScore = {
             initials: initials,
             score: timeRemaining
         }
         console.log(finalScore);
         var allScores = localStorage.getItem("allScores");
         if (allScores === null) {
             allScores = [];
         } else {
             allScores = JSON.parse(allScores);
         }
         allScores.push(finalScore);
         var newScore = JSON.stringify(allScores);
         localStorage.setItem("allScores", newScore);
         // Travels to final page
         window.location.replace("./assets/highscore.html");
     }
 });
}