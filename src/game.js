import { init, Sprite, SpriteSheet, GameLoop, initKeys, keyMap, onKey, keyPressed, initGamepad, onGamepad, gamepadPressed, gamepadAxis } from 'kontra'
let { canvas, context } = init();
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

  // Initialize music generation (player).
  var m_game1 = new CPlayer();
  var m_game2 = new CPlayer();
  var m_game3 = new CPlayer();
  var m_menu = new CPlayer();
  var m_boss = new CPlayer();
  var m_death = new CPlayer();
  var s_pu1 = new CPlayer();
  var s_pu2 = new CPlayer();
  var s_pu3 = new CPlayer();
  var s_lp1 = new CPlayer();
  var s_lp2 = new CPlayer();
  var s_lp3 = new CPlayer();
  var s_lz1 = new CPlayer();
  var s_dr1 = new CPlayer();
  var s_dr2 = new CPlayer();
  var s_b1 = new CPlayer();
  var s_lu1 = new CPlayer();

  var m_menu_src;
  var m_game1_src;
  var m_game2_src;
  var m_game3_src;
  var m_boss_src;
  var m_death_src;
  var pu1_src;
  var pu2_src;
  var pu3_src;
  var lp1_src;
  var lp2_src;
  var lp3_src;
  var lz1_src;
  var dr1_src;
  var dr2_src;
  var b1_src;
  var lu1_src;

  // Generate music...
  var audio;
  var sound1;
  var sound2;
  var sound3;
  var level_up_audio;

  let music_tracks = [];
  var current_music_track = 0;

  var done = false;
  m_game1.init(m_game1_d);

  setInterval(function () {
    if (done) {
      return;
    }

    done = m_game1.generate() >= 1;

    if (done) {
      // Put the generated song in an Audio element.
      var w = m_game1.createWave();
      m_game1_src = URL.createObjectURL(new Blob([w], {type: "audio/wav"}));
      music_tracks.push(m_game1_src);
    }
  });

  var done2 = false;
  m_game2.init(m_game2_d);

  setInterval(function () {
    if (done2) {
      return;
    }

    done2 = m_game2.generate() >= 1;

    if (done2) {
      // Put the generated song in an Audio element.
      var w = m_game2.createWave();
      m_game2_src = URL.createObjectURL(new Blob([w], {type: "audio/wav"}));
      music_tracks.push(m_game2_src);
    }
  });

  var done3 = false;
  m_game3.init(m_game3_d);

  setInterval(function () {
    if (done3) {
      return;
    }

    done3 = m_game3.generate() >= 1;

    if (done3) {
      // Put the generated song in an Audio element.
      var w = m_game3.createWave();
      m_game3_src = URL.createObjectURL(new Blob([w], {type: "audio/wav"}));
      music_tracks.push(m_game3_src);
    }
  });

  var done_death = false
  m_death.init(m_death_d);

  setInterval(function () {
    if (done_death) {
      return;
    }

    done_death = m_death.generate() >= 1;

    if (done_death) {
      var w = m_death.createWave();
      m_death_src = URL.createObjectURL(new Blob([w], {type: "audio/wav"}));
    }
  });

  var done_menu = false
  m_menu.init(m_menu_d);

  setInterval(function () {
    if (done_menu) {
      return;
    }

    done_menu = m_menu.generate() >= 1;

    if (done_menu) {
      var w = m_menu.createWave();
      m_menu_src = URL.createObjectURL(new Blob([w], {type: "audio/wav"}));
      music_tracks.push(m_menu_src);
      
      audio.src = m_menu_src;
      audio.loop = true;
      audio.play();
    }
  });

  var done_boss = false
  m_boss.init(m_boss_d);

  setInterval(function () {
    if (done_boss) {
      return;
    }

    done_boss = m_boss.generate() >= 1;

    if (done_boss) {
      var w = m_boss.createWave();
      m_boss_src = URL.createObjectURL(new Blob([w], {type: "audio/wav"}));
      music_tracks.push(m_boss_src);
    }
  });

  var done_pu1 = false
  s_pu1.init(pu1);

  setInterval(function () {
    if (done_pu1) {
      return;
    }

    done_pu1 = s_pu1.generate() >= 1;

    if (done_pu1) {
      var w = s_pu1.createWave();
      pu1_src = URL.createObjectURL(new Blob([w], {type: "audio/wav"}));

      sound2 = document.createElement("audio");
    }
  });

  var done_pu2 = false
  s_pu2.init(pu2);

  setInterval(function () {
    if (done_pu2) {
      return;
    }

    done_pu2 = s_pu2.generate() >= 1;

    if (done_pu2) {
      var w = s_pu2.createWave();
      pu2_src = URL.createObjectURL(new Blob([w], {type: "audio/wav"}));
    }
  });

  var done_pu3 = false
  s_pu3.init(pu3);

  setInterval(function () {
    if (done_pu3) {
      return;
    }

    done_pu3 = s_pu3.generate() >= 1;

    if (done_pu3) {
      var w = s_pu3.createWave();
      pu3_src = URL.createObjectURL(new Blob([w], {type: "audio/wav"}));
    }
  });

  var done_lp1 = false
  s_lp1.init(lp1);

  setInterval(function () {
    if (done_lp1) {
      return;
    }

    done_lp1 = s_lp1.generate() >= 1;

    if (done_lp1) {
      var w = s_lp1.createWave();
      lp1_src = URL.createObjectURL(new Blob([w], {type: "audio/wav"}));

      sound1 = document.createElement("audio");
    }
  });

  var done_lp2 = false
  s_lp2.init(lp2);

  setInterval(function () {
    if (done_lp2) {
      return;
    }

    done_lp2 = s_lp2.generate() >= 1;

    if (done_lp2) {
      var w = s_lp2.createWave();
      lp2_src = URL.createObjectURL(new Blob([w], {type: "audio/wav"}));
    }
  });

  var done_lp3 = false
  s_lp3.init(lp3);

  setInterval(function () {
    if (done_lp3) {
      return;
    }

    done_lp3 = s_lp3.generate() >= 1;

    if (done_lp3) {
      var w = s_lp3.createWave();
      lp3_src = URL.createObjectURL(new Blob([w], {type: "audio/wav"}));
    }
  });

  var done_lz1 = false
  s_lz1.init(lz1);

  setInterval(function () {
    if (done_lz1) {
      return;
    }

    done_lz1 = s_lz1.generate() >= 1;

    if (done_lz1) {
      var w = s_lz1.createWave();
      lz1_src = URL.createObjectURL(new Blob([w], {type: "audio/wav"}));
    }

    sound3 = document.createElement("audio");
  });

  var done_dr1 = false
  s_dr1.init(dr1);

  setInterval(function () {
    if (done_dr1) {
      return;
    }

    done_dr1 = s_dr1.generate() >= 1;

    if (done_dr1) {
      var w = s_dr1.createWave();
      dr1_src = URL.createObjectURL(new Blob([w], {type: "audio/wav"}));
    }
  });

  var done_dr2 = false
  s_dr2.init(dr2);

  setInterval(function () {
    if (done_dr2) {
      return;
    }

    done_dr2 = s_dr2.generate() >= 1;

    if (done_dr2) {
      var w = s_dr2.createWave();
      dr2_src = URL.createObjectURL(new Blob([w], {type: "audio/wav"}));
      audio = document.createElement("audio");

      audio.onended = function() {
        if (audio.src == dr2_src) {
          audio.src = m_death_src;
          audio.loop = false;
          audio.currentTime = 0;
          audio.playbackRate = 1.0;
          audio.play();
        }
      }
    }
  });

  var done_b1 = false
  s_b1.init(b1);

  setInterval(function () {
    if (done_b1) {
      return;
    }

    done_b1 = s_b1.generate() >= 1;

    if (done_b1) {
      var w = s_b1.createWave();
      b1_src = URL.createObjectURL(new Blob([w], {type: "audio/wav"}));
    }
  });

var level = 1;
var countdownStart = 15;
var levelEndScore = 100;
var level_win_amount = 14;
var score = 0;
var total_score = 0;
var timer = countdownStart;
var second_counter = 0;
var game_started = false;
var level_score_calculating = false;
var mid_boss_time = false;
var final_boss_time = false;
var player_speed = 3;
var letter_spawn_time = 1.0;
var current_letter_spawn_time = 0.0;
var letter_fall_speed = 1;
var powerup_fall_speed = 1;
let powerups = [];
let magnet = {effect:'magnet', color: 'green'};
let thrust = {effect:'thrust', color: 'orange'};
powerups.push(magnet);
powerups.push(thrust);
let enemies = [];
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
  thrustingMult: 1.0,
  isThrusting: false,
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

    
      for(var i = 0; i < letterz.length; i++) {
        let lett = letterz[i];

        // letter collision
        if(rectCollide(this, lett)) {
          if (lett.type == 'letter') {
            score += parseInt(lett.content);
            timer += parseInt(lett.content);

            if (score >= levelEndScore) {
                level += 1;
                audio.pause();

                if (level >= level_win_amount) {
                    win();
                    draw_win();
                } else {
                  draw(context, 'Next Level!', 9, '#FFFFFF', 125, 200);

                  loop.stop();
                  level_up_audio.play();
                  letter_fall_speed += 0.5;
                }
            } else {
              var temp = Math.floor((Math.random()*3));

              if (temp == 0) {
                playSound(sound1, lp1_src);
              }
              if (temp == 1) {
                playSound(sound1, lp2_src);
              }
              if (temp == 2) {
                playSound(sound1, lp3_src);
              }
            }
            scorez.content = 'Score: ' + score;

            if(primes.includes(score)) {
                this.isPrimed = true;
                playSound(sound2, dr1_src);
                this.isThrusting = false;
                reverseBadShit();
                doBadShit();
            } else {
                this.isPrimed = false;
                reverseBadShit();
            }

            if(dubz.includes(score)) {
              // generate a random powerup
              createPowerUp(powerups[Math.floor((Math.random()*powerups.length))]);
            }
          }

          if (lett.type == 'powerup') {
            var temp = Math.floor((Math.random()*3));

              if (temp == 0) {
                playSound(sound1, lp1_src);
              }
              if (temp == 1) {
                playSound(sound1, lp2_src);
              }
              if (temp == 2) {
                playSound(sound1, lp3_src);
              }

              if (temp == 0) {
                playSound(sound2, pu1_src);
              }
              if (temp == 1) {
                playSound(sound2, pu2_src);
              }
              if (temp == 2) {
                playSound(sound2, pu3_src);
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
                lett.x -= 1;
              }
              if(lett.x < this.x) {
                lett.x += 1;
              }
              if(lett.y > this.y) {
                lett.y -= 1;
              }
              if(lett.y < this.y) {
                lett.y += 1;
              }
           }
        }
      }
    
      // Final boss time!
      for(var i = 0; i < enemies.length; i++) {
        let e = enemies[i];

        if((e.type == '1' || e.type == '2' || e.type == '3' || e.type == '4' || e.type == 'enemy_shot') && rectCollide(this, e)) {
          score -= e.scoreDamage;
          if (score < 0) {
            score = 0;
          }
          scorez.content = 'Score: ' + score;
          e.ttl = 0;

          var temp = Math.floor((Math.random()*3));

          if (temp == 0) {
            playSound(sound1, lp1_src);
          }
          if (temp == 1) {
            playSound(sound1, lp2_src);
          }
          if (temp == 2) {
            playSound(sound1, lp3_src);
          }

          if(primes.includes(score)) {
              this.isPrimed = true;
              playSound(sound2, dr1_src);
              this.isThrusting = false;
              reverseBadShit();
              doBadShit();
          } else {
              this.isPrimed = false;
              reverseBadShit();
          }

          if(dubz.includes(score)) {
            // generate a random powerup
            createPowerUp(powerups[Math.floor((Math.random()*powerups.length))]);
          }
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

    let letterz = [];
    let primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];
    let dubz = [11,22,33,44,55,66,77,88,99];

function createLetter() {
  let letter = Sprite({
    type: 'letter',
    content: Math.floor((Math.random()*8)+1).toString(),
    speed: letter_fall_speed,
    x: Math.floor(Math.random()*canvas.width),        // starting x,y position of the sprite
    y: 0,
    anchor: {x: 0.5, y: 0.5},
    color: '#eeeeee',  // fill color of the sprite rectangle
    width: 20,     // width and height of the sprite rectangle
    height: 20,        // move the sprite 2px to the right every frame
    update() {
      this.y += 1*this.speed;

      if (this.y > canvas.height) {
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
    content: powerupContent(p.effect),
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

function powerupContent(effect) {
  if (effect == 'magnet') {
    return 'U';
  }
  if (effect == 'thrust') {
    return 'I'
  }
}

function awardPowerup(effect) {
  if (effect == 'magnet') {
    player.magnetRange += 8;
  }
  if (effect == 'thrust') {
    player.thrustingMult += 0.2;
  }
}

function createEnemy(type, speed, scoreDamage) {
  let enemy = Sprite({
    type: type,
    content: generateEnemyContent(type),
    speed: speed,
    scoreDamage: scoreDamage,
    shotTimer: 60,
    currentShotTime: 0,
    isMoving: false,
    x: Math.floor(Math.random()*canvas.width),        // starting x,y position of the sprite
    y: Math.floor(Math.random()*canvas.height),
    anchor: {x: 0.5, y: 0.5},
    color: 'yellow',  // fill color of the sprite rectangle
    width: 20,     // width and height of the sprite rectangle
    height: 20,        // move the sprite 2px to the right every frame
    update() {
      var moveX = Math.floor(Math.random()*2);
      var moveY = Math.floor(Math.random()*2);

      if (type == '2' || type == '4') {
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

function generateEnemyContent(type) {
  if (type == '1') {
    return '2';
  }
  if (type == '2') {
    return '3';
  }
  if (type == '3') {
    return '5';
  }
  if (type == '4') {
    return '7';
  }
}

function createMidBoss() {
  let midBoss = Sprite({
    type: 'mid_boss',
    shotTimer: 120,
    currentShotTime: 0,
    content: 'PR1M3',
    speed: 1,
    isMoving: false,
    x: Math.floor(Math.random()*canvas.width),        // starting x,y position of the sprite
    y: Math.floor(Math.random()*canvas.height),
    anchor: {x: 0.5, y: 0.5},
    color: 'yellow',  // fill color of the sprite rectangle
    width: 100,     // width and height of the sprite rectangle
    height: 20,        // move the sprite 2px to the right every frame
    update() {
      this.currentShotTime += 1;
      if(this.currentShotTime > this.shotTimer) {
        playSound(sound3, lz1_src);
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

  enemies.push(midBoss);
}

function createFinalBoss() {
  let finalBoss = Sprite({
    type: 'final_boss',
    shotTimer: 60,
    currentShotTime: 0,
    content: '8055',
    speed: 1.5,
    isMoving: false,
    x: Math.floor(Math.random()*canvas.width),        // starting x,y position of the sprite
    y: Math.floor(Math.random()*canvas.height),
    anchor: {x: 0.5, y: 0.5},
    color: 'red',  // fill color of the sprite rectangle
    width: 80,     // width and height of the sprite rectangle
    height: 20,        // move the sprite 2px to the right every frame
    update() {
      this.currentShotTime += 1;
      if(this.currentShotTime > this.shotTimer) {
        playSound(sound3, lz1_src);
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

  enemies.push(finalBoss);
}

function createEnemyShot(x, y) {
  playSound(sound3, lz1_src);

  let enemyShot = Sprite({
    type: 'enemy_shot',
    moveX: Math.floor(Math.random()*2),
    moveY: Math.floor(Math.random()*2),
    ttl: 180,
    content: 'O',
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

let timerz = Sprite({
    content: 'Time Left: ' + timer,
    x: 5,        // starting x,y position of the sprite
    y: 55,
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

let totalscorez = Sprite({
    content: 'Total: ' + total_score,
    x: 5,        // starting x,y position of the sprite
    y: 80,
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

let loop = GameLoop({  // create the main game loop
  update: function() { // update the game state
    if (player.isAlive()) {
      if (!level_score_calculating) {
        second_counter += 1/60;
        current_letter_spawn_time += 1/60;

        if (second_counter > 1) {
          timer -= 1;
          if (level > 1 && primes.includes(timer)) {
            createEnemy((Math.floor(Math.random()*3)+1).toString(), Math.floor(Math.random()*1)+1, Math.floor(Math.random()*1)+1);

            while(enemies.length > 10) {
              enemies.splice(1, 1);
            }
          };
          second_counter = 0;
        }

        if (current_letter_spawn_time > letter_spawn_time) {
          createLetter();
          current_letter_spawn_time = 0.0;
        }

        player.update();

        // wrap the sprites position when it reaches
        // the edge of the screen
        if (player.x > canvas.width) {
          player.x = canvas.width;
        }
        if (player.x < 0) {
          player.x = 0;
        }
        if (final_boss_time) {
          if (player.y < 0) {
            player.y = 0;
          }
        } else {
          if (player.y < 0) {
            player.y = 0;
          }
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
      } else {
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

          if (score < 1 && timer < 1) {
            // start new level, clear field
            enemies = enemies.filter(enemy => { !enemy.isAlive(); });
            letterz = letterz.filter(letter => { !letter.isAlive(); });

            level_score_calculating = false;
            score = 0;
            timer = countdownStart;

            if (level == 4) {
              audio.playbackRate = 1.0;
              switchTrack(m_game3_src);
            } else if (level == 7) {
              audio.playbackRate = 1.0;
              switchTrack(m_game2_src);
              createMidBoss();
            } else {
              audio.playbackRate += 0.1;
              audio.currentTime = 0.0;
              audio.play();
            }

            if (level == 13) {
              goToFinalBoss();
            }

            levelz.content = "Level: " + level;
          }
      }

        ui.map(ui_sprite => {
          ui_sprite.update();
        });
    } else {
        if (game_started && (gamepadPressed('south') || keyPressed(['r', 'enter', 'space']))) {
            restart();
        }

        if (!game_started  && (gamepadPressed('south') || keyPressed(['r', 'enter', 'space']))) {
            new_game();
        }
    }

    if(gamepadPressed('select') || keyPressed(['m'])) {
        audio.muted = !audio.muted;
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
    if (game_started) {
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

        if (!player.isAlive()) {
            if (player.win) {
                draw_win();
            } else {
                draw(context, "GAME OVER", 12, 'red', 125, 200);
            }
        }
    } else {
        draw_title();
    }
  }
});

onKey(['p'], function(e) {
  if (loop.isStopped) {
    loop.start();
  } else {
    loop.stop();
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
  if (!player.isThrusting && !player.isPrimed) {
    player.isThrusting = true;
    player.speed = player_speed * player.thrustingMult;
  }
});

onKey('leftshift', function(e) {
  if (player.isThrusting) {
    player.isThrusting = false;
    player.speed = player_speed;
  }
}, {handler: 'keyup'});

onGamepad('west', function(e) {
  if (!player.isThrusting && !player.isPrimed) {
    player.isThrusting = true;
    player.speed = player_speed * player.thrustingMult;
  }
});

onGamepad('west', function(e) {
  if (player.isThrusting) {
    player.isThrusting = false;
    player.speed = player_speed;
  }
}, {handler: 'gamepadup'});

function goToFinalBoss() {
  final_boss_time = true;
 
  levelz.ttl = 0;
  scorez.ttl = 0;
  timerz.ttl = 0;
  totalscorez.ttl = 0;

  enemies = enemies.filter(enemy => { !enemy.isAlive(); });
  letterz = letterz.filter(letter => !letter.isAlive());
  ui = ui.filter(ui_sprite => { !ui_sprite.isAlive(); });

  audio.pause();
  audio.currentTime = 0;
  audio.playbackRate = 1.0;
  audio.src = m_boss_src;
  audio.loop = true;
  audio.play();

  createFinalBoss();
}

var done_level_up = false
s_lu1.init(lu1);

setInterval(function () {
  if (done_level_up) {
    return;
  }

  done_level_up = s_lu1.generate() >= 1;

  if (done_level_up) {
    var w = s_lu1.createWave();
    lu1_src = URL.createObjectURL(new Blob([w], {type: "audio/wav"}));
    level_up_audio = document.createElement("audio");
    level_up_audio.src = lu1_src;
    level_up_audio.loop = false;

    level_up_audio.onended = function() {
      level_score_calculating = true;
      loop.start();
    }
  }
});

draw_title();
title();
loop.start();    // start the game

function die() {
    player.ttl = 0;
    player.win = false;
    player.playAnimation('die');
    letterz.filter(letter => { letter.ttl = 0; });
    audio.pause();
    audio.currentTime = 0;
    audio.playbackRate = 1.0;
    audio.src = dr2_src;
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
    /*audio.playbackRate = 1.0;
    audio.src = death_wave_src;
    audio.loop = false;
    audio.play();*/
}

function draw_win() {
    draw(context, "YOU WIN!", 12, 'red', 150, 200);
}

function new_game() {
    final_boss_time = false;
    mid_boss_time = false;
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

    ui.push(levelz);
    ui.push(scorez);
    ui.push(timerz);

    enemies = enemies.filter(e => !e.isAlive());

    player.x = canvas.width/2;
    player.y = canvas.height/2;
    player.ttl = Infinity;
    player.win = false;
    game_started = true;
    audio.position = 0.0;
    audio.playbackRate = 1.0;
    audio.src = m_game1_src;
    audio.loop = true;
    audio.play();
};

function restart() {
    
    if (final_boss_time) {
      player.x = canvas.width/2;
      player.y = canvas.height/2;
      player.ttl = Infinity;
      player.win = false;
      audio.position = 0.0;
      audio.playbackRate = 1.0;
      audio.src = m_boss_src;
      audio.loop = true;
      audio.play();
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

      ui.push(levelz);
      ui.push(scorez);
      ui.push(timerz);

      enemies = enemies.filter(e => !e.isAlive());

      player.x = canvas.width/2;
      player.y = canvas.height/2;
      player.ttl = Infinity;
      player.win = false;
      audio.playbackRate = 1.0;
      audio.src = m_game1_src;
      audio.loop = loop;
      audio.play();
    }
    
};

function title() {
    
}

function draw_title() {
    draw(context, "PRIMONUMEROPHOBIA", 9, 'red', 33, 200);
}

};