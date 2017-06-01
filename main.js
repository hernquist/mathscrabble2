// variables
var playerTiles = [[0, 0 ,0 ,0 ,0, 0], [0, 0, 0, 0, 0, 0]];
var turns = playerTiles[0].length + playerTiles[1].length; 
var currentTileValue = 0;
var squaresInPlay = [];
var player = 1; //consider changing this to 0/1
var score = [0, 0]
var highlightLocation;
var displayScore = 0;
//const
const numOfCols=6;  
const numOfRows=6; 
const numberOfTiles = playerTiles[0].length;
//gameboard!
var gameBoard = document.getElementById("gameBoard");
//constructor function for the computer-player logic
function HighestTile(tileValue, location, score) {
  this.tileValue = tileValue;
  this.location  = location;
  this.score     = score;
}
//global variables for the computer logic
var tempTile = new HighestTile(0, "xx", 0);
var highTile = new HighestTile(0, "xx", -10);

// functions

function randomizeTiles() {
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < numberOfTiles; j++) {
      playerTiles[i][j] = Math.floor(Math.random() * 8) + 1; 
    }
  }
}
//I believe I did rows and columns backwards when I assigned them attributes
function makeBoard() { 
  for (var i=0; i < numOfRows; i++) {
    var row = gameBoard.appendChild(document.createElement("div"));
    for (var j=0; j < numOfCols; j++) {
        locationByStrVal = i.toString() + j.toString();
        element = document.createElement("span");
        element.id = locationByStrVal;
        element.value = 0;  //added as a way to initialize the board's squares to zero
        row.appendChild(element);
    }
  }  
}
  
function makeTileRow() {
  for (var i = 0; i < 2; i++) {
    if (i === 0) {
      var tileRow = document.getElementById('player1-tile-row');
    } else {
      var tileRow = document.getElementById('player2-tile-row');
    }
    for (j=0; j < 6; j++) {
        var tileElement = document.createElement('div');  //perhaps change this
        tileElement.className = 'tile';
        tileElement.id = "t" + (i.toString() + j.toString()); // so that id reflect player1 or 2
        tileElement.value = playerTiles[i][j];
        //tileElement.addEventListener('click', pickTile(i, j));
        tileRow.appendChild(tileElement);
        tileElement.innerHTML = playerTiles[i][j];
      }
  }
}

function makeScoreBoard() {
  document.getElementById("player1").innerHTML = score[0];
  document.getElementById("player2").innerHTML = score[1];
}

function checkVertical(locus, computerTileValue) {
   var tileSum = 0;
   
   var locusChecker = locus;
   var tempX = parseInt(locusChecker.charAt(1));
   var tempY = parseInt(locusChecker.charAt(0));

   var val = document.getElementById(locusChecker).value;  //jQuery $("[attribute=value]") 
   if (player === 2 ) val = computerTileValue;
   tileSum += val;

   do { //goingDown
      if (tempY === 0) {
        break;
      } else {
        tempY--;
      }
      locusChecker = tempY.toString() + tempX.toString();
      val = document.getElementById(locusChecker).value;
      tileSum = tileSum + val;
   }  while (val !== 0 );

   locusChecker = locus; //reseting so I can check in the other direction
   tempX = parseInt(locusChecker.charAt(1));
   tempY = parseInt(locusChecker.charAt(0));
   do { //goingUp
      if (tempY === (numOfRows - 1)) {
        break;
      } else {
        tempY++;
      }
      locusChecker = tempY.toString() + tempX.toString();
      val = document.getElementById(locusChecker).value;
      tileSum = tileSum + val;
   }  while (val !== 0);
  
  if (tileSum !== 0 && tileSum%5 === 0) {
    displayScore = displayScore + tileSum; //not technically the same thing!
    document.getElementById('scoredisplay').innerHTML = "Player " + player + " scored " + displayScore;
    //human
    if (player === 1) score[player-1] += tileSum;  
    //computer
    if (player === 2) {  

      tempTile.tileValue = computerTileValue;
      tempTile.location  = locus; 
      tempTile.score = tileSum;
    }
    return true;
  }  else {
    return false;
  }
}

function checkHorizontal(locus, computerTileValue) {
   var tileSum = 0;
   var locusChecker = locus;
   var tempX = parseInt(locusChecker.charAt(1));
   var tempY = parseInt(locusChecker.charAt(0));

   var val = document.getElementById(locusChecker).value;  //jQuery $("[attribute=value]") 
   if (player === 2 ) val = computerTileValue;
   tileSum += val;
  
   do { //going "left"
      if (tempX === 0) {
        break;
      } else {
        tempX--;
      }
      locusChecker = tempY.toString() + tempX.toString();
      val = document.getElementById(locusChecker).value;
      tileSum = tileSum + val;
   }  while (val !== 0 );

   locusChecker = locus; //reseting so I can check in the other direction
   tempX = parseInt(locusChecker.charAt(1));
   tempY = parseInt(locusChecker.charAt(0));
   do { //going "right"
      if (tempX === (numOfCols - 1)) {
        break;
      } else {
        tempX++;
      }
      locusChecker = tempY.toString() + tempX.toString();
      val = document.getElementById(locusChecker).value;
      tileSum = tileSum + val;
   }  while (val !== 0);
  
  if (tileSum !== 0 && tileSum%5 === 0) {
    displayScore = displayScore + tileSum;
    document.getElementById('scoredisplay').innerHTML = "Player " + player + " scored " + displayScore;
    //human
    if (player === 1) score[player-1] += tileSum;  
    //computer
    if (player === 2) {                            
      tempTile.tileValue = computerTileValue;
      tempTile.location  = locus; 
      tempTile.score     += tileSum;
    }
    return true;
  }  else {
    return false;
  }
}  



function displayWinner(player) {
  var winner = "player 1";
  if (player === 1) winner = "the computer";
  document.getElementById("player1-tile-row").innerHTML = " ";
  document.getElementById("player2-tile-row").innerHTML = "The winner is " + winner;
  } 

function displayTie() {
  document.getElementById("player1-tile-row").innerHTML = " ";
  document.getElementById("player2-tile-row").innerHTML = "Beast mode! Nice battle.";
  } 

function checkWinner() { //player already set to player = 2;
  if (score[0] === score[1]) {
    displayTie();
  } else if (score[0] > score[1]) {
    player = 1;
    displayWinner(player);
  } else {
    displayWinner(player);
  }
}

function checkGameOver() {
  makeScoreBoard();  //probably don't need this, can't decide how I will show that it is the computer's turn
  nextPlayer();
  makeScoreBoard();
  if (turns === 0) {
    checkWinner();
  }
}

function checkTile(locus) {
  var vertChk = checkVertical(locus); //consider rewriting so checkVertical and Horizontal are broken up, eliminating the need for these temp variables
  var hortChk = checkHorizontal(locus); 
  if ((!vertChk) && (!hortChk)) {  //if tile doesn't score vertically or horizontally, then player loses points
    score[player-1] -= document.getElementById(locus).value;
    document.getElementById('scoredisplay').innerHTML = "Player " + player + " lost " + document.getElementById(locus).value;
  }
  displayScore = 0;
  turns--;
  checkGameOver();
}


function checkTileInEachSquare(tileValue) {
   for (var i = 0; i < numOfCols; i++) {
     for(var j = 0; j < numOfRows; j++) {
       var computerLocationTest = i.toString() + j.toString();

       if (document.getElementById(computerLocationTest).value === 0) {
          var vertChk = checkVertical(computerLocationTest, tileValue); //consider rewriting so checkVertical and Horizontal are broken up, eliminating the need for these temp variables
          var hortChk = checkHorizontal(computerLocationTest, tileValue); 
          if ((!vertChk) && (!hortChk)) {  //if tile doesn't score vertically or horizontally, then player loses points
              tempTile.tileValue = tileValue;
              tempTile.location  = computerLocationTest;
              tempTile.score     = 0 - tileValue;
          }
          if (tempTile.score > highTile.score) {
            highTile.tileValue = tempTile.tileValue;
            highTile.location  = tempTile.location;
            highTile.score     = tempTile.score;
            console.log("highTile | " + highTile.tileValue + " | " + highTile.location + " | " + highTile.score);
          }
          tempTile.score = 0; // because we add the vertical and horizontal rows
       }
     }
   }
}

function computerTurn() {
    console.log("player: " + player + " | " + playerTiles[player-1]);
    
    highTile = new HighestTile(0, "xx", -10); //lowest possible score is -9
    tempTile = new HighestTile(0, "xx", 0); //reseting each computer turn; 
    for (var i = 0; i < playerTiles[player-1].length; i++) {
      console.log ("COMPUTER TILE | " + playerTiles[player-1][i])
      checkTileInEachSquare(playerTiles[player-1][i]);
    }
    //updating and showing score
    score[1] += highTile.score;
    document.getElementById('scoredisplay').innerHTML = "The computer scored " + highTile.score;
    //removing tile from DOM
    
    for (var i = 0; i < numberOfTiles; i++) {
      if (document.getElementById("t1" + i.toString())) element = document.getElementById("t1" + i.toString());
      if (highTile.tileValue === element.value) {
         element.parentNode.removeChild(element);
         break;
      }
    }
    element.value = 0;
    
    //remove tile from player array
    var ind =  playerTiles[1].indexOf(highTile.tileValue);
    if (ind != -1) playerTiles[1].splice(ind, 1);
    //changing value of the board (adding tile)
    document.getElementById(highTile.location).value = highTile.tileValue;
    //placing tile on board
    squarePlacement = document.getElementById(highTile.location);
    var tileElement = document.createElement('div');  //perhaps change this
    tileElement.className = 'tileOnBoard';
    tileElement.value = highTile.tileValue;
    squarePlacement.appendChild(tileElement);
    tileElement.innerHTML = highTile.tileValue;
    //decreasing turns
    turns--;
}

function playerAdvance() {
   player++;
   console.log("setTimeOut working");
}

function nextPlayer() {
  console.log ("PLAYER | " + player);
  // setTimeout(function () {
  //   playerAdvance(player);
  // }, 2000);
  playerAdvance();
  console.log ("PLAYER*** | " + player);
  if (player === 2) {
      computerTurn();
  }
  player = 1;
} 

var tileToBeDeleted = [0 ,0]; //I might not just delete tiles. I might replace.

const AppController = {
  // var highlightLocation;not working wanted a variable just for AppController ?? how do I do this
  onClickSquare: function(location) {
    if (location === "gameBoard") { // working as a protection
      // document.getElementById(location).innerHTML = location; //comment out
      return;
    }
    else if (location.charAt(0) === 't') {
      if (document.getElementById(highlightLocation)) {AppController.checkIfNewTileBeforePlacing();}//in other words if the player is picking new tile without doing something with the old one the 
       // white erases the old tile 
      highlightLocation = location;
      AppController.pickTile(location.charAt(1), location.charAt(2)); // charAt(1) is player number, charAt(2) is tile number
    }
    else if (currentTileValue !== 0) {
      AppController.placeTile(location);
    }
  },

  checkIfNewTileBeforePlacing: function() { //this checks to see if a new or different tile is selected by user before placement
    var chk = document.getElementById(highlightLocation).style.backgroundColor;
    if (chk === "gold" || chk === "rgb(255, 215, 0)") { //works for safari!!!
      document.getElementById(highlightLocation).style.backgroundColor = rgb(125, 84, 84);
    }
  }, 

  pickTile: function(p, t) {
    p = parseInt(p);
    t = parseInt(t);
    tileToBeDeleted = [p,t];
    if (player !== (p + 1)) {
      alert("Hands off! You're player " + player + "."); 
      return;
    }
    else {
      currentTileValue = document.getElementById(highlightLocation).value;  //this is the "return"
      document.getElementById(highlightLocation).style.backgroundColor = "gold";
    }
  },

  placeTile: function(locationTilePlacement) {
    if (document.getElementById(locationTilePlacement).value > 0) {
      alert ("You can't go there!");
      return;
    } else {
      document.getElementById(locationTilePlacement).value = currentTileValue;
    }
    checkTile (locationTilePlacement);

    squarePlacement = document.getElementById(locationTilePlacement);

    var tileElement = document.createElement('div');  //perhaps change this
        tileElement.className = 'tileOnBoard';
        //tileElement.id = (i.toString() + j.toString()); // so that id reflect player1 or 2
        tileElement.value = currentTileValue;
        //tileElement.addEventListener('click', pickTile(i, j));
        squarePlacement.appendChild(tileElement);
        tileElement.innerHTML = currentTileValue;
    
    /* if checkTile true */ 
    // this is what it was-->>document.getElementById(locationTilePlacement).innerHTML = currentTileValue; //only if checkTile true
    /* if checkTile false */ // document.getElementById(locationTilePlacement).value = 0;
    currentTileValue = 0;
    AppController.removeTile();
  },

  removeTile: function() {
    //my goodness this is a terrible way of doing .splice

    var tempPlayerTiles = [[],[]];
    
    for(var p = 0; p < playerTiles.length; p++) {
      var subtractor = false; //this has to be here or it cuts from both array if the tile selceted is from the first row
      for(var t = 0; t < playerTiles[p].length; t++) {
        if (tileToBeDeleted[0] === p && tileToBeDeleted[1] === t) {
          subtractor = true;
        } else if (subtractor === true) {
          tempPlayerTiles[p][t - 1] = playerTiles[p][t];
        }
        else {
          tempPlayerTiles[p][t] = playerTiles[p][t];
        }
      }
    }
    playerTiles = tempPlayerTiles;
    var element = document.getElementById("t" + tileToBeDeleted[0].toString() + tileToBeDeleted[1].toString());
    if (element != null) {
      element.parentNode.removeChild(element);
    }
  }
};

window.onload = function(){
  randomizeTiles()
  makeBoard();
  makeTileRow();  //perhaps this should go in makeBoard AND in pick a tile and place a tile
  makeScoreBoard();

  document.onclick = function(f) {
  	var targ;    	
    
    if (!f) var f = window.event;  //Borrowed from onstack as an onmouseover which I repurposed for 
    	                               //this onclick functionality with the gameboard and tile rows
  	if (f.target) targ = f.target;
    else if (f.srcElement) targ = f.srcElement;
    
    if (targ.nodeType == 3) // defeat Safari bug
      targ = targ.parentNode;
    AppController.onClickSquare(targ.id);
  }
}
