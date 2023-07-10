var notes = ['C', 'C-sharp', 'D', 'D-sharp', 'E', 'F', 'F-sharp', 'G', 'G-sharp', 'A', 'A-sharp', 'B'];
var questions = [];

// Generate random questions
for (var i = 0; i < 20; i++) {
  var randomNote = notes[Math.floor(Math.random() * notes.length)];
  var options = [randomNote];
  while (options.length < 5) {
    var randomOption = notes[Math.floor(Math.random() * notes.length)];
    if (!options.includes(randomOption)) {
      options.push(randomOption);
    }
  }
  var shuffledOptions = shuffle(options);
  questions.push({ note: randomNote, options: shuffledOptions });
}

var currentQuestion = 0;
var score = 0;

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function playNote() {
  var note = questions[currentQuestion].note;
  var audio = new Audio(note + '.mp3');
  audio.play();

  document.getElementById('submitButton').style.display = 'block';
  document.getElementById('playButton').disabled = true;
}

function submitAnswer() {
  var selectedValue = document.querySelector('input[name="note"]:checked').value;

  if (selectedValue === questions[currentQuestion].note) {
    score += 5;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    var percentage = (score / (questions.length * 5)) * 100;
    document.getElementById('questionContainer').innerHTML = '<h2>You have a ' + percentage + '% accuracy in identifying pitches!</h2>';
  }
}

function showQuestion() {
  var question = questions[currentQuestion];
  var options = shuffle(question.options);

  document.getElementById('questionNumber').textContent = 'Question ' + (currentQuestion + 1);
  document.getElementById('option1').value = options[0];
  document.getElementById('option2').value = options[1];
  document.getElementById('option3').value = options[2];
  document.getElementById('option4').value = options[3];
  document.getElementById('option5').value = options[4];

  var labels = document.getElementsByTagName('label');
  for (var i = 0; i < labels.length; i++) {
    labels[i].textContent = String.fromCharCode(65 + i) + '. ' + options[i];
  }

  document.querySelector('input[name="note"]:checked').checked = false;
  document.getElementById('playButton').disabled = false;
  document.getElementById('submitButton').style.display = 'none';
}

showQuestion();
