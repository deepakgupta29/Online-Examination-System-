// ================= QUESTIONS =================

const questions = [

    {
        question: "Which language is mainly used to structure a web page?",
        options: [
            "CSS",
            "HTML",
            "JavaScript",
            "Java"
        ],
        answer: 1
    },

    {
        question: "Which language is used for designing a web page?",
        options: [
            "HTML",
            "CSS",
            "Java",
            "Python"
        ],
        answer: 1
    },

    {
        question: "Which language is used to add functionality to a web page?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        answer: 2
    },

    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: [
            "variable",
            "var",
            "integer",
            "declare"
        ],
        answer: 1
    },

    {
        question: "Which symbol is used for a single-line comment in JavaScript?",
        options: [
            "/* */",
            "//",
            "#",
            "<!-- -->"
        ],
        answer: 1
    }

];


// ================= VARIABLES =================

let currentQuestion = 0;

let userAnswers = [];

let studentName = "";

let rollNumber = "";

let timeLeft = 300;

let timerInterval;


// ================= START EXAM =================

function startExam() {

    studentName =
        document.getElementById("studentName").value.trim();

    rollNumber =
        document.getElementById("rollNumber").value.trim();


    if (studentName === "" || rollNumber === "") {

        document.getElementById("loginError").innerText =
            "Please enter your name and roll number.";

        return;
    }


    // Reset answers

    userAnswers = new Array(questions.length).fill(null);

    currentQuestion = 0;

    timeLeft = 300;


    // Display student information

    document.getElementById("studentInfo").innerText =
        "Student: " + studentName +
        " | Roll No: " + rollNumber;


    // Change page

    document.getElementById("loginPage").classList.add("hidden");

    document.getElementById("examPage").classList.remove("hidden");


    // Create question navigation

    createQuestionButtons();


    // Display first question

    displayQuestion();


    // Start timer

    startTimer();
}


// ================= DISPLAY QUESTION =================

function displayQuestion() {

    const question = questions[currentQuestion];


    document.getElementById("questionNumber").innerText =
        currentQuestion + 1;

    document.getElementById("totalQuestions").innerText =
        questions.length;


    document.getElementById("questionText").innerText =
        question.question;


    const optionsContainer =
        document.getElementById("optionsContainer");


    optionsContainer.innerHTML = "";


    question.options.forEach((option, index) => {

        const label = document.createElement("label");

        label.className = "option";


        label.innerHTML = `
            <input
                type="radio"
                name="answer"
                value="${index}"
                onchange="saveAnswer(${index})"
                ${userAnswers[currentQuestion] === index ? "checked" : ""}
            >

            ${option}
        `;


        optionsContainer.appendChild(label);

    });


    // Previous button

    document.getElementById("previousBtn").disabled =
        currentQuestion === 0;


    // Next button

    if (currentQuestion === questions.length - 1) {

        document.getElementById("nextBtn").style.display =
            "none";

    } else {

        document.getElementById("nextBtn").style.display =
            "block";
    }


    updateQuestionButtons();
}


// ================= SAVE ANSWER =================

function saveAnswer(answer) {

    userAnswers[currentQuestion] = answer;

    updateQuestionButtons();
}


// ================= NEXT QUESTION =================

function nextQuestion() {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        displayQuestion();
    }
}


// ================= PREVIOUS QUESTION =================

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        displayQuestion();
    }
}


// ================= QUESTION NAVIGATION =================

function createQuestionButtons() {

    const container =
        document.getElementById("questionNumbers");


    container.innerHTML = "";


    questions.forEach((question, index) => {

        const button =
            document.createElement("button");


        button.className = "question-btn";

        button.innerText = index + 1;


        button.onclick = function () {

            currentQuestion = index;

            displayQuestion();

        };


        container.appendChild(button);

    });
}


// ================= UPDATE QUESTION BUTTONS =================

function updateQuestionButtons() {

    const buttons =
        document.querySelectorAll(".question-btn");


    buttons.forEach((button, index) => {

        button.classList.remove("active");

        button.classList.remove("answered");


        if (index === currentQuestion) {

            button.classList.add("active");

        }


        if (userAnswers[index] !== null) {

            button.classList.add("answered");

        }

    });
}


// ================= TIMER =================

function startTimer() {

    clearInterval(timerInterval);


    timerInterval = setInterval(function () {

        let minutes =
            Math.floor(timeLeft / 60);

        let seconds =
            timeLeft % 60;


        document.getElementById("timer").innerText =

            String(minutes).padStart(2, "0")
            + ":" +
            String(seconds).padStart(2, "0");


        timeLeft--;


        if (timeLeft < 0) {

            clearInterval(timerInterval);

            alert("Time is over! Your exam will be submitted.");

            submitExam();
        }


    }, 1000);
}


// ================= SUBMIT EXAM =================

function submitExam() {

    clearInterval(timerInterval);


    let confirmSubmit =
        confirm("Are you sure you want to submit the exam?");


    if (!confirmSubmit) {

        // Restart timer if user cancels

        startTimer();

        return;
    }


    calculateResult();
}


// ================= CALCULATE RESULT =================

function calculateResult() {

    let correct = 0;


    questions.forEach((question, index) => {

        if (userAnswers[index] === question.answer) {

            correct++;
        }

    });


    let total = questions.length;

    let wrong = total - correct;

    let percentage =
        (correct / total) * 100;


    // Hide exam

    document.getElementById("examPage")
        .classList.add("hidden");


    // Show result

    document.getElementById("resultPage")
        .classList.remove("hidden");


    // Result information

    document.getElementById("resultStudent").innerText =
        "Student: " + studentName +
        " | Roll No: " + rollNumber;


    document.getElementById("score").innerText =
        correct + "/" + total;


    document.getElementById("resultTotal").innerText =
        total;


    document.getElementById("correctAnswers").innerText =
        correct;


    document.getElementById("wrongAnswers").innerText =
        wrong;


    document.getElementById("percentage").innerText =
        percentage.toFixed(2) + "%";


    // Result message

    if (percentage >= 80) {

        document.getElementById("resultMessage").innerText =
            "Excellent Performance!";

    } else if (percentage >= 60) {

        document.getElementById("resultMessage").innerText =
            "Good Performance!";

    } else if (percentage >= 40) {

        document.getElementById("resultMessage").innerText =
            "You Passed!";

    } else {

        document.getElementById("resultMessage").innerText =
            "Better Luck Next Time!";

    }
}


// ================= RESTART EXAM =================

function restartExam() {

    clearInterval(timerInterval);


    document.getElementById("resultPage")
        .classList.add("hidden");


    document.getElementById("loginPage")
        .classList.remove("hidden");


    document.getElementById("studentName").value = "";

    document.getElementById("rollNumber").value = "";

    document.getElementById("loginError").innerText = "";

}
