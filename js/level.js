


/* alien setup for each level */ 
    var levelData = { 
     1:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,1,1,0,0,0,1,1,1,1],
          [0,0,1,1,0,0,0,2,2,0,0],
          [1,1,1,1,0,0,0,2,2,0,0],
          [1,0,1,1,0,0,0,1,1,1,1],
          [1,1,1,1,2,2,2,0,0,2,1],
          [1,0,0,1,0,0,0,0,0,2,1],
          [1,1,1,1,0,0,0,2,2,2,1]],
     2:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [2,2,2,2,2,2,2,2,2,2,2],
          [2,2,2,2,2,2,2,2,2,2,2],
          [1,0,2,2,2,2,2,2,2,0,1],
          [1,0,1,1,1,1,1,1,1,0,1],
          [0,0,0,1,1,1,1,1,0,0,0],
          [0,0,0,0,1,1,1,0,0,0,0],
          [0,0,0,0,0,1,0,0,0,0,0]] };

  var spriteData = {
    'alien1': { sx: 0,  sy: 0,  w: 23, h: 18, cls: Alien, frames: 2 },
    'alien2': { sx: 0,  sy: 18, w: 23, h: 18, cls: Alien, frames: 2 },
    'player': { sx: 0,  sy: 55/*36*/, w: 45/*23*/, h: 33/*27*/, cls: Player ,frames: 2 },
    'missile': { sx: 0,  sy: 89, w: 13,  h: 14, cls: Missile },
    'emissile': { sx: 15,  sy: 90, w: 5,  h: 14, cls: Emissile },

      
  }

/* text configuration for start, game over and win */    
  function startGame() {
    var screen = new GameScreen("Space Invaders GLHF","press space to start",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                     
                                 });
    Game.loadBoard(screen);
    Game.loop();
     
      /* game background song */
     myAudio = new Audio('sound/spacebattle2.wav'); 
if (typeof myAudio.loop == 'boolean')
{
    myAudio.loop = true;
}
/*else
{
    myAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}*/
myAudio.play();
  }

//end-game function
  function endGame() {
    var screen = new GameScreen("GG Game Over","(press enter to restart)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                     myAudio.play();
                                     myAudio2.pause();
                                 });
    Game.loadBoard(screen);
      //pause ingame background music
      myAudio.pause();
      //loop for troll teemo endgame music
       myAudio2 = new Audio('sound/teemogg.wav'); 
      if (typeof myAudio2.loop == 'boolean')
      {
        myAudio2.loop = true;
      }
     /* else
      {
          myAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
}*/
myAudio2.play();
      
  }


  function winGame() {
    var screen = new NewGameScreen("GG,You Win!","(press enter to restart)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                     myAudio.play();
                                 });
    Game.loadBoard(screen);
      myAudio.pause();
      myAudio3 = new Audio('sound/ggsound.mp3');
      myAudio3.play();
  }

  $(function() {
    GameAudio.load({ 'fire' : 'sound/vi.wav', 'die' : 'sound/explode.wav', }, 
                   function() { 
                       Game.initialize("#gameboard", levelData, spriteData,
                                      { "start": startGame,
                                        "die"  : endGame,
                                        "win"  : winGame });
                   });
   });



