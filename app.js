function questionAndAnswers (question, rightAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3, explanation) {
  return {
    question: question,
    answers: [rightAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3],
    explanation: explanation
  };
}

questionsAndAnswers=[
questionAndAnswers("Who was Abraham's father?", "Terah", "Lot", "Moses", "Noah", "Terah was Abraham's father (Genesis 11:27).  Lot was his nephew, Moses was his descendant, and Noah was a far earlier ancestor."),
questionAndAnswers("Which of the following is not one of the Ten Commandments?", "The ban on homosexuality", "The ban on idolatry", "Honor your parents", "The ban on adultery", "The ban on homosexuality is found in Leviticus chapters 18 and 20, not in the ten commandments (Exodus 20)."),
questionAndAnswers("Which of the following offerings is primarily eaten by a priest?", "An offering brought in atonement for swearing falsely about robbery", "A flour-offering brought by a priest", "An offering brought in thanksgiving", "A deer brought as an offering", "Someone who swears falsely about robbery brings a guilt-offering (Leviticus 5:20-26), and guilt-offerings are eaten by the priests (7:6).  Flour-offerings are normally eaten by the priests, but when brought by a priest, are entirely burnt (6:16).  Offerings brought in thanksgiving are eaten by whomever brings them, with the priest recieving a small portion (7:11-15).  Deer cannot be brought for offerings at all."),
questionAndAnswers("When the Israelites traveled through the desert, which tribe led the first group to travel?", "Judah", "Simeon", "Reuben", "Dan", "Judah led the first group to travel (Numbers 10:14); Reuben led the second group to travel, which also contained Simeon, and Dan led the last group."),
questionAndAnswers("When the Israelites entered the land of Canaan, they declared a set of blessings and curses.  Which mountain was used for the curses?", "Mount Ebal", "Mount Gerizim", "Mount Nebo", "Mount Carmel", "Mount Ebal was used for the curses (Deuteronomy 11:29).  Mount Gerizim was used for the blessings (ibid), Mount Nebo is where Moses died and was buried (Deuteronomy 34), and Mount Carmel is where Elijah faced off against the prophets of the Ba'al centuries later (I Kings 18)."),
questionAndAnswers("Which of the following was not a judge in the book of Judges?", "Ahab", "Deborah", "Ehud", "Samson", "Ehud (Judges 3:12-30), Deborah (chapters 4-5), and Samson (13-16) were all judges.  Ahab was a king (I Kings 16:29-22:40)."), 
questionAndAnswers("Who was the first king of Israel?", "Saul", "David", "Gideon", "Samuel", "Saul was the first king of Israel (I Samuel 13:1).  David was his successor.  Samuel was his predecessor, but not a king, and the judge Gideon was offered the kingship but did not accept it."), 
questionAndAnswers("According to the prophet Isaiah, a ___ will lie down with a ___.", "leopard, kid", "wolf, sheep", "bear, cow", "lion, lamb", "In Isaiah 11:6-8, several statements of this form are made, with varying animals and actions.  Lying down (or crouching) is used with leopard/kid.  The wolf/sheep pair speaks of dwelling together, and cow/bear speaks of grazing.  Lions are also paired with cattle, stating that both will equally eat grain."), 
questionAndAnswers("What was the hometown of the prophet Jeremiah?", "Anathoth", "Jerusalem", "Bethlehem", "Hebron", "Jeremiah hailed from Anathoth (Jeremiah 1:1), a city near Jerusalem."),
questionAndAnswers("Who interpreted the writing on the wall?", "Daniel", "Jeremiah", "Moses", "Joseph", "The incident with the writing on the wall is found in Daniel chapter 5; Daniel interpreted it for the Babylonian king Belshazzar.")];

state = {
  questionOrder: null,
  currentAnswerOrder: null,
  currentRight: 0,
  currentWrong: 0,
  currentQuestionNumber: null,  //Runs from 0 to 9
  selectedAnswer: null,  //Values are null, or 0-3
  showingExplanation: false
};

function randomArray (n) {
  result=[];
  for (var i = 0; i < n; ++i) result.push(i);
  for (var i = 0; i < n; ++i) {
    var swapLocation = Math.floor(Math.random()*(n-i))+i;
    var temp = result[i];
    result[i] = result[swapLocation];
    result[swapLocation] = temp;
  }
  return result;
}

//setters

function randomizeQuestionOrder () {
  state.questionOrder=randomArray(questionsAndAnswers.length);
}

function randomizeCurrentAnswerOrder() {
  state.currentAnswerOrder=randomArray(getCurrentQuestionObject().answers.length);
}

function incrementCurrentRightOrWrong(isRight) {
  if (isRight) ++state.currentRight;
  else ++state.currentWrong;
}

function setSelectedAnswer(value) {
  state.selectedAnswer=value;
}

function beginQuiz() {
  randomizeQuestionOrder();
  state.currentAnswerOrder=null;
  state.currentRight=0;
  state.currentWrong=0;
  state.currentQuestionNumber=0;
  state.selectedAnswer=null;
  state.showingExplanation=false;
  randomizeCurrentAnswerOrder();
}

function readyNextQuestion () {
  ++state.currentQuestionNumber;
  state.showingExplanation=false;
  state.selectedAnswer=null;
  randomizeCurrentAnswerOrder();
}

function setShowingExplanation(bool) {
  state.showingExplanation=bool;
}

//getters

function getCurrentQuestionNumber () {
  return state.currentQuestionNumber;
}

function getCurrentQuestionObject () {
  return questionsAndAnswers[state.questionOrder[getCurrentQuestionNumber()]];
}

function getCurrentQuestion() {
  return getCurrentQuestionObject().question;
}

function getAnswerText(n) {
  return getCurrentQuestionObject().answers[state.currentAnswerOrder[n]];
}

function getCurrentAnswerAccuracy () {
  return state.currentAnswerOrder[state.selectedAnswer]==0;
}

function getExplanation() {
  return getCurrentQuestionObject().explanation;
}

function getCurrentRight() {
  return state.currentRight;
}

function getCurrentWrong() {
  return state.currentWrong;
}

function getSelectedAnswer () {
  return state.selectedAnswer;
}

function isShowingExplanation () {
  return state.showingExplanation;
}

//state-html interface (jquery)

function displayQuestion () {
  $(".js-question-counter").text(getCurrentQuestionNumber()+1);
  $(".js-question").text(getCurrentQuestion());
  $(".js-answers label").text(getAnswerText); //getAnswerText is passed which number answer it is.
  $(".quiz-submit").text("Submit Answer");
  $(".js-quiz-form input").prop("checked", false);
  $(".js-answer-result, .js-explanation").addClass("hidden");
  $(".submit-answer").removeClass("hidden");
  $(".js-num-right, .js-num-wrong").text("0");
}

function displayResult (correctResult) {
  if (getCurrentQuestionNumber()<questionsAndAnswers.length-1) $(".js-next-question").text("Next Question");
  else $(".js-next-question").text("Final Score");
  $(".js-answer-result, .js-explanation").removeClass("hidden");
  $(".js-answer-echo").text(getAnswerText(getSelectedAnswer()));
  if (correctResult) $(".js-answer-validity").removeClass("wrong").addClass("right").
    text("correct");
  else $(".js-answer-validity").removeClass("right").addClass("wrong").text("incorrect");
  $(".js-explanation").text(getExplanation());
  $(".submit-answer").addClass("hidden");
  if (correctResult) $(".js-num-right").text(getCurrentRight());
  else $(".js-num-wrong").text(getCurrentWrong());
}

function displayCompletion () {
  console.log("foo");
  $(".js-quiz-page").addClass("hidden");
  $(".js-results-page").removeClass("hidden");
  $(".total-right").text(getCurrentRight());
}

$(".js-start-page, .js-results-page").submit(
  function () {
    $(this).addClass("hidden");
    $(".js-quiz-page").removeClass("hidden");
    //$(.js-total-questions).text(questionsAndAnswers.length);  -For different quiz lengths.
    beginQuiz();
    displayQuestion();
    return false;
  }
)

$(".js-quiz-form").submit (
  function () {
    if (isShowingExplanation()) {
      if (getCurrentQuestionNumber()<questionsAndAnswers.length-1) {
        readyNextQuestion();
        displayQuestion();
      }
      else displayCompletion();
    }
    else {
      setSelectedAnswer($(".js-quiz-form input:checked").val());
      if (getSelectedAnswer()) {
        setShowingExplanation(true);
        incrementCurrentRightOrWrong(getCurrentAnswerAccuracy());
        displayResult(getCurrentAnswerAccuracy());
        if (!getCurrentAnswerAccuracy()) {
        }
      }
    }
    return false;
  }
)