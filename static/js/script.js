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

function reset() {
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
  // console.log(yourChoice);
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;

  botChoice = numberToChoice(randToRpsInt());
  // console.log('Computer choice:', botChoice);

  results = decideWinner(humanChoice, botChoice);
  // console.log(results);

  message = finalMessage(results);
  // console.log(message);

  rpsFrontEnd(yourChoice.id, botChoice, message)
}

function randToRpsInt() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice) {
  var rpsDatabase = {
    'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0 },
    'paper': { 'rock': 1, 'paper': 0.5, 'scissors': 0 },
    'scissors': { 'paper': 1, 'scissors': 0.5, 'rock': 0 }
  }

  var yourScore = rpsDatabase[yourChoice][computerChoice];
  var computerScore = rpsDatabase[computerChoice][yourChoice];

  return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { 'message': 'Dumb!', 'color': 'red' };
  } else if (yourScore === 0.5) {
    return { 'message': 'You Tied!', 'color': 'yellow' };
  } else {
    return { 'message': 'Not Bad!', 'color': 'green' };
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  var imagesDatabase = {
    'rock': document.getElementById('rock').src,
    'paper': document.getElementById('paper').src,
    'scissors': document.getElementById('scissors').src
  }

  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissors').remove();

  var humanDiv = document.createElement('div');
  var botDiv = document.createElement('div');
  var messageDiv = document.createElement('div');

  // console.log('ini ' + imagesDatabase)

  humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
  messageDiv.innerHTML = "<h1 style='color " + finalMessage['color'] + "; font-size: 50px; padding:30px; '>" + finalMessage['message'] + "</h1>"
  botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"

  document.getElementById('flex-box-rps-div').appendChild(humanDiv);
  document.getElementById('flex-box-rps-div').appendChild(messageDiv);
  document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

// Challenge 4: BlackJack

let blackjackGame = {
  'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
  'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
  'cards': ['2_a', '2_b', '2_c', '2_d', '3_a', '3_b', '3_c', '3_d', '4_a', '4_b', '4_c', '4_d',
    '5_a', '5_b', '5_c', '5_d', '6_a', '6_b', '6_c', '6_d', '7_a', '7_b', '7_c', '7_d',
    '8_a', '8_b', '8_c', '8_d', '9_a', '9_b', '9_c', '9_d', '10_a', '10_b', '10_c', '10_d',
    '11_a', '11_b', '11_c', '11_d', '12_a', '12_b', '12_c', '12_d', '13_a', '13_b', '13_c', '13_d',
    '14_a', '14_b', '14_c', '14_d'],
  'cardsMap': {
    '2_a': 2, '2_b': 2, '2_c': 2, '2_d': 2, '3_a': 3, '3_b': 3, '3_c': 3, '3_d': 3, '4_a': 4, '4_b': 4, '4_c': 4, '4_d': 4,
    '5_a': 5, '5_b': 5, '5_c': 5, '5_d': 5, '6_a': 6, '6_b': 6, '6_c': 6, '6_d': 6, '7_a': 7, '7_b': 7, '7_c': 7, '7_d': 7,
    '8_a': 8, '8_b': 8, '8_c': 8, '8_d': 8, '9_a': 9, '9_b': 9, '9_c': 9, '9_d': 9, '10_a': 10, '10_b': 10, '10_c': 10, '10_d': 10,
    '11_a': 10, '11_b': 10, '11_c': 10, '11_d': 10, '12_a': 10, '12_b': 10, '12_c': 10, '12_d': 10, '13_a': 10, '13_b': 10, '13_c': 10, '13_d': 10,
    '14_a': [1, 11], '14_b': [1, 11], '14_c': [1, 11], '14_d': [1, 11]
  },
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
  let card = randomCard();
  // console.log(card);
  showCard(card, YOU);
  updateScore(card, YOU);
  showScore(YOU);
  // console.log(YOU['score']);
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 53);
  return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
  if (activePlayer['score'] <= 21) {
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal() {
  let winner = computeWinner();
  showResult(winner);
  // showResult(computeWinner());
  let yourImages = document.querySelector('#your-box').querySelectorAll('img');
  let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
  // console. log(yourImages);
  for (i = 0; i < yourImages.length; i++) {
    yourImages[i].remove();
  }

  for (i = 0; i < dealerImages.length; i++) {
    dealerImages[i].remove();
  }

  YOU['score'] = 0;
  DEALER['score'] = 0;

  document.querySelector('#your-blackjack-result').textContent = 0;
  document.querySelector('#dealer-blackjack-result').textContent = 0;

  document.querySelector('#your-blackjack-result').style.color = '#ffff';
  document.querySelector('#dealer-blackjack-result').style.color = '#ffff';
}

function updateScore(card, activePlayer) {
  if (card === '14_a' || card === '14_b' || card === '14_c' || card === '14_d') {
    if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
      activePlayer['score'] += blackjackGame['cardsMap'][card][1];
    } else {
      activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }

  } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer['score'] > 21) {
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
  } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  }
}

function dealerLogic() {
  let card = randomCard();
  showCard(card, DEALER);
  updateScore(card, DEALER);
  showScore(DEALER);
}

function computeWinner() {
  let winner;

  if (YOU['score'] <= 21) {
    if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
      console.log('You Won!');
      winner = YOU;

    } else if (YOU['score'] < DEALER['score']) {
      console.log('You Lost!');
      winner = DEALER;

    } else if (YOU['score'] === DEALER['score']) {
      console.log('You Drew!');
    }

  } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
    console.log('You Lost!');
    winner = DEALER;

  } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
    console.log('You Drew!');
  }

  return winner;
}

function showResult(winner) {
  let message, messageColor;

  if (winner === YOU) {
    message = 'You Won!';
    messageColor = 'green';
    winSound.play();

  } else if (winner === DEALER) {
    message = 'You Lost!';
    messageColor = 'red';
    lossSound.play();

  } else {
    message = 'You drew!';
    messageColor = 'black';
  }

  document.querySelector('#blackjack-result').textContent = message;
  document.querySelector('#blackjack-result').style.color = messageColor;
}