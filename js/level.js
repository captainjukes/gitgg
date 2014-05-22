


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
    'player': { sx: 0,  sy: 36, w: 23, h: 17, cls: Player ,frames: 2 },
    'missile': { sx: 0,  sy: 86, w: 13,  h: 14, cls: Missile },
    'esmissile': { sx: 0,  sy: 86, w: 13,  h: 14, cls: Missile },

      
  }

/* text configuration for start, game over and win */    
  function startGame() {
    var screen = new GameScreen("Space Invaders GLHF","press space to start",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
    Game.loop();
  }

  function endGame() {
    var screen = new GameScreen("GG Game Over","(press space to restart)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }


  function winGame() {
    var screen = new GameScreen("GG,You Win!","(press space to restart)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }

  $(function() {
    GameAudio.load({ 'fire' : 'sound/vi.wav', 'die' : 'media/explosion.ogg' }, 
                   function() { 
                       Game.initialize("#gameboard", levelData, spriteData,
                                      { "start": startGame,
                                        "die"  : endGame,
                                        "win"  : winGame });
                   });
   });



