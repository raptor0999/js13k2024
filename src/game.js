import { init, Sprite, SpriteSheet, GameLoop, initKeys, keyPressed, initGamepad, gamepadPressed, gamepadAxis } from 'kontra'
let { canvas, context } = init();

  // Initialize music generation (player).
  var playerz_game = new CPlayer();
  playerz_game.init(song);
  var playerz_menu = new CPlayer();
  playerz_menu.init(menu_song);
  var playerz_death = new CPlayer();
  playerz_death.init(death_song);
  var playerz_collect = new CPlayer();
  playerz_collect.init(collect_song);
  var playerz_level = new CPlayer();
  playerz_level.init(level_song);
  var menu_wave;
  var death_wave;
  var collect_wave;
  var level_wave;
  var song1_wave_src;
  var death_wave_src;
  var menu_wave_src;
  var collect_wave_src;
  var level_wave_src;

  // Generate music...
  var done = false;
  var audio;
  var pickup_audio;
  var level_audio;
  setInterval(function () {
    if (done) {
      return;
    }

    done = playerz_game.generate() >= 1;

    if (done) {
      var t1 = new Date();
      //s.textContent = s.textContent + "done (" + (t1 - t0) + "ms)";

      // Put the generated song in an Audio element.
      var wave = playerz_game.createWave();
      song1_wave_src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
      
    }
  });

  var done_death = false
  playerz_death.init(death_song);

  setInterval(function () {
    if (done_death) {
      return;
    }

    done_death = playerz_death.generate() >= 1;

    if (done_death) {
      death_wave = playerz_death.createWave();
      death_wave_src = URL.createObjectURL(new Blob([death_wave], {type: "audio/wav"}));
    }
  });

  var done_menu = false
  playerz_menu.init(menu_song);

  setInterval(function () {
    if (done_menu) {
      return;
    }

    done_menu = playerz_menu.generate() >= 1;

    if (done_menu) {
      menu_wave = playerz_menu.createWave();
      menu_wave_src = URL.createObjectURL(new Blob([menu_wave], {type: "audio/wav"}));
      audio = document.createElement("audio");
      audio.src = menu_wave_src;
      audio.loop = true;
      audio.play();
    }
  });

  var done_collect = false
  playerz_collect.init(collect_song);

  setInterval(function () {
    if (done_collect) {
      return;
    }

    done_collect = playerz_collect.generate() >= 1;

    if (done_collect) {
      collect_wave = playerz_collect.createWave();
      collect_wave_src = URL.createObjectURL(new Blob([collect_wave], {type: "audio/wav"}));
      pickup_audio = document.createElement("audio");
      pickup_audio.src = collect_wave_src;
      pickup_audio.loop = false;
    }
  });

  var done_level = false
  playerz_level.init(level_song);

  setInterval(function () {
    if (done_level) {
      return;
    }

    done_level = playerz_level.generate() >= 1;

    if (done_level) {
      level_wave = playerz_level.createWave();
      level_wave_src = URL.createObjectURL(new Blob([level_wave], {type: "audio/wav"}));
      level_audio = document.createElement("audio");
      level_audio.src = level_wave_src;
      level_audio.loop = false;
    }
  });

var canvasX = 720;
var canvasY = 480;
var level = 1;
var countdownStart = 15;
var levelEndScore = 100;
var level_win_amount = 14;
var score = 0;
var timer = countdownStart;
var game_started = false;
var player_speed = 3;
var letter_fall_speed = 1;

initKeys();
initGamepad();

let image = new Image();
image.src = 'player_sheet.png'
image.onload = function() {
    let spriteSheet = SpriteSheet({
        image: image,
        frameWidth: 8,
        frameHeight: 8,
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
  scaleX: 4.0,
  scaleY: 4.0,
  badShit: 0,
  win: false,
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
      var playerMidX = this.x;
      var playerMidY = this.y;
      let lett = letterz[i];

      if(playerMidX >= lett.x && playerMidX <= lett.x + lett.width && playerMidY >= lett.y && playerMidY <= lett.y + lett.height) {
        pickup_audio.play();
        score += parseInt(lett.content);
        timer += parseInt(lett.content);

        if (score >= levelEndScore) {
            score = 0;
            level += 1;
            levelz.content = 'Level: ' + level;
            level_audio.play();
            letter_fall_speed += 0.5;

            if (level >= level_win_amount) {
                win();
                draw_win();
            }
        }
        scorez.content = 'Score: ' + score;

        if(primes.includes(score)) {
            this.isPrimed = true;
            reverseBadShit();
            doBadShit();
        } else {
            this.isPrimed = false;
            reverseBadShit();
        }

        lett.ttl = 0;
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

    function doBadShit() {
        letterz = letterz.filter(letter => !letter.isAlive());
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

function createLetter() {
  let letter = Sprite({
    content: Math.floor((Math.random()*8)+1).toString(),
    speed: letter_fall_speed,
    x: Math.floor(Math.random()*canvasX),        // starting x,y position of the sprite
    y: 0,
    color: '#eeeeee',  // fill color of the sprite rectangle
    width: 20,     // width and height of the sprite rectangle
    height: 20,        // move the sprite 2px to the right every frame
    update() {
      this.y += 1*this.speed;
    },
    render() {
      draw(context, this.content, 4, this.color);
    }
  });

  var insert = true;

  for (var i = 0; i < letterz.length; i++) {
    if(letter.x > letterz[i].x && letter.x < letterz[i].x + letterz[i].width + 10) {
        insert = false;
    }
  }

  if (insert) {
    letterz.push(letter);
  }
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

setInterval(countDown, 1000);

function countDown() {
    timer -= 1;
}

let loop = GameLoop({  // create the main game loop
  update: function() { // update the game state
    if (player.isAlive()) {
        levelz.update();
        scorez.update();
        timerz.update();
        player.update();

        // wrap the sprites position when it reaches
        // the edge of the screen
        if (player.x > canvas.width) {
          player.x = 0;
        }
        if (player.x < 0) {
          player.x = canvas.width;
        }

        letterz.map(letter => {
          letter.update();

          if (letter.y + letter.height > canvasY) {
            letter.ttl = 0;
          }
        });

        letterz = letterz.filter(letter => letter.isAlive());
        if (letterz.length < 1) {
          for(var i = 0; i < 6; i++) {
            createLetter();
          }
        }

        if (timer < 1) {
            die();
        }

        scorez.update();
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
  },
  render: function() { // render the game state
    if (game_started) {
        player.render();

        letterz.map(letter => {
          letter.render();
        });

        levelz.render();
        scorez.render();
        timerz.render();

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

draw_title();
title();
loop.start();    // start the game

function die() {
    player.ttl = 0;
    player.win = false;
    player.playAnimation('die');
    letterz.filter(letter => { letter.ttl = 0; })
    audio.pause();
    audio.currentTime = 0;
    audio.playbackRate = 1.0;
    audio.src = death_wave_src;
    audio.loop = false;
    audio.play();
};

function win() {
    player.ttl = 0;
    player.win = true;
    player.playAnimation('idle');
    letterz.filter(letter => { letter.ttl = 0; })
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
    level = 1;
    levelz.content = 'Level: ' + level;
    score = 0;
    scorez.content = 'Score: ' + score;
    timer = countdownStart;
    timerz.content = 'Time Left: ' + timer;

    for(var i = 0; i < 7; i++) {
        createLetter();
    }
    player.x = canvasX/2;
    player.y = canvasY/2;
    player.ttl = Infinity;
    player.win = false;
    game_started = true;
    audio.playbackRate = 1.0;
    audio.src = song1_wave_src;
    audio.loop = true;
    audio.play();
};

function restart() {
    level = 1;
    levelz.content = 'Level: ' + level;
    score = 0;
    scorez.content = 'Score: ' + score;
    timer = countdownStart;
    timerz.content = 'Time Left: ' + timer;

    for(var i = 0; i < 6; i++) {
        createLetter();
    }
    player.x = canvasX/2;
    player.y = canvasY/2;
    player.ttl = Infinity;
    player.win = false;
    audio.playbackRate = 1.0;
    audio.src = song1_wave_src;
    audio.loop = loop;
    audio.play();
};

function title() {
    
}

function draw_title() {
    draw(context, "PRIMONUMEROPHOBIA", 9, 'red', 33, 200);
}

};