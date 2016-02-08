
var enemies = [
    {name: 'Slime', img: 'img/slime.png', health: 50},
    {name: 'Shark', img: 'img/shark.png', health: 50},
    {name: 'Imp', img: 'img/imp.png', health: 50},
    {name: 'Octo', img: 'img/octo.png', health: 50},
    {name: 'Ice Cream', img: 'img/icecream.png', health: 50},
    {name: 'Fox', img: 'img/fox.png', health: 60}
];

var monsterPicks = [
    {name: 'Fireball', img: 'img/fire.png', health: 200, moves: 10, points: 0},
    {name: 'The Mountain', img: 'img/mountain.png', health: 300, moves: 10, points: 0},
    {name: 'Octo Monster', img: 'img/octom.png', health: 250, moves: 10, points: 0}
];

//using JSON to clone object
function Monster(monster) {

  this.monster = (JSON.parse(JSON.stringify(monster)));
  this.name = this.monster.name;
  this.img = this.monster.img;
  this.health = this.monster.health;
  this.moves = this.monster.moves;
  this.points = this.monster.points;


}

Monster.prototype.attack = function(){
   //current enemy takes damage, modified by attackers strength
    return Math.floor(Math.random() * 25) + 25;

   //game.takeDamage(str);

};

Monster.prototype.takeDamage = function(){

};

//infinitely inscreases health, need to put roof on health
//!!!!! Use heal on the board screen in place of a movement point??
Monster.prototype.heal = function(){

  var addHealth = Math.floor(Math.random() * 25) + 25;
  this.health = this.health + addHealth;

};

Monster.prototype.isDead = function(){

};

//creates new objects for each enemy monster
for (var i = 0, randomEnemies = []; i < enemies.length; i++){

  var newEnemy = new Monster(enemies[i]);
  randomEnemies.push(newEnemy);

}

//random enemy function
var randomEnemy = function(){
  return Math.floor(Math.random() * randomEnemies.length);
}


var game = {

  //maybe combine into an array in natural order, player1 = array[0]
  //player2 = array[1], random enemy = array[2] and .pop()s when dead?
  player1: false,
  player2: false,
  currentEnemy: '',
  currentPlayer: 1,

  start: function(){

    $('button').hide();

    $('#text').text('Player 1, pick a monster!');

    //generates monster images and onclicks
    for (var i = 0; i < monsterPicks.length; i++){

      $('#game').append('<div class="monster"><img src="monster' + i + '" id="monster' + i + '" data="' + i + '"></div>');

      var $monster = $('#monster' + i);

      $monster.attr('src', monsterPicks[i].img);
      $monster.click(function(){

        if(game.player2){
          //executed when player 2 picks a monster
          game.player2 = new Monster(monsterPicks[$(this).attr('data')]);
          game.player2.player = 'p2';
          $(this).hide();
          //moves to game board here
          gameBoard.start();

        } else {
          //executed when player 1 picks a monster
          $('#text').text('Player 2, pick a monster!')
          game.player1 = new Monster(monsterPicks[$(this).attr('data')]);
          game.player1.player = 'p1';
          game.player2 = true;
          $(this).hide();
        }

      });

    }

  },

  //calculates each player's score
  winner: function(){
    if (game.player1.points > game.player2.points){
      $('#game').children().remove();
      $('#gameBoard').hide();
      $('#text').text('Player 1 wins!');
    } else {
      $('#game').children().remove();
      $('#gameBoard').hide();
      $('#text').text('Player 2 wins!');
    }
  },

};

var gameBoard = {

  board: [ 1, 0, 0, 0, 0, 0, 0, 2 ],

  playerPosition1: 0,
  playerPosition2: 7,

  started: 0,

  start: function(){
    $('#game').hide();
    $('#board').css({
      'background-image': 'url("img/map.jpg")',
      'border': '4px solid black'
    });
    $('#container').css({'position': 'absolute', 'right': '50%'});
    $('#board').show();
    $('#text').show();
    $('#text2').show();
    if (gameBoard.started === 0){

      $('#text2').append('<div id="moves"></div>');
    //generates map
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
      gameBoard.started = 1;
    }

    this.renderPositions();
    this.renderUi();
  },
  //can move anywhere
  //players can move to the same location they are on and it take movement points away
  move: function(){
    var board = gameBoard.board[$(this).attr('data')];

    if ((game.currentPlayer === 1) && (game.player1.moves > 0)){
      //check land that was clicked on through the array for who owns it
      //clean this up
      if(board !== 1){

        if(board === 0){
          var enemy = randomEnemies[randomEnemy()];
        } else {
          var enemy = game.player2;
        }
        //starts battle
        battle.start(game.player1, enemy);

      }
      //should be moved to battle winner?
      var playerToken = $('#land' + gameBoard.playerPosition1.toString());
      playerToken.css('background-image', 'url("")');

      gameBoard.playerPosition1 = $(this).attr('data');
      game.currentPlayer = 2;
      game.player1.moves--;

      gameBoard.renderPositions();
      gameBoard.renderUi();

    } else if ((game.currentPlayer === 2) && (game.player2.moves > 0)){

      if(board !== 2){
        if (board === 0){
          var enemy = randomEnemies[randomEnemy()];
        } else {
          var enemy =  game.player1;
        }
        //starts battle
        battle.start(game.player2, enemy);
      }

      gameBoard.board[$(this).attr('data')] = 2;

      var playerToken = $('#land' + gameBoard.playerPosition2.toString());
      playerToken.css('background-image', 'url("")');

      gameBoard.playerPosition2 = $(this).attr('data');
      game.currentPlayer = 1;
      game.player2.moves--;

      gameBoard.renderPositions();
      gameBoard.renderUi();

    } else {
      game.winner();
    }

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

var battle = {

  //don't have to repeat this in the battle object literal and can take it directly from the game object literal?
  player1: '',
  player2: '',
  playerTurn: 0,
  hp1: '',
  hp2: '',

  //maybe take enemy arguement
  start: function(player, enemy){

    //display stuff
    $('#board').hide();
    $('#text').hide();
    $('#text2').hide();
    $('#container').css({'position': '', 'right': ''});
    $('#battle').css({'display': 'flex', 'background-image': 'url("img/background.png")'});

    battle.hp1 = player.health;
    battle.hp2 = enemy.health;

    //health bar
    $('#p1progress').attr('max', battle.hp1).attr('value', battle.hp1);
    $('#p2progress').attr('max', battle.hp2).attr('value', battle.hp2);
    $('#p1hp').text(battle.hp1);
    $('#p2hp').text(battle.hp2);

    //img
    $('#p1img').attr('src', player.img);
    $('#p2img').attr('src', enemy.img);

    this.player1 = player;
    this.player2 = enemy;
    this.turn();

  },

  turn: function(){
    if(battle.playerTurn === 0){

      //sets player 1 attacks
      $('#p1attack').click(function(){
        battle.hp2 = battle.hp2 - battle.player1.attack();
        battle.playerTurn = 1;
        battle.renderHP();
        battle.turn();
      });
      $('#p1elemental').click(function(){
        battle.hp2 = battle.hp2 - battle.player1.elemental();
        battle.playerTurn = 1;
        battle.renderHP();
        battle.turn();
      });

      //turns off player 2 attacks
      $('#p2attack').off();
      $('#p2elemental').off();

    } else if (battle.playerTurn === 1){

      //if enemy is random monster
      if(battle.player2.moves === undefined){
        battle.hp1 = battle.hp1 - battle.player2.attack();
        battle.playerTurn = 0;
        battle.renderHP();
        battle.turn();
      } else {

        $('#p2attack').click(function(){
          battle.hp1 = battle.hp1 - battle.player2.attack();
          battle.playerTurn = 0;
          battle.renderHP();
          battle.turn();
        });
        $('#p1elemental').click(function(){
          battle.hp1 = battle.hp1 - battle.player2.elemental();
          battle.playerTurn = 0;
          battle.renderHP();
          battle.turn();
        });

        //turns off player 2 attacks
        $('#p1attack').off();
        $('#p1elemental').off();
      }
    }

  },

  renderHP: function(){
    //should be moved to battleWinner function
    //not sure why this is increasing points by 4 instead of 1
    if(battle.hp1 < 0){
      if(battle.player2.player === 'p2'){
        game.player2.points++;
      }
      $('#battle').hide();
      gameBoard.start();

    } else if (battle.hp2 < 0){
      game.player1.points++;
      $('#battle').hide();
      gameBoard.start();

    } else {
    //the actual rendering of hp
      $('#p1hp').text(battle.hp1);
      $('#p2hp').text(battle.hp2);
      $('#p1progress').attr('value', battle.hp1);
      $('#p2progress').attr('value', battle.hp2);
    }
  },

  attackAnimation: function(){

  }

}

$('button').click(game.start);

$(function(){
})
//maybe combine instances of 'current player' more and cut out repeat checking
//cut down repeating initialization of game elements
//want to clean up some of the nested if statements
//maybe change the player1/2/random enemy to be part of the monster object so it follows it around instead of being in a static location?

// this.board[0] = 1;
// this.board[7] = 2;
// this.playerPosition1 = this.board.indexOf(1);
// this.playerPosition2 = this.board.indexOf(2);
