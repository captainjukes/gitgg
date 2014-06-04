var score = 0;


var AlienFlock = function AlienFlock() {
  this.invulnrable = true;
  this.dx = 10; this.dy = 0;
  this.hit = 1; this.lastHit = 0;
  this.speed = 10;

  this.draw = function() {};

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

    if(cnt == 0) { this.die(); } 

    this.max_y = max;
    return true;
  };

}
///////////////////////////////////////////////

var BossFlock = function BossFlock() {
  this.invulnrable = true;
  this.dx = 10; this.dy = 0;
  this.hit = 1; this.lastHit = 0;
  this.speed = 10;

  this.draw = function() {};

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

    if(cnt == 0) { this.die(); } 

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

Alien.prototype.draw = function(canvas) {
  Sprites.draw(canvas,this.name,this.x,this.y,this.frame);
}

//When Aliens get killed, flock speed up and play die sound effects
Alien.prototype.die = function() {
  GameAudio.play('die');
  this.flock.speed += 1;
  this.board.remove(this);
    //testing console;
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



// if a random number times 100 is less than 30, it fires!
Alien.prototype.fireSometimes = function() {
      if(Math.random()*100 < 30) {
       //using emissiles class on spriteData
          this.board.addSprite('emissile',this.x + this.w/2 - Sprites.map.emissile.w/2,
                                      this.y + this.h,                                 
                              //speed of missiles      
                             { dy: 100 });
      }
}



///////////////////////////////////////////////////////////////////////////////////////////

/*
//Boss

var Boss = function Boss(opts) {
  this.flock = opts['flock2'];
    this.frame = 0;
    this.mx = 0;
}

Boss.prototype.draw = function(canvas) {
  Sprites.draw(canvas,this.name,this.x,this.y,this.frame);
}

Boss.prototype.die = function() {
  GameAudio.play('die');
  this.flock.speed += 2;
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
    if(this.x > Game.width - Sprites.map.alien3.w * 2) this.flock.hit = -1;
    if(this.x < Sprites.map.alien3.w) this.flock.hit = 1;
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


//player with shield(shield = lives)
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


    if (shield > 1){
        shield--;
        
        }else{Game.callbacks['die']();
        
    }
}

	

	


//siren animation and ship steps
Player.prototype.step = function(dt) {
    
 // love this part, my siren animation   
  if(Game.keys['left']) { this.x -= 100 * dt; this.frame = (this.frame+1) % 2; }
  if(Game.keys['right']) { this.x += 100 * dt; this.frame = (this.frame+1) % 2; }

  if(this.x < 0) this.x = 0;
  if(this.x > Game.width-this.w) this.x = Game.width-this.w;
    

    
  this.reloading--;
    
 


    
/* player missile settings; ammunition and reloading */  
    if(Game.keys['fire'] && this.reloading <=0 && this.board.missiles < 1000) {
    GameAudio.play('fire');
        
    this.board.addSprite('missile',
                          this.x + this.w/2 - Sprites.map.missile.w/2,
                          this.y-this.h,
                          { dy: -300, player: true });
    this.board.e_missiles++;
    this.reloading = 9;
  }
    
    //cheatMode fire button (A)
        if(Game.keys['a'] && this.reloading <=0 && this.board.missiles < 1000) {
    GameAudio.play('fire');
        
    this.board.addSprite('nmissile',
                          this.x + this.w/20 - Sprites.map.missile.w/20,
                          this.y-this.h*2,
                          { dy: -1000, player: true });
    this.board.e_missiles++;
    //space 
    this.reloading = 2;
  }
    
    
  return true;
}

//////////////////////////////

//cheatMode missiles function
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

////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////

//Alien's missiles
var Emissile = function Emissile(opts) {
   this.dy = opts.dy;
   this.player = opts.player;
}

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






