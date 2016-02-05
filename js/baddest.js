
var enemies = [
    {name: 'a', img: '', health: 10},
    {name: 's', img: '', health: 20},
    {name: 'd', img: '', health: 30},
    {name: 'f', img: '', health: 40},
    {name: 'x', img: '', health: 50},
    {name: 'z', img: '', health: 60},
    {name: 'w', img: '', health: 70}
];

var monsterPicks = [
    {name: 'Bat', img: 'img/dark.gif', health: 110, moves: 10, points: 0},
    {name: 'Slime', img: 'img/slime.gif', health: 220, moves: 10, points: 0},
    {name: 'Octo', img: 'img/octo.gif', health: 330, moves: 10, points: 0}
];

function Monster(monster) {

  this.monster = monster;

}

Monster.prototype.attack = function(){
   //current enemy takes damage, modified by attackers strength
   game.currentEnemy.takeDamage(str);

};

Monster.prototype.takeDamage = function(){

};

//infinitely inscreases health, need to put roof on health
Monster.prototype.heal = function(){

  var addHealth = Math.floor(Math.random() * 25) + 25;
  this.player.health = this.player.health + addHealth;

};

Monster.prototype.isDead = function(){

};

for (var i = 0, newArray = []; i < enemies.length; i++){

  var newEnemy = new Monster(enemies[i].name, enemies[i].img, enemies[i].health);
  newArray.push(newEnemy);

}

var randomEnemy = Math.floor(Math.random() * newArray.length) + 1;

var game = {

  //maybe combine into an array in natural order, player1 = array[0]
  //player2 = array[1], random enemy = array[2] and .pop()s when dead?
  player1: '',
  player2: '',
  currentEnemy: '',
  currentPlayer: '',

  start: function(){
    game.player1 = false;
    game.player2 = false;
    game.currentEnemy = '';
    game.currentPlayer = 1; //move to after?

    $('#game').children().remove();
    $('#text').text('Player 1, pick a monster!');

    //generates monster images and onclicks
    for (var i = 0; i < monsterPicks.length; i++){

      $('#game').append('<div class="monster"><img src="monster' + i + '" id="monster' + i + '" data="' + i + '"></div>');

      var $monster = $('#monster' + i);

      $monster.attr('src', monsterPicks[i].img);
      $monster.click(function(){

        if(game.player2){
          //executed when player 2 picks a monster
          //should move to game board here
          game.player2 = monsterPicks[$(this).attr('data')];
          $(this).hide();
          gameBoard.start();

        } else {//??
          //executed when player 1 picks a monster
          $('#text').text('Player 2, pick a monster!')
          game.player1 = monsterPicks[$(this).attr('data')];
          game.player2 = true;
          $(this).hide();
        }

      });

    }

  },

  //calculates each player's score
  winner: function(){
    if (game.player1.points > game.player2.points){
      $('#text').text('Player 1 wins!');
    } else {
      $('#text').text('Player 2 wins!');
    }
  },

};

var gameBoard = {

  board: [ 0, 0, 0, 0, 0, 0, 0, 0 ],

  playerPosition1: '',
  playerPosition2: '',

  start: function(){

    $('#game').children().remove();

    $('#game').append('<div id="moves"></div>');

    //generates map
    $('#game').append('<div id="box1"></div><div id="box2"></div><div id="box3"></div>')
    $('#game').css('display', 'block');

    var boardLength = this.board.length;
    //creates lands and click events
    for (var i = 0; i < boardLength; i++){

      if((i % 3) === 0){
        var box = 3;
      } else {
        var box = (i % 3);
      }

      $('#box' + box).append('<div class="land" id="land' + i + '" data="' + i + '">');

      $('#land' + i).click(gameBoard.move);

      }

    //set players to starting positions.
    this.board[0] = 1;
    this.board[7] = 2;
    this.playerPosition1 = this.board.indexOf(1);
    this.playerPosition2 = this.board.indexOf(2);

    this.renderPositions();
    this.renderUi();

  },
  //can move anywhere
  //players stop being able to move after 0 moves, but game doesn't end
  //players can move to the same location they are on and it take movement points away
  move: function(){

    if ((game.currentPlayer === 1) && (game.player1.moves > 0)){

      var playerToken = $('#land' + gameBoard.playerPosition1.toString());
      playerToken.css('background-image', 'url("")');

      gameBoard.playerPosition1 = $(this).attr('data');
      game.currentPlayer = 2;
      game.player1.moves--;
      var moves1 = game.player1.moves;
      moves1--;
      var moves2 = game.player2.moves;
      //doesn't work
      if((moves1 + moves2) === 0){
        game.winner();
      }

    } else if ((game.currentPlayer === 2) && (game.player2.moves > 0)){

      var playerToken = $('#land' + gameBoard.playerPosition2.toString());
      playerToken.css('background-image', 'url("")');

      gameBoard.playerPosition2 = $(this).attr('data');
      game.currentPlayer = 1;
      game.player2.moves--;
      var moves1 = game.player1.moves;
      var moves2 = game.player2.moves;
      moves2--;
      //doesn't work
      if((moves1 + moves2) === 0){
        game.winner();
      }
    }

    gameBoard.renderPositions();
    gameBoard.renderUi();

  },

  renderPositions: function(){
    //display player positions.
    var playerToken = $('#land' + gameBoard.playerPosition1.toString());
    playerToken.css('background-image', 'url(' + game.player1.img + ')');

    var playerToken = $('#land' + gameBoard.playerPosition2.toString());
    playerToken.css('background-image', 'url(' + game.player2.img + ')');

  },

  renderUi: function(){
    if(game.currentPlayer === 1){
      $('#text').text('Player 1\'s turn.');
      $('#moves').text('Movement Points: ' + game.player1.moves);
    } else {
      $('#text').text('Player 2\'s turn.');
      $('#moves').text('Movement Points: ' + game.player2.moves);
    }
  }

}

$('button').click(game.start);




$(function(){
})
//maybe combine instances of 'current player' more and cut out repeat checking
