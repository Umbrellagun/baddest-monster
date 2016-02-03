var enemies = [
    {name: 'a', img: '', health: 10},
    {name: 's', img: '', health: 20},
    {name: 'd', img: '', health: 30},
    {name: 'f', img: '', health: 40},
    {name: 'x', img: '', health: 50},
    {name: 'z', img: '', health: 60},
    {name: 'w', img: '', health: 70},
];


var monsterPicks = [
    {name: 'he', img: 'jlnk', health: 110},
    {name: 'je', img: 'klasjdfn', health: 220},
    {name: 'me', img: 'lasj', health: 330},
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

  player1: '',
  player2: '',
  currentEnemy: '',
  currentPlayer: '',

  start: function(){

    this.player1 = '';
    this.player2 = '';
    this.currentEnemy = '';
    this.currentPlayer = '';



  },

//   attack: function(){
//
//   var hitChance = Math.floor(Math.random() * 100) + 1;
//
//   if (hitChance > 10){
//     var damage = Math.floor(Math.random() * 25) + 5;
//     this.currentEnemy.health = this.currentEnemy.health - damage;
//   }
//
//   },
// //infinitely inscreases health, need to put roof on health
//   heal: function(){
//     var addHealth = Math.floor(Math.random() * 25) + 25;
//     this.player.health = this.player.health + addHealth;
//   },

  winner: function(){

  //calculates each player's score

  },

};

for (var i = 0; i < monsterPicks.length; i++){
  $('#monster' + (i + 1).toString()).attr('src', monsterPicks[i].img);
}

$('button').click(game.start);

for (var i = 0; i < monsterPicks.length; i++){
  //edit for 'pick' scope
  $('#monster' + (i + 1).click(function(){
    //this.player?
  });
}

$(function(){


})
