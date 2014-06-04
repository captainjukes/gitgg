
//TestScore
var score = 0;


//AlienFlock
var AlienFlock = function AlienFlock() {
  this.invulnrable = true;
  this.dx = 10; this.dy = 0;
  this.hit = 1; this.lastHit = 0;
  this.speed = 10;

  this.draw = function() {};

  // level steps showed in flowchart
    this.die = function() {
    if(Game.board.nextLevel()) {
      Game.loadBoard(new GameBoard(Game.board.nextLevel())); 
    } else {
      Game.callbacks['win']();
    }
  }

  this.step = function(dt) { 
    if(this.hit && this.hit != this.lastHit) {
      this.lastHit = this.hit;
      this.dy = this.speed;
    } else {
      this.dy=0;
    }
    this.dx = this.speed * this.hit;

    var max = {}, cnt = 0;
    this.board.iterate(function() {
      if(this instanceof Alien)  {
        if(!max[this.x] || this.y > max[this.x]) {
          max[this.x] = this.y; 
        }
        cnt++;
      } 
    });

    if(cnt == 0) {this.die(); } 

    this.max_y = max;
    return true;
      
     
  };

}

//Alien

var Alien = function Alien(opts) {
  this.flock = opts['flock'];
  this.frame = 0;
  this.mx = 0;
}

//related to sprite data
Alien.prototype.draw = function(canvas) {
  Sprites.draw(canvas,this.name,this.x,this.y,this.frame);
}

//when an alien dies, flock speeds up
Alien.prototype.die = function() {
  GameAudio.play('die');
  this.flock.speed += 0.9;
  this.board.remove(this);
   //console log
    score++;
    console.log(score);
}

Alien.prototype.step = function(dt) {
  this.mx += dt * this.flock.dx;
  this.y += this.flock.dy;
  if(Math.abs(this.mx) > 10) {
    if(this.y == this.flock.max_y[this.x]) {
      this.fireSometimes();
    }
    this.x += this.mx;
    this.mx = 0;
    this.frame = (this.frame+1) % 2;
    if(this.x > Game.width - Sprites.map.alien1.w * 2) this.flock.hit = -1;
    if(this.x < Sprites.map.alien1.w) this.flock.hit = 1;
  }
  return true;
}



//Alien using class 'emissile', fire when a random number times 100 but smaller than 30
Alien.prototype.fireSometimes = function() {
      if(Math.random()*100 < 30) {
        this.board.addSprite('emissile',this.x + this.w/2 - Sprites.map.emissile.w/2,
                                      this.y + this.h,                                 
                             //speed        
                             { dy: 150 });
      }
}



///////////////////////////////////////////////////////////////////////////////////////////

/*
//Boss

var Boss = function Boss(opts) {
  this.flock = opts['flock'];
  this.frame = 0;
  this.mx = 0;
}

Boss.prototype.draw = function(canvas) {
  Sprites.draw(canvas,this.name,this.x,this.y,this.frame);
}

Boss.prototype.die = function() {
  GameAudio.play('die');
  this.flock.speed += 1;
  this.board.remove(this);
}

Boss.prototype.step = function(dt) {
  this.mx += dt * this.flock.dx;
  this.y += this.flock.dy;
  if(Math.abs(this.mx) > 10) {
    if(this.y == this.flock.max_y[this.x]) {
      this.fireSometimes();
    }
    this.x += this.mx;
    this.mx = 0;
    this.frame = (this.frame+1) % 2;
    if(this.x > Game.width - Sprites.map.alien1.w * 2) this.flock.hit = -1;
    if(this.x < Sprites.map.alien1.w) this.flock.hit = 1;
  }
  return true;
}



Boss.prototype.fireSometimes = function() {
      if(Math.random()*100 < 30) {
        this.board.addSprite('emissile',this.x + this.w/2 - Sprites.map.emissile.w/2,
                                      this.y + this.h,                                 
                                     { dy: 100 });
      }
}
*/
/////////////////////////////////////////////////////////////////////////////////////

//shield = 2 = lives 
var shield = 2;
var Player = function Player(opts) { 
  this.reloading = 0;
    this.frame = 0;
    
}

Player.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'player',this.x,this.y,this.frame);
}




Player.prototype.die = function() {
    GameAudio.play('die'); 
    //Game.callbacks['die']();


    // if player gets hit, -1 live
    if (shield > 1){
        shield--;
        
        }else{Game.callbacks['die']();
        
    }
}

	

	


//siren animation and ship steps
Player.prototype.step = function(dt) {
    
  
    //one of the parts that i like in the game. the siren animation on Player
  if(Game.keys['left']) { this.x -= 100 * dt; this.frame = (this.frame+1) % 2; }
  if(Game.keys['right']) { this.x += 100 * dt; this.frame = (this.frame+1) % 2; }

  if(this.x < 0) this.x = 0;
  if(this.x > Game.width-this.w) this.x = Game.width-this.w;
    

    
  this.reloading--;
    
 


    
/* player missile settings; ammunition and reloading */  
    if(Game.keys['fire'] && this.reloading <=0 && this.board.missiles < 1000) {
    GameAudio.play('fire');
        
    //running 'missile' function
        this.board.addSprite('missile',
                          this.x + this.w/2 - Sprites.map.missile.w/2,
                          this.y-this.h,
                          { dy: -300, player: true });
    this.board.e_missiles++;
    this.reloading = 9;
  }
    
    //press A to activate cheat mode    
    if(Game.keys['a'] && this.reloading <=0 && this.board.missiles < 1000) {
    GameAudio.play('fire');
        
    //using nmissile class
        this.board.addSprite('nmissile',
                          this.x + this.w/20 - Sprites.map.missile.w/20,
                          this.y-this.h*2,
                         //speed 
                         { dy: -1000, player: true });
    this.board.e_missiles++;
    this.reloading = 2;
  }
    
    
  return true;
}

//////////////////////////////

//cheat mode missile 

var Nmissile = function Nmissile(opts) {
   this.dy = opts.dy;
   this.player = opts.player;
}

Nmissile.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'nmissile',this.x,this.y);
}

Nmissile.prototype.step = function(dt) {
   this.y += this.dy * dt;

   var enemy = this.board.collide(this);
   if(enemy) { 
    enemy.die();
     return false;
   }
   return (this.y < 0 || this.y > Game.height) ? false : true;
}

Nmissile.prototype.die = function() {
  if(this.player) this.board.missiles--;
  if(this.board.missiles < 0) this.board.missiles=0;
   this.board.remove(this);
}


//Missiles
var Missile = function missile(opts) {
   this.dy = opts.dy;
   this.player = opts.player;
    this.score = 0;
}

Missile.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'missile',this.x,this.y);
}

Missile.prototype.step = function(dt) {
   this.y += this.dy * dt;

   var enemy = this.board.collide(this);
   if(enemy) { 
     enemy.die();
     return false;
   }
   return (this.y < 0 || this.y > Game.height) ? false : true;
}

Missile.prototype.die = function() {
  if(this.player) this.board.missiles--;
  if(this.board.missiles < 0) this.board.missiles=0;
   this.board.remove(this);
}

// Alien missile
var Emissile = function Emissile(opts) {
   this.dy = opts.dy;
   this.player = opts.player;
}

//how it calls the spriteData
Emissile.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'emissile',this.x,this.y);
}

Emissile.prototype.step = function(dt) {
   this.y += this.dy * dt;

   var enemy = this.board.collide(this);
   if(enemy) { 
     enemy.die();
     return false;
   }
   return (this.y < 0 || this.y > Game.height) ? false : true;
}

Emissile.prototype.die = function() {
  if(this.player) this.board.missiles--;
  if(this.board.missiles < 0) this.board.missiles=0;
   this.board.remove(this);
}







