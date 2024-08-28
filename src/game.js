import { init, Sprite, SpriteSheet, GameLoop, initKeys, keyMap, onKey, keyPressed, initGamepad, onGamepad, gamepadPressed, gamepadAxis } from 'kontra'
let { canvas, context } = init();

// Initialize music generation
var t_src = {
"m_menu_src":'',
"m_game1_src":'',
"m_game2_src":'',
"m_game3_src":'',
"m_game4_src":'',
"m_boss_src":'',
"m_death_src":'',
"m_tally_src":'',
"pu1_src":'',
"pu2_src":'',
"pu3_src":'',
"lp1_src":'',
"lp2_src":'',
"lp3_src":'',
"lz1_src":'',
"dr1_src":'',
"dr2_src":'',
"dr3_src":'',
"b1_src":'',
"lu1_src":'',
}

// Generate music...
var audio = document.createElement("audio");
audio.loop = true;
var sound1 = document.createElement("audio");
var sound2 = document.createElement("audio");
var sound3 = document.createElement("audio");
var level_up_audio = document.createElement("audio");

let music_tracks = [];
var current_music_track = 0;

var level = 1;
var countdownStart = 15;
var levelEndScore = 100;
var level_win_amount = 14;
var score = 0;
var total_score = 0;
var timer = countdownStart;
var second_counter = 0;
var game_started = false;
var level_started = false;
var title_started = true;
var intro_started = false;
var tutorial_started = false;
var level_score_calculating = false;
var mid_boss_time = false;
var final_boss_time = false;
var player_speed = 3;
var letter_spawn_time = 1.0;
var current_letter_spawn_time = 0.0;
var letter_fall_speed = 1;
var powerup_fall_speed = 1;
let powerups = [];
powerups.push({effect:'magnet_range', content: 'U', color: 'cyan'});
powerups.push({effect:'magnet_speed_mult', content: 'U', color: 'green'});
powerups.push({effect:'thrust_time', content: 'T', color: 'orange'});
powerups.push({effect:'thrust_refresh_time', content: 'T', color: 'brown'});
powerups.push({effect:'thrust_mult', content: 'T', color: 'green'});
powerups.push({effect:'player_speed', content: 'S', color: 'green'});
powerups.push({effect:'bomb_dmg', content: 'B', color: 'yellow'});
powerups.push({effect:'bomb_time', content: 'B', color: 'orange'});
let letterz = [];
let primes = [];
let gprimes = [];
let dubz = [];
let gdubz = [];
let enemies = [];
let bombs = [];
let ui = [];

initKeys();
initGamepad();

let image = new Image();
image.src = 'player_sheet.png'
image.onload = function() {
    let spriteSheet = SpriteSheet({
        image: image,
        frameWidth: 32,
        frameHeight: 32,
        animations: {
            idle: {
                frames: [0, 1, 2, 3],
                frameRate: 5,
                loop: true,
            },
            walk: {
                frames: [4, 5, 6, 7],
                frameRate: 5,
                loop: true,
            },
            die: {
                frames: 10,
                frameRate: 5,
                loop: false,
            }
        }
    });

    let player = Sprite({
  speed: player_speed,
  isMoving: false,
  isPrimed: false,
  scaleX: 1.0,
  scaleY: 1.0,
  badShit: 0,
  win: false,
  magnetRange: 32, // in pixels, including player 32x32 sprite
  magnetSpeedMult: 1.0,
  thrustMult: 1.0,
  thrustRefreshTime: 0.5,
  currentThrustRefreshTime: 0.0,
  thrustTime: 0.3,
  currentThurstTime: 0.0,
  isThrusting: false,
  isThrustRefreshing: false,
  bombDmg: 5,
  bombTime: 5.0,
  currentBombTime: 0.0,
  stunTime: 0.5,
  currentStunTime: 0.0,
  isStunned: false,
  x: 360,        // starting x,y position of the sprite
  y: 240,
  anchor: {x: 0.5, y: 0.5},       // move the sprite 2px to the right every frame
  animations: spriteSheet.animations,
  ttl: 0,
  update() {
    // check the axis of the gamepad connected to index 0
    let axisX = gamepadAxis('leftstickx', 0);
    let axisY = gamepadAxis('leftsticky', 0);

    this.isMoving = false;

    if (this.currentBombTime > 0.0) {
      this.currentBombTime -= 1/60;
    }

    if (this.isStunned) {
      this.currentStunTime += 1/60;
      if(this.currentStunTime >= this.stunTime) {
        this.isStunned = false;
        this.currentStunTime = 0.0
      }
    }

    if(!this.isStunned) {
      if (axisX < -0.4 || keyPressed(['arrowleft', 'a'])) {
        this.x -= 1*this.speed;
        this.isMoving = true;
      }
      else if (axisX > 0.4 || keyPressed(['arrowright', 'd'])) {
        this.x += 1*this.speed;
        this.isMoving = true;
      }

      if (axisY < -0.4 || keyPressed(['arrowup', 'w'])) {
        this.y -= 1*this.speed;
        this.isMoving = true;
      }
      else if (axisY > 0.4 || keyPressed(['arrowdown', 's'])) {
        this.y += 1*this.speed;
        this.isMoving = true;
      }
    }

    if(this.isThrusting) {
      if (this.currentThurstTime > this.thrustTime) {
        this.isThrusting = false;
        this.isThrustRefreshing = true;
        this.speed = player_speed;
        this.currentThurstTime = 0.0;
      } else {
        this.currentThurstTime += 1/60;
      }
    }

    if(this.isThrustRefreshing) {
      if (this.currentThrustRefreshTime > this.thrustRefreshTime) {
        this.isThrustRefreshing = false;
        this.currentThrustRefreshTime = 0.0;
      } else {
        this.currentThrustRefreshTime += 1/60;
      }
    }

    
      for(var i = 0; i < letterz.length; i++) {
        let lett = letterz[i];

        // letter collision
        if(rectCollide(this, lett)) {
          if (lett.type == 'letter') {
            score += parseInt(lett.content);
            timer += parseInt(lett.content);

            if (score >= levelEndScore) {
                level += 1;
                levelz.content = "Level: " + level;
                audio.pause();

                if (level >= level_win_amount) {
                    win();
                    draw_win();
                } else {
                  draw(context, 'Next Level!', 9, '#FFFFFF', 125, 200);

                  loop.stop();
                  level_up_audio.src = t_src.lu1_src;
                  level_up_audio.play();
                  letter_fall_speed += 0.25;
                }
            } else {
              var temp = Math.floor((Math.random()*3));

              if (temp == 0) {
                playSound(sound1, t_src.lp1_src);
              }
              if (temp == 1) {
                playSound(sound1, t_src.lp2_src);
              }
              if (temp == 2) {
                playSound(sound1, t_src.lp3_src);
              }
            }
            scorez.content = 'Score: ' + score;

            if(primes.includes(score)) {
                reverseBadShit();
                this.isPrimed = true;
                this.isThrusting = false;
                doBadShit();
            } else {
                reverseBadShit();
                this.isPrimed = false;
            }

            if(dubz.includes(score)) {
              // generate a random powerup
              createPowerUp(powerups[Math.floor((Math.random()*powerups.length))]);
              dubz = dubz.filter(d => d != score);
            }

            calcNextPandD();
          }

          if (lett.type == 'powerup') {
            var temp = Math.floor((Math.random()*3));

              if (temp == 0) {
                playSound(sound1, t_src.lp1_src);
              }
              if (temp == 1) {
                playSound(sound1, t_src.lp2_src);
              }
              if (temp == 2) {
                playSound(sound1, t_src.lp3_src);
              }

              if (temp == 0) {
                playSound(sound2, t_src.pu1_src);
              }
              if (temp == 1) {
                playSound(sound2, t_src.pu2_src);
              }
              if (temp == 2) {
                playSound(sound2, t_src.pu3_src);
              }

              awardPowerup(lett.effect);
          }

          lett.ttl = 0;
        }

        // magnet gainz
        if(lett.x >= this.x - this.magnetRange && lett.x <= this.x + this.magnetRange) {
           if(lett.y >= this.y - this.magnetRange && lett.y <= this.y + this.magnetRange) {
              // we are within magnet range!
              if(lett.x > this.x) {
                lett.x -= 1*this.magnetSpeedMult;
              }
              if(lett.x < this.x) {
                lett.x += 1*this.magnetSpeedMult;
              }
              if(lett.y > this.y) {
                lett.y -= 1*this.magnetSpeedMult;
              }
              if(lett.y < this.y) {
                lett.y += 1*this.magnetSpeedMult;
              }
           }
        }
      }
    
      // Final boss time!
      for(var i = 0; i < enemies.length; i++) {
        let e = enemies[i];

        for(var b = 0; b < bombs.length; b++) {
          let bomb = bombs[b];

          if (rectCollide(e, bomb)) {
            if (bomb.type == 'p_bomb' && (e.type == '2' || e.type == '3' || e.type == '5' || e.type == '7')) {
              playSound(sound2, t_src.b1_src);
              e.ttl = 0;
              bomb.ttl = 0;
            }

            if (bomb.type == 'p_bomb' && (e.type == 'mid_boss' || e.type == 'final_boss')) {
              if (bomb.active) {
                playSound(sound2, t_src.b1_src);
                e.hp -= bomb.dmg;
                e.children[0].content = e.hp.toString();
                if (e.hp < 1 && e.ttl > 0) {
                  e.ttl = 0;

                  if (e.type == 'mid_boss') {
                    score += 500;
                    scorez.content = 'Score: ' + score;
                  }

                  if (e.type == 'final_boss') {
                    score += 1000;
                    scorez.content = 'Score: ' + score;
                    win();
                    draw_win();
                  }
                }
                bomb.ttl = 0;
                bomb.active = false;
              }
            }
          }
        }

        if((e.type == '2' || e.type == '3' || e.type == '5' || e.type == '7' || e.type == 'enemy_shot') && rectCollide(this, e)) {
          score -= e.scoreDamage;
          if (score < 0) {
            score = 0;
          }
          scorez.content = 'Score: ' + score;
          e.ttl = 0;

          this.isStunned = true;

          var temp = Math.floor((Math.random()*3));

          if (temp == 0) {
            playSound(sound1, t_src.lp1_src);
          }
          if (temp == 1) {
            playSound(sound1, t_src.lp2_src);
          }
          if (temp == 2) {
            playSound(sound1, t_src.lp3_src);
          }

          if(primes.includes(score)) {
              reverseBadShit();
              this.isPrimed = true;
              this.isThrusting = false;
              doBadShit();
          } else {
              reverseBadShit();
              this.isPrimed = false;
          }

          if(dubz.includes(score)) {
            // generate a random powerup
            createPowerUp(powerups[Math.floor((Math.random()*powerups.length))]);
            dubz = dubz.filter(d => d != score);
          }

          calcNextPandD();
        }

        if(e.type == 'mid_boss_shot' && rectCollide(this, e)) {
          die();
        }

        if(e.type == 'final_boss_shot' && rectCollide(this, e)) {
          die();
        }
      }
    


    if (this.isMoving) {
        if (this.currentAnimation.name != 'walk') {
            this.playAnimation('walk');
        }
        
    } else {
        if (this.currentAnimation.name != 'idle') {
            this.playAnimation('idle');
        }
    }

    this.advance();

  }
});

function createBomb(x, y, dmg) {
  let bomb = Sprite({
    type: 'p_bomb',
    active: true,
    content: 'X',
    x: x,        // starting x,y position of the sprite
    y: y,
    anchor: {x: 0.5, y: 0.5},
    color: '#CCCCCC',  // fill color of the sprite rectangle
    width: 35,     // width and height of the sprite rectangle
    height: 35,        // move the sprite 2px to the right every frame
    dmg: dmg,
    bombTimer: 10.0,
    update() {
      this.bombTimer -= 1/60;

      if (this.bombTimer < 0.0) {
        playSound(sound2, t_src.b1_src);
        this.ttl = 0;
      }
    },
    render() {
      draw(context, this.content, 4, this.color);
    }
  });

  player.currentBombTime = player.bombTime;
  bombs.push(bomb);
}

function rectCollide(rect1, rect2) {
  if (rect1.x >= rect2.x - rect2.width/2 && rect1.x <= rect2.x + rect2.width/2 && rect1.y >= rect2.y - rect2.height/2 && rect1.y <= rect2.y + rect2.height/2) {
    return true;
  } else {
    return false;
  }
}

function playSound(element, src) {
  element.src = src;
  element.play();
}

function switchTrack(track) {
  audio.pause()
  audio.currentTime = 0.0;
  audio.src = track;
  audio.play();
}

function nextMusicTrack() {
  current_music_track += 1;
  if (current_music_track > music_tracks.length - 1) {
    current_music_track = 0;
  }

  audio.pause()
  audio.currentTime = 0.0;
  audio.src = music_tracks[current_music_track];
  audio.play();
}

function previousMusicTrack() {
  current_music_track -= 1;
  if (current_music_track < 0) {
    current_music_track = 0;
  }

  audio.pause()
  audio.currentTime = 0.0;
  audio.src = music_tracks[current_music_track];
  audio.play();
}

function doBadShit() {
    playSound(sound2, t_src.dr1_src);
    player.badShit = Math.floor((Math.random()*3)+1);

    if (player.badShit == 1) {
        player.speed = -player.speed;
    }

    if (player.badShit == 2) {
        player.speed = 0.5;
    }

    if (player.badShit == 3) {
        player.speed = 10;
    }
}

function reverseBadShit() {
    if (player.isPrimed) {
      playSound(sound2, t_src.dr3_src);
    }

    if (player.badShit == 1) {
        player.speed = -player.speed;
    }

    if (player.badShit == 2) {
        player.speed = player_speed;
    }

    if (player.badShit == 3) {
        player.speed = player_speed;
    }

    player.badShit = 0;
}

function createLetter(dirX = 0, dirY = 1, x = Math.floor(Math.random()*canvas.width), y = 0) {
  let letter = Sprite({
    type: 'letter',
    dirX: dirX,
    dirY: dirY,
    content: Math.floor((Math.random()*9)+1).toString(),
    speed: letter_fall_speed,
    x: x,        // starting x,y position of the sprite
    y: y,
    anchor: {x: 0.5, y: 0.5},
    color: '#eeeeee',  // fill color of the sprite rectangle
    width: 20,     // width and height of the sprite rectangle
    height: 20,        // move the sprite 2px to the right every frame
    update() {
      this.x += dirX*this.speed;
      this.y += dirY*this.speed;

      if (this.y < 0 || this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
        this.ttl = 0;
      }
    },
    render() {
      draw(context, this.content, 4, this.color);
    }
  });

  letterz.push(letter);
}

function createPowerUp(p) {
  let powerup = Sprite({
    type: 'powerup',
    effect: p.effect,
    content: p.content,
    speed: powerup_fall_speed,
    x: Math.floor(Math.random()*canvas.width),        // starting x,y position of the sprite
    y: 0,
    anchor: {x: 0.5, y: 0.5},
    color: p.color,  // fill color of the sprite rectangle
    color1: p.color,
    color2: 'white',
    blinkTimer: 0,
    blinkSpeed: 30, // in frames, so 30 is half a second
    width: 20,     // width and height of the sprite rectangle
    height: 20,        // move the sprite 2px to the right every frame
    update() {
      this.y += 1*this.speed;

      this.blinkTimer += 1;
      if (this.blinkTimer > this.blinkSpeed) {
        if (this.color == this.color1) {
          this.color = this.color2;
        } else {
          this.color = this.color1;
        }

        this.blinkTimer = 0;
      }
    },
    render() {
      draw(context, this.content, 4, this.color);
    }
  });

  letterz.push(powerup);
}

function createEnemy(type, speed, scoreDamage) {
  let enemy = Sprite({
    type: type,
    content: type,
    speed: speed,
    scoreDamage: scoreDamage,
    shotTimer: 60,
    currentShotTime: 0,
    isMoving: false,
    x: Math.floor(Math.random()*canvas.width),        // starting x,y position of the sprite
    y: Math.floor(Math.random()*canvas.height),
    anchor: {x: 0.5, y: 0.5},
    color: 'yellow',  // fill color of the sprite rectangle
    width: 30,     // width and height of the sprite rectangle
    height: 30,        // move the sprite 2px to the right every frame
    update() {
      var moveX = Math.floor(Math.random()*2);
      var moveY = Math.floor(Math.random()*2);

      if (type == '3' || type == '7') {
        this.currentShotTime += 1;
        if(this.currentShotTime > this.shotTimer) {
          createEnemyShot(this.x, this.y);
          this.currentShotTime = 0;
        }
      }

      // random movement
      if (moveX == 0) {
        this.x -= 1*this.speed;
        this.isMoving = true;
      }
      else if (moveX == 1) {
        this.x += 1*this.speed;
        this.isMoving = true;
      }

      if (moveY == 0) {
        this.y -= 1*this.speed;
        this.isMoving = true;
      }
      else if (moveY == 1) {
        this.y += 1*this.speed;
        this.isMoving = true;
      }

      // move towards player somewhat
      if (this.x < player.x) {
        this.x += 1*this.speed;
      }
      if (this.x > player.x) {
        this.x -= 1*this.speed;
      }
      if (this.y < player.y) {
        this.y += 1*this.speed;
      }
      if (this.y > player.y) {
        this.y -= 1*this.speed;
      }

      // make sure doesn't go off screen
      if (this.x < 0) {
        this.x = 0;
      }
      if (this.x > canvas.width) {
        this.x = canvas.width;
      }
      if (this.y < 0) {
        this.y = 0;
      }
      if (this.y > canvas.height) {
        this.y = canvas.height;
      }
    },
    render() {
      draw(context, this.content, 4, this.color);
    }
  });

  enemies.push(enemy);
}

function createMidBoss() {
  let midBoss = Sprite({
    type: 'mid_boss',
    hp: 60,
    shotTimer: 120,
    currentShotTime: 0,
    content: 'PR1M3',
    speed: 1,
    isMoving: false,
    x: Math.floor(Math.random()*canvas.width),        // starting x,y position of the sprite
    y: Math.floor(Math.random()*canvas.height),
    anchor: {x: 0.5, y: 0.5},
    color: 'yellow',  // fill color of the sprite rectangle
    width: 120,     // width and height of the sprite rectangle
    height: 50,        // move the sprite 2px to the right every frame
    update() {
      this.currentShotTime += 1;
      if(this.currentShotTime > this.shotTimer) {
        playSound(sound3, t_src.lz1_src);
        createMidBossShot(this.x, this.y, -1, -1);
        createMidBossShot(this.x, this.y, -1, 1);
        createMidBossShot(this.x, this.y, 1, -1);
        createMidBossShot(this.x, this.y, 1, 1);
        this.currentShotTime = 0;
      }

      var moveX = Math.floor(Math.random()*2);
      var moveY = Math.floor(Math.random()*2);

      // random movement
      if (moveX == 0) {
        this.x -= 3*this.speed;
        this.isMoving = true;
      }
      else if (moveX == 1) {
        this.x += 3*this.speed;
        this.isMoving = true;
      }

      if (moveY == 0) {
        this.y -= 3*this.speed;
        this.isMoving = true;
      }
      else if (moveY == 1) {
        this.y += 3*this.speed;
        this.isMoving = true;
      }

      // move towards player somewhat
      /*if (this.x < player.x) {
        this.x += 1*this.speed;
      }
      if (this.x > player.x) {
        this.x -= 1*this.speed;
      }
      if (this.y < player.y) {
        this.y += 1*this.speed;
      }
      if (this.y > player.y) {
        this.y -= 1*this.speed;
      }*/

      // make sure doesn't go off screen
      if (this.x < 0) {
        this.x = 0;
      }
      if (this.x > canvas.width) {
        this.x = canvas.width;
      }
      if (this.y < 0) {
        this.y = 0;
      }
      if (this.y > canvas.height) {
        this.y = canvas.height;
      }
    },
    render() {
      draw(context, this.content, 6, this.color);
    }
  });

  let mid_hp_disp = Sprite({
    content: midBoss.hp.toString(),
    x: -10,        // starting x,y position of the sprite
    y: 25,
    color: 'red',  // fill color of the sprite rectangle
    width: 30,     // width and height of the sprite rectangle
    height: 30,        // move the sprite 2px to the right every frame
    update() {
      
    },
    render() {
      draw(context, this.content, 4, this.color);
    }
  });

  midBoss.addChild(mid_hp_disp);

  enemies.push(midBoss);
}

function createFinalBoss() {
  let finalBoss = Sprite({
    type: 'final_boss',
    hp: 120,
    shotTimer: 60,
    currentShotTime: 0,
    content: '8055',
    speed: 1.5,
    isMoving: false,
    x: Math.floor(Math.random()*canvas.width),        // starting x,y position of the sprite
    y: Math.floor(Math.random()*canvas.height),
    anchor: {x: 0.5, y: 0.5},
    color: 'red',  // fill color of the sprite rectangle
    width: 100,     // width and height of the sprite rectangle
    height: 50,        // move the sprite 2px to the right every frame
    update() {
      this.currentShotTime += 1;
      if(this.currentShotTime > this.shotTimer) {
        playSound(sound3, t_src.lz1_src);
        createFinalBossShot(this.x, this.y);
        this.currentShotTime = 0;
      }

      var moveX = Math.floor(Math.random()*2);
      var moveY = Math.floor(Math.random()*2);

      // random movement
      if (moveX == 0) {
        this.x -= 3*this.speed;
        this.isMoving = true;
      }
      else if (moveX == 1) {
        this.x += 3*this.speed;
        this.isMoving = true;
      }

      if (moveY == 0) {
        this.y -= 3*this.speed;
        this.isMoving = true;
      }
      else if (moveY == 1) {
        this.y += 3*this.speed;
        this.isMoving = true;
      }

      // move towards player somewhat
      if (this.x < player.x) {
        this.x += 1*this.speed;
      }
      if (this.x > player.x) {
        this.x -= 1*this.speed;
      }
      if (this.y < player.y) {
        this.y += 1*this.speed;
      }
      if (this.y > player.y) {
        this.y -= 1*this.speed;
      }

      // make sure doesn't go off screen
      if (this.x < 0) {
        this.x = 0;
      }
      if (this.x > canvas.width) {
        this.x = canvas.width;
      }
      if (this.y < 0) {
        this.y = 0;
      }
      if (this.y > canvas.height) {
        this.y = canvas.height;
      }
    },
    render() {
      draw(context, this.content, 8, this.color);
    }
  });

  let final_hp_disp = Sprite({
    content: finalBoss.hp.toString(),
    x: -10,        // starting x,y position of the sprite
    y: 25,
    color: 'red',  // fill color of the sprite rectangle
    width: 30,     // width and height of the sprite rectangle
    height: 30,        // move the sprite 2px to the right every frame
    update() {
      
    },
    render() {
      draw(context, this.content, 4, this.color);
    }
  });

  finalBoss.addChild(final_hp_disp);

  enemies.push(finalBoss);
}

function createEnemyShot(x, y) {
  playSound(sound3, t_src.lz1_src);

  let enemyShot = Sprite({
    type: 'enemy_shot',
    moveX: Math.floor(Math.random()*2),
    moveY: Math.floor(Math.random()*2),
    ttl: 180,
    content: '5',
    speed: 3,
    scoreDamage: 1,
    isMoving: false,
    x: x,        // starting x,y position of the sprite
    y: y,
    anchor: {x: 0.5, y: 0.5},
    color: 'pink',  // fill color of the sprite rectangle
    width: 10,     // width and height of the sprite rectangle
    height: 10,        // move the sprite 2px to the right every frame
    update(dt) {
      this.rotation += 0.1;

      // random movement
      if (this.moveX == 0) {
        this.x -= 1*this.speed;
        this.isMoving = true;
      }
      else if (this.moveX == 1) {
        this.x += 1*this.speed;
        this.isMoving = true;
      }

      if (this.moveY == 0) {
        this.y -= 1*this.speed;
        this.isMoving = true;
      }
      else if (this.moveY == 1) {
        this.y += 1*this.speed;
        this.isMoving = true;
      }
    },
    render() {
      draw(context, this.content, 2, this.color);
    }
  });

  enemies.push(enemyShot);
}

function createMidBossShot(finalBossX, finalBossY, moveX, moveY) {
  let midBossShot = Sprite({
    type: 'mid_boss_shot',
    moveX: moveX,
    moveY: moveY,
    ttl: 180,
    content: '7',
    speed: 3,
    isMoving: false,
    x: finalBossX,        // starting x,y position of the sprite
    y: finalBossY,
    anchor: {x: 0.5, y: 0.5},
    color: 'orange',  // fill color of the sprite rectangle
    width: 10,     // width and height of the sprite rectangle
    height: 10,        // move the sprite 2px to the right every frame
    update(dt) {
      this.rotation += 0.1;

      this.x += moveX;
      this.y += moveY;
    },
    render() {
      draw(context, this.content, 4, this.color);
    }
  });

  enemies.push(midBossShot);
}

function createFinalBossShot(finalBossX, finalBossY) {
  let finalBossShot = Sprite({
    type: 'final_boss_shot',
    moveX: Math.floor(Math.random()*2),
    moveY: Math.floor(Math.random()*2),
    ttl: 180,
    content: '13',
    speed: 3,
    isMoving: false,
    x: finalBossX,        // starting x,y position of the sprite
    y: finalBossY,
    anchor: {x: 0.5, y: 0.5},
    color: 'pink',  // fill color of the sprite rectangle
    width: 40,     // width and height of the sprite rectangle
    height: 20,        // move the sprite 2px to the right every frame
    update(dt) {
      this.rotation += 0.2;
      // random movement
      if (this.moveX == 0) {
        this.x -= 1*this.speed;
        this.isMoving = true;
      }
      else if (this.moveX == 1) {
        this.x += 1*this.speed;
        this.isMoving = true;
      }

      if (this.moveY == 0) {
        this.y -= 1*this.speed;
        this.isMoving = true;
      }
      else if (this.moveY == 1) {
        this.y += 1*this.speed;
        this.isMoving = true;
      }
    },
    render() {
      draw(context, this.content, 4, this.color);
    }
  });

  enemies.push(finalBossShot);
}

let levelz = Sprite({
    content: 'Level: ' + level,
    x: 5,        // starting x,y position of the sprite
    y: 5,
    color: '#eeeeee',  // fill color of the sprite rectangle
    width: 20,     // width and height of the sprite rectangle
    height: 20,        // move the sprite 2px to the right every frame
    update() {
      
    },
    render() {
      draw(context, this.content, 4, this.color);
    }
  });
ui.push(levelz);

let scorez = Sprite({
    content: 'Score: ' + score,
    x: 5,        // starting x,y position of the sprite
    y: 30,
    color: '#eeeeee',  // fill color of the sprite rectangle
    width: 20,     // width and height of the sprite rectangle
    height: 20,        // move the sprite 2px to the right every frame
    update() {
      if (player.isPrimed) {
        this.color = '#ff0000';
      } else {
        this.color = '#eeeeee';
      }
    },
    render() {
      draw(context, this.content, 4, this.color);
    }
  });
ui.push(scorez);

let scorep = Sprite({
    content: score.toString(),
    x: -3,        // starting x,y position of the sprite
    y: -35,
    color: '#eeeeee',  // fill color of the sprite rectangle
    width: 15,     // width and height of the sprite rectangle
    height: 15,        // move the sprite 2px to the right every frame
    update() {
      this.content = score.toString();

      if (score > 9) {
        this.x = -10;
      } else {
        this.x = -3;
      }

      if (player.isPrimed) {
        this.color = '#ff0000';
      } else {
        this.color = '#eeeeee';
      }
    },
    render() {
      draw(context, this.content, 3, this.color);
    }
  });

player.addChild(scorep);

let nextdubp = Sprite({
    content: score.toString(),
    x: -23,        // starting x,y position of the sprite
    y: 20,
    color: 'green',  // fill color of the sprite rectangle
    width: 15,     // width and height of the sprite rectangle
    height: 15,        // move the sprite 2px to the right every frame
    update() {
      
    },
    render() {
      draw(context, this.content, 3, this.color);
    }
  });

player.addChild(nextdubp);

let nextprimep = Sprite({
    content: score.toString(),
    x: 13,        // starting x,y position of the sprite
    y: 20,
    color: 'red',  // fill color of the sprite rectangle
    width: 15,     // width and height of the sprite rectangle
    height: 15,        // move the sprite 2px to the right every frame
    update() {
      
    },
    render() {
      draw(context, this.content, 3, this.color);
    }
  });

player.addChild(nextprimep);

let totalscorez = Sprite({
    content: 'Total: ' + total_score,
    x: 5,        // starting x,y position of the sprite
    y: 55,
    color: '#eeeeee',  // fill color of the sprite rectangle
    width: 20,     // width and height of the sprite rectangle
    height: 20,        // move the sprite 2px to the right every frame
    update() {
      
    },
    render() {
      draw(context, this.content, 4, this.color);
    }
  });
ui.push(totalscorez);

let timerz = Sprite({
    content: 'Time Left: ' + timer,
    x: 5,        // starting x,y position of the sprite
    y: 80,
    color: '#eeeeee',  // fill color of the sprite rectangle
    width: 20,     // width and height of the sprite rectangle
    height: 20,        // move the sprite 2px to the right every frame
    update() {
      this.content = 'Time Left: ' + timer;
      if (timer <= 10) {
        this.color = '#ff0000';
        
        if (timer <= 5) {
            audio.playbackRate = 1.22;
        } else {
            audio.playbackRate = 1.11;
        }
      } else {
        this.color = '#eeeeee';
        audio.playbackRate = 1.0;
      }
    },
    render() {
      draw(context, this.content, 4, this.color);
    }
  });
ui.push(timerz);

function calcNextPandD() {
  gprimes = primes.filter(p => p > score);
  gdubz = dubz.filter(d => d > score);

  var c = (gprimes[0] - score).toString();
  if (c == 'NaN') {
    c = ' ';
  }
  nextprimep.content = c;
  c = (gdubz[0] - score).toString();
  if (c == 'NaN') {
    c = ' ';
  }
  nextdubp.content = c;
}

let intro = Sprite({
    title: 'PRIMONUMEROPHOBIA',
    page1: 'In the beginning: there were only evens',
    page2: 'Odds came about: and were sus',
    page3: 'It made the primes: EVIL EVIL EVIL',
    page4: 'Get thee hence! You prime',
    tut1: 'WASD or Arrows or Left Stick to move',
    tut2: 'Shift or West Gamepad button to thrust',
    tut3: 'E or East Gamepad button to plant bomb',
    tut4: 'M or Select to toggle music',
    tut5: 'P or Start to pause',
    opacity: 1.0,
    x: 340,        // starting x,y position of the sprite
    y: 300,
    color: '#ffffff',  // fill color of the sprite rectangle
    update() {
      if ((gamepadPressed('start') || gamepadPressed('south') || keyPressed(['r', 'enter', 'space']))) {
        if (intro_started) {
          intro_started = false;
          tutorial_started = true;
          console.log('tut');
        }
        if (title_started) {
          title_started = false;
          intro_started = true;
          console.log('intro');
        }
      }
    },
    render() {
      if(title_started) {
        draw(context, this.title, 9, 'red');
      }
      if(!title_started && intro_started) {
        draw(context, this.page1, 4, this.color);
        draw(context, this.page2, 4, this.color, 0, 64);
        draw(context, this.page3, 4, this.color, 0, 128);
        draw(context, this.page4, 4, this.color, 0, 192);
      }
      if(!title_started && !intro_started && tutorial_started) {
        draw(context, this.tut1, 4, this.color);
        draw(context, this.tut2, 4, this.color, 0, 64);
        draw(context, this.tut3, 4, this.color, 0, 128);
        draw(context, this.tut4, 4, this.color, 0, 192);
        draw(context, this.tut5, 4, this.color, 0, 256);
      }
    }
  });

let loop = GameLoop({  // create the main game loop
  update: function() { // update the game state
    if (player.isAlive() && level_started) {
      if (!level_score_calculating) {
        second_counter += 1/60;
        current_letter_spawn_time += 1/60;

        if (second_counter > 1) {
          timer -= 1;
          if (level > 1 && primes.includes(timer)) {
            var t = [2, 3, 5, 7];
            var r = Math.floor(Math.random()*4);
            createEnemy(t[r].toString(), Math.floor(Math.random()*1)+1, t[r]);

            while(enemies.length > 10) {
              enemies.splice(1, 1);
            }
          };
          second_counter = 0;
        }

        if (current_letter_spawn_time > letter_spawn_time) {
          if (level < 3) {
            createLetter();
          } else if (level >= 3 && level < 7) {
            var temp = Math.floor(Math.random()*2);
            if (temp == 0) {
              createLetter(0, 1);
            } else {
              createLetter(0, -1, Math.floor(Math.random()*canvas.width), canvas.height);
            }
          } else if (level >= 7 && level < 10) {
            var temp = Math.floor(Math.random()*4);
            if (temp == 0) {
              createLetter(0, 1);
            } 
            if (temp == 1) {
              createLetter(0, -1, Math.floor(Math.random()*canvas.width), canvas.height);
            }
            if (temp == 2) {
              createLetter(1, 0, 0, Math.floor(Math.random()*canvas.height));
            } 
            if (temp == 3) {
              createLetter(-1, 0, canvas.width, Math.floor(Math.random()*canvas.height));
            }
          } else if (level > 9 && level < 13) {
            var temp = Math.floor(Math.random()*8);
            if (temp == 0) {
              createLetter(0, 1);
            } 
            if (temp == 1) {
              createLetter(0, -1, Math.floor(Math.random()*canvas.width), canvas.height);
            }
            if (temp == 2) {
              createLetter(1, 0, 0, Math.floor(Math.random()*canvas.height));
            } 
            if (temp == 3) {
              createLetter(-1, 0, canvas.width, Math.floor(Math.random()*canvas.height));
            }
            if (temp == 4) {
              createLetter(1, 1, Math.floor(Math.random()*canvas.width), 0);
            } 
            if (temp == 5) {
              createLetter(-1, 1, Math.floor(Math.random()*canvas.width), 0);
            }
            if (temp == 6) {
              createLetter(1, -1, Math.floor(Math.random()*canvas.width), canvas.height);
            } 
            if (temp == 7) {
              createLetter(-1, -1, Math.floor(Math.random()*canvas.width), canvas.height);
            }
          }
          current_letter_spawn_time = 0.0;
        }

        player.update();

        // keep player in screen
        if (player.x > canvas.width) {
          player.x = canvas.width;
        }
        if (player.x < 0) {
          player.x = 0;
        }
        if (player.y < 0) {
          player.y = 0;
        }
        if (player.y > canvas.height) {
          player.y = canvas.height;
        }

        if(!final_boss_time) {
          letterz.map(letter => {
            letter.update();
          });

          letterz = letterz.filter(letter => letter.isAlive());

          if (timer < 1) {
              die();
          }
        } else {
          
        }

        enemies.map(enemy => {
          enemy.update();
        });

        enemies = enemies.filter(enemy => enemy.isAlive());
        bombs = bombs.filter(b => b.isAlive());
      } else {
          if (level_up_audio.paused) {
            level_up_audio.src = t_src.m_tally_src;
            level_up_audio.loop = true;
            level_up_audio.play(); 
          }
          if (score > 0) {
            score -= 1;
            scorez.content = "Score: " + score;
            total_score += 1;
            totalscorez.content = "Total: " + total_score;
          }

          if (score < 1 && timer > 0) {
            timer -= 1;
            timerz.content = "Time: " + timer;
            total_score += 1;
            totalscorez.content = "Total: " + total_score;
          }

          if (score < 1 && timer < 1 && level_up_audio.currentTime > 2.6) {
            // start new level, clear field
            enemies = enemies.filter(enemy => { !enemy.isAlive(); });
            bombs = bombs.filter(b => { !b.isAlive(); });
            letterz = letterz.filter(letter => { !letter.isAlive(); });
            primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];
            dubz = [11,22,33,44,55,66,77,88,99];

            level_score_calculating = false;
            score = 0;
            timer = countdownStart;
            calcNextPandD();

            level_up_audio.pause();
            level_up_audio.src = t_src.lu1_src;
            level_up_audio.loop = false;
            level_up_audio.currentTime = 0.0;

            audio.playbackRate = 1.0;
            switchTrack(t_src.m_game4_src);

            level_started = false;
          }
      }
        ui.map(ui_sprite => {
          ui_sprite.update();
        });
    } else {
        if (game_started && !player.isAlive() && ((gamepadPressed('start') || gamepadPressed('south') || keyPressed(['r', 'enter', 'space'])))) {
            restart();
            console.log('restart');
        }

        if (!intro_started && !tutorial_started && !game_started && ((gamepadPressed('start') || gamepadPressed('south') || keyPressed(['r', 'enter', 'space'])))) {
            new_game();
            console.log('newgame');
        }

        if (!intro_started && !tutorial_started && !level_started && ((gamepadPressed('start') || gamepadPressed('south') || keyPressed(['r', 'enter', 'space'])))) {
          console.log('level started');
          if (level <= 3) {
            audio.playbackRate = 1.0;
            switchTrack(t_src.m_game1_src);
          } else if (level >= 4 && level <= 6) {
            audio.playbackRate = 1.0;
            switchTrack(t_src.m_game3_src);
          } else if (level >= 7 && level <= 12) {
            audio.playbackRate = 1.0;
            switchTrack(t_src.m_game2_src);
          } else {
            audio.playbackRate += 0.1;
            audio.currentTime = 0.0;
            audio.play();
          }

          if (level == 7) {
            createMidBoss();
          }

          if (level == 13) {
            goToFinalBoss();
          }

          level_started = true;
        }
    }

    if(gamepadPressed('select') || keyPressed(['m'])) {
      audio.muted = !audio.muted;
    }

    if(gamepadPressed('north') || keyPressed(['l'])) {
      goToNextLevel(true);
    }

    if(gamepadPressed('east') || keyPressed(['e'])) {
      if (player.currentBombTime <= 0.0) {
        createBomb(player.x, player.y, player.bombDmg);
      }
    }

    if(keyPressed(['n']) && !mid_boss_time) {
      mid_boss_time = true;
      createMidBoss();
    }

    if(keyPressed(['b']) && !final_boss_time) {
      goToFinalBoss();
    }
  },
  render: function() { // render the game state
    if (game_started && level_started) {
        player.render();

        letterz.map(letter => {
          letter.render();
        });

        ui.map(ui_sprite => {
          ui_sprite.render();
        });

        enemies.map(enemy => {
          enemy.render();
        });

        bombs.map(b => {
          b.render();
        });

        if (!player.isAlive()) {
            if (player.win) {
                draw_win();
            } else {
                draw(context, "GAME OVER", 12, 'red', 420, 300);
            }
        }
    } else {
      if(game_started && !level_started && !intro_started && !tutorial_started) {
        draw(context, "LEVEL COMPLETE", 12, 'green', 320, 300);
        draw(context, "PRESS START OR SOUTH BUTTON FOR NEXT LEVEL", 4, 'white', 335, 380);
      }
    }

    if(title_started || intro_started || tutorial_started) {
        intro.update();
        intro.render();
      }
  }
});

onKey(['p'], function(e) {
  if (loop.isStopped) {
    loop.start();
    audio.play();
  } else {
    loop.stop();
    audio.pause();
  }
});

keyMap['BracketLeft'] = 'leftbracket';
keyMap['BracketRight'] = 'rightbracket';
keyMap['ShiftLeft'] = 'leftshift';

// music player control
onKey('leftbracket', function(e) {
    previousMusicTrack();
});

onKey('rightbracket', function(e) {
    nextMusicTrack();
});

// player thrust
onKey('leftshift', function(e) {
  if (!player.isThrusting && !player.isThrustRefreshing && !player.isPrimed) {
    player.isThrusting = true;
    player.speed = player_speed * player.thrustMult;
  }
});

onKey('leftshift', function(e) {
  if (player.isThrusting) {
    player.isThrusting = false;
    player.isThrustRefreshing = true;
    player.speed = player_speed;
  }
}, {handler: 'keyup'});

onGamepad('west', function(e) {
  if (!player.isThrusting && !player.isThrustRefreshing && !player.isPrimed) {
    player.isThrusting = true;
    player.speed = player_speed * player.thrustMult;
  }
});

onGamepad('west', function(e) {
  if (player.isThrusting) {
    player.isThrusting = false;
    player.isThrustRefreshing = true;
    player.speed = player_speed;
  }
}, {handler: 'gamepadup'});

function goToFinalBoss() {
  final_boss_time = true;
  levelz.color = 'red';
  timerz.ttl = 0;

  enemies = enemies.filter(enemy => { !enemy.isAlive(); });
  bombs = bombs.filter(b => { !b.isAlive(); });
  letterz = letterz.filter(letter => !letter.isAlive());
  ui = ui.filter(ui_sprite => { !ui_sprite.isAlive(); });

  audio.pause();
  audio.currentTime = 0;
  audio.playbackRate = 1.0;
  audio.src = t_src.m_boss_src;
  audio.loop = true;
  audio.play();

  createFinalBoss();
}

preloadAudio(m_game1_d, "m_game1_src", true);
preloadAudio(m_game2_d, "m_game2_src", true);
preloadAudio(m_game3_d, "m_game3_src", true);
preloadAudio(song4, "m_game4_src", true);
preloadAudio(m_death_d, "m_death_src");
preloadAudio(tally, "m_tally_src");
preloadAudio(m_menu_d, "m_menu_src", true);
preloadAudio(m_boss_d, "m_boss_src", true);
preloadAudio(pu1, "pu1_src");
preloadAudio(pu2, "pu2_src");
preloadAudio(pu3, "pu3_src");
preloadAudio(lp1, "lp1_src");
preloadAudio(lp2, "lp2_src");
preloadAudio(lp3, "lp3_src");
preloadAudio(lz1, "lz1_src");
preloadAudio(dr1, "dr1_src");
preloadAudio(dr2, "dr2_src");
preloadAudio(dr3, "dr3_src");
preloadAudio(b1, "b1_src");
preloadAudio(lu1, "lu1_src");

function preloadAudio(audio, src, m = false) {
  var c = new CPlayer();
  var done = false
  c.init(audio);

  setInterval(function() {
    if(done) {
      return;
    }

    done = c.generate() >= 1;

    if(done) {
      var w = c.createWave();
      Object.defineProperty(t_src, src, {
        value: URL.createObjectURL(new Blob([w], {type: "audio/wav"})),
      });

      if(src == "m_menu_src") {
        switchTrack(t_src.m_menu_src);
      }

      if(m) {
        music_tracks.push(t_src.src);
      }
    }
  });
}

audio.onended = function() {
  if (audio.src == t_src.dr2_src) {
    audio.src = t_src.m_death_src;
    audio.loop = false;
    audio.currentTime = 0;
    audio.playbackRate = 1.0;
    audio.play();
  }
}

level_up_audio.onended = function() {
  level_score_calculating = true;
  loop.start();
}  

loop.start();    // start the game

function die() {
  player.ttl = 0;
  player.win = false;
  player.playAnimation('die');
  letterz.filter(letter => { letter.ttl = 0; });
  audio.pause();
  audio.currentTime = 0;
  audio.playbackRate = 1.0;
  audio.src = t_src.dr2_src;
  audio.loop = false;
  audio.play();
};

function win() {
  player.ttl = 0;
  player.win = true;
  player.playAnimation('idle');
  letterz.filter(letter => { letter.ttl = 0; });
  audio.pause();
  audio.currentTime = 0;
}

function draw_win() {
  draw(context, "YOU WIN!", 12, 'red', 460, 300);
}

function new_game() {
  final_boss_time = false;
  mid_boss_time = false;
  primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];
  dubz = [11,22,33,44,55,66,77,88,99];
  level = 1;
  levelEndScore = 100;
  levelz.content = 'Level: ' + level;
  score = 0;
  scorez.content = 'Score: ' + score;
  total_score = 0;
  totalscorez.content = 'Total: ' + total_score;
  timer = countdownStart;
  second_counter = 0;
  timerz.content = 'Time Left: ' + timer;
  calcNextPandD();

  ui.push(levelz);
  ui.push(scorez);
  ui.push(timerz);

  enemies = enemies.filter(e => !e.isAlive());
  bombs = bombs.filter(b => { !b.isAlive(); });

  player.x = canvas.width/2;
  player.y = canvas.height/2+canvas.height/4;
  player.ttl = Infinity;
  player.win = false;
  title_started = false;
  game_started = true;
  intro_started = false;
  tutorial_started = false;
  level_started = false;
};

function restart() {
  primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];
  dubz = [11,22,33,44,55,66,77,88,99];
    
  if (final_boss_time) {
    player.x = canvas.width/2;
    player.y = canvas.height/2+canvas.height/4;
    player.ttl = Infinity;
    player.win = false;
    title_started = false;
    intro_started = false;
    tutorial_started = false;
    level_started = true;
  } else {
    mid_boss_time = false;
    final_boss_time = false;
    level = 1;
    levelz.content = 'Level: ' + level;
    score = 0;
    scorez.content = 'Score: ' + score;
    total_score = 0;
    totalscorez.content = 'Total: ' + total_score;
    timer = countdownStart;
    second_counter = 0;
    timerz.content = 'Time Left: ' + timer;
    calcNextPandD();

    ui.push(levelz);
    ui.push(scorez);
    ui.push(timerz);

    enemies = enemies.filter(e => !e.isAlive());
    bombs = bombs.filter(b => { !b.isAlive(); });

    player.x = canvas.width/2+canvas.height/4;
    player.y = canvas.height/2+canvas.height/4;
    player.ttl = Infinity;
    player.win = false;
    title_started = false;
    intro_started = false;
    tutorial_started = false;
    level_started = true;
  }
};

function awardPowerup(effect) {
  if (effect == 'magnet_range') {
    player.magnetRange += 4;
  }
  if (effect == 'magnet_speed_mult') {
    player.magnetSpeedMult += 0.1;
  }
  if (effect == 'thrust_time') {
    player.thrustTime += 0.1;
  }
  if (effect == 'thrust_refresh_time') {
    player.thrustRefreshTime -= 0.05;
  }
  if (effect == 'thrust_mult') {
    player.thrustMult += 0.1;
  }
  if (effect == 'player_speed') {
    player_speed += 0.1;
    player.speed = player_speed;
  }
  if (effect == 'bomb_dmg') {
    player.bombDmg += 1;
  }
  if (effect == 'bomb_time') {
    player.bomb_time -= 0.2;
  }
}

function goToNextLevel(skip = false) {
    level += 1;
    audio.pause();

    // we are using dev skip
    if (skip) {
      score += 100;
      for(var i=0; i<5;i++) {
        awardPowerup(powerups[Math.floor(Math.random()*(powerups.length-1))].effect);
      }
    }

    if (level >= level_win_amount) {
        win();
        draw_win();
    } else {
      draw(context, 'Next Level!', 9, '#FFFFFF', 125, 200);

      loop.stop();
      level_up_audio.src = t_src.lu1_src;
      level_up_audio.play();
      letter_fall_speed += 0.25;
  }

  levelz.content = "Level: " + level;
}

};