//Array of Quiz question and answers
const questions=[{
    question:"What is the capital of India?",
    answers: [
        { text: "New Delhi", correct: true },
        { text: "Mumbai", correct: false },
        { text: "Kolkata", correct: false },
        { text: "Chennai", correct: false },

    ]
},
    {
        question: "Who is the founder of the Microsoft?",
        answers: [
            { text: "Steve Jobs", correct: false },
            { text: "Bill Gates", correct: true },
            { text: "Mark Zukerberg", correct: false },
            { text: "Elon Musk", correct: false },
        ]
},
{
    question:"HTML Stands for?",
    answers:[
        {text:"Hyper Text Makeup Language" ,correct:false},
        {text:"Hyper Tech Makeup Language" ,correct:false},
        {text:"Hyper Text Markup Language" ,correct:true},
        {text:"Hyper Tool Makeup Language" ,correct:false},
    ]
}


];
//Grabbing HTML elements by their IDs
const questionElement=document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");
const resultContainer=document.getElementById("result");
//Variables to track quiz progress and score
let currentQuestionIndex=0;
let score=0;
//this function starts the quiz
function startQuiz(){
    currentQuestionIndex=0;//reset question index
    score=0;//Reset score
    nextButton.innerText="Next";//Set button text
    resultContainer.innerHTML="";//Clear previous result
    showQuestion();//Show first Question

}
//This function shows the current question and its answer
function showQuestion(){
    resetState();//Clear previous Button and hide next
    const currentQuestion=questions[currentQuestionIndex];//Get current question
    questionElement.innerText=currentQuestion.question;//Set Question text
    //Loop through each answer and create a button 
    currentQuestion.answers.forEach(answer => {
        const button= document.createElement("button");//Create button 
        button.innerText=answer.text;//Set button text
        button.classList.add("btn");//Add class for styling
        //Add event listner to handle answer click
        button.addEventListener("click",()=> selectAnswer(button,answer.correct));
        answerButtons.appendChild(button);//Add button to the container


    });
}
//This function clears previous buttons and hides next button
function resetState(){
    nextButton.style.display="none";//hide next button
    //Remove all previous  answer buttons
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);

    }
}
//This function runs when a user selects an answer
function selectAnswer(button, correct) {
    const allButtons = answerButtons.querySelectorAll("button");
    //Disabled all buttons and mark them correct/ wrong

    allButtons.forEach(btn => {
        btn.disabled = true;//Disabled Button after answer
        const answer = questions[currentQuestionIndex].answers.find(a => a.text === btn.innerText);
        btn.classList.add(answer.correct ? "correct" : "wrong");//Add class
    });

    if (correct) score++;//If user was correct increase the score
    nextButton.style.display = "inline-block";//Show next button
}
//When next button is clicked

nextButton.addEventListener("click",()=>{
    currentQuestionIndex++;//Move to next question
    if(currentQuestionIndex<questions.length){
        showQuestion();//Show next Question

    }
    else{
        showScore();//If no more questions,show final score
    }
});
//This function displays the final score
function showScore(){
    resetState();//Clear all options
    questionElement.innerText="Quiz Completed";//Show completion message
    resultContainer.innerHTML=`Your Score:${score}/${questions.length}`;//display score
    nextButton.innerText="Restart";//Change button to Restart
    nextButton.style.display="inline-block";//Show Restart button
    nextButton.onclick=startQuiz;//Set restart handler

}
//Start the quiz when the page loads
startQuiz();