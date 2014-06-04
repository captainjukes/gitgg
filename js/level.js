


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
          [0,0,0,0,0,1,0,0,0,0,0]],
        
      /*3: [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [3,3,3,3,3,3,3,3,3,3,3],
          [3,3,3,3,3,3,3,3,3,3,3],
          [3,0,3,3,3,3,3,3,3,0,3],
          [3,0,3,3,3,3,3,3,3,0,3],
          [0,0,0,3,3,3,3,3,0,0,0],
          [0,0,0,0,3,3,3,0,0,0,0],
          [0,0,0,0,0,3,0,0,0,0,0]],*/
    }

  //spriteData
    var spriteData = {
    'alien1': { sx: 0,  sy: 0,  w: 23, h: 18, cls: Alien, frames: 2 },
    'alien2': { sx: 0,  sy: 18, w: 23, h: 18, cls: Alien, frames: 2 },
    'alien3': { sx: 0,  sy: 18, w: 23, h: 18, cls: Alien, frames: 2 },  
    'player': { sx: 0,  sy: 55/*36*/, w: 45/*23*/, h: 33/*27*/, cls: Player ,frames: 2 },
    'missile': { sx: 0,  sy: 89, w: 13,  h: 14, cls: Missile },
    'emissile': { sx: 15,  sy: 90, w: 5,  h: 14, cls: Emissile },
     'nmissile': { sx: 110,  sy: 0, w: 55,  h: 54, cls: Nmissile },
      
  }

/* text configuration for start, game over and win */    
  function startGame() {
    var screen = new GameScreen("HK Space Police","press space to start",
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
myAudio.play();
  }

//end-game function
  function endGame() {
    var screen = new NewGameScreen("GG Game Over","(press enter to restart)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                     myAudio.play();
                                     myAudio2.pause();
                                     shield = 2;
                                     
                                 });
    Game.loadBoard(screen);
      //pause ingame background music
      myAudio.pause();
      //loop for troll teemo endgame music
       myAudio2 = new Audio('sound/teemogg.wav'); 
      if (typeof myAudio2.loop == 'boolean')
      {
        myAudio2.loop = true;
          shield = 0;
      }

      myAudio2.play();
  }


//winGameFunction 
function winGame() {
    var screen = new NewGameScreen("GG,You Win!","(press enter to restart)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                     myAudio.play();
                                     shield = 2 ;
                                     
                                 });
    
    //winGame Audio
    Game.loadBoard(screen);
      myAudio.pause();
      myAudio3 = new Audio('sound/ggsound.mp3');
      myAudio3.play();
      
  }



///////////////////////////////////////////////////////////
                
                //audio part, initialization

  $(function() {
    GameAudio.load({ 'fire' : 'sound/vi.wav', 'die' : 'sound/explode.wav' }, 
                   function() { 
                       Game.initialize("#gameboard", levelData, spriteData,
                                      { "start": startGame,
                                        "die"  : endGame,
                                        "win"  : winGame });
                   });
   });



