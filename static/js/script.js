// Challenge 1: Your Age in Days

function ageInDays() {
  var birthYear = prompt('What year were you born mate ?');
  var ageInDayss = (2021 - birthYear) * 365;
  var h1 = document.createElement('h1');
  var textAnswer = document.createTextNode('You are ' + ageInDayss + ' days old');
  h1.setAttribute('id', 'ageInDays');
  h1.appendChild(textAnswer);
  document.getElementById('flex-box-result').appendChild(h1);
}

function reset () {
  document.getElementById('ageInDays').remove();
}

//Challenge 2: Cat Generator

function generateCat() {
  var image = document.createElement('img');
  var div = document.getElementById('flex-cat-gen');
  image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small"
  div.appendChild(image);
}

//Challenge 3: Rock, Paper, Scissors

function rpsGame(yourChoice) {
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randomRps());
  results = decideWinner(humanChoice, botChoice);
  message = finalMessage(results);
  rpsFrontEnd(yourChoice.id, botChoice, message);
  
} 

function randomRps() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice) {
  var rpsDb = {
    'rock': {'scissors':1, 'rock':0.5, 'paper':0},
    'paper': {'rock':1, 'paper':0.5, 'scissors':0},
    'scissors': {'paper':1, 'scissors':0.5, 'rock':0}
  }

  var yourScore = rpsDb[yourChoice][computerChoice];
  var computerScore = rpsDb[computerChoice][yourChoice];

  return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return {'message': 'Mampus', 'color': 'red'};
  } else if (yourScore === 0.5) {
    return {'message': 'Seri', 'color': 'gray'};
  } else {
    return {'message': 'Hore', 'color': 'black'};
  }
}

function rpsFrontEnd(humanImg, botImg, finalMessage) {
  var imagesDb = {
    'rock': document.getElementById('rock').src,
    'paper': document.getElementById('paper').src,
    'scissors': document.getElementById('scissors').src
  }

  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissors').remove();

  var humanDiv = document.createElement('div');
  var messageDiv = document.createElement('div');
  var botDiv = document.createElement('div');

  humanDiv.innerHTML = "<img src='" + imagesDb[humanImg] + "' height=150 width=150 style='box-shadow: 0px 10px 58px rgba(37, 58, 223, 1);'>"
  messageDiv.innerHTML = "<h1 style='color " + finalMessage['color'] + "; font-size: 50px; padding: 30px; '>" + finalMessage['mesage'] + "</h1>"
  botDiv.innerHTML = "<img src='" + imagesDb[botImg] + "' height=150 width=150 style='box-shadow: 0px 10px 58px rgba(243, 38, 24, 1);'>"
  

  document.getElementById('flex-box-rps-div').appendChild(humanDiv);
  document.getElementById('flex-box-rps-div').appendChild(messageDiv);
  document.getElementById('flex-box-rps-div').appendChild(botDiv);
}