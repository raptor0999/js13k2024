import{init,Sprite,SpriteSheet,GameLoop,initKeys,keyMap,onKey,keyPressed,initGamepad,onGamepad,gamepadPressed,gamepadAxis}from"kontra";let{canvas:canvas,context:context}=init();var m_menu_src,m_game1_src,m_game2_src,m_game3_src,m_boss_src,m_death_src,pu1_src,pu2_src,pu3_src,lp1_src,lp2_src,lp3_src,lz1_src,dr1_src,dr2_src,dr3_src,b1_src,lu1_src,audio,sound1,sound2,sound3,level_up_audio,m_game1=new CPlayer,m_game2=new CPlayer,m_game3=new CPlayer,m_menu=new CPlayer,m_boss=new CPlayer,m_death=new CPlayer,s_pu1=new CPlayer,s_pu2=new CPlayer,s_pu3=new CPlayer,s_lp1=new CPlayer,s_lp2=new CPlayer,s_lp3=new CPlayer,s_lz1=new CPlayer,s_dr1=new CPlayer,s_dr2=new CPlayer,s_dr3=new CPlayer,s_b1=new CPlayer,s_lu1=new CPlayer;let music_tracks=[];var current_music_track=0,done=!1;m_game1.init(m_game1_d),setInterval((function(){if(!done&&(done=m_game1.generate()>=1)){var e=m_game1.createWave();m_game1_src=URL.createObjectURL(new Blob([e],{type:"audio/wav"})),music_tracks.push(m_game1_src)}}));var done2=!1;m_game2.init(m_game2_d),setInterval((function(){if(!done2&&(done2=m_game2.generate()>=1)){var e=m_game2.createWave();m_game2_src=URL.createObjectURL(new Blob([e],{type:"audio/wav"})),music_tracks.push(m_game2_src)}}));var done3=!1;m_game3.init(m_game3_d),setInterval((function(){if(!done3&&(done3=m_game3.generate()>=1)){var e=m_game3.createWave();m_game3_src=URL.createObjectURL(new Blob([e],{type:"audio/wav"})),music_tracks.push(m_game3_src)}}));var done_death=!1;m_death.init(m_death_d),setInterval((function(){if(!done_death&&(done_death=m_death.generate()>=1)){var e=m_death.createWave();m_death_src=URL.createObjectURL(new Blob([e],{type:"audio/wav"}))}}));var done_menu=!1;m_menu.init(m_menu_d),setInterval((function(){if(!done_menu&&(done_menu=m_menu.generate()>=1)){var e=m_menu.createWave();m_menu_src=URL.createObjectURL(new Blob([e],{type:"audio/wav"})),music_tracks.push(m_menu_src),audio.src=m_menu_src,audio.loop=!0,audio.play()}}));var done_boss=!1;m_boss.init(m_boss_d),setInterval((function(){if(!done_boss&&(done_boss=m_boss.generate()>=1)){var e=m_boss.createWave();m_boss_src=URL.createObjectURL(new Blob([e],{type:"audio/wav"})),music_tracks.push(m_boss_src)}}));var done_pu1=!1;s_pu1.init(pu1),setInterval((function(){if(!done_pu1&&(done_pu1=s_pu1.generate()>=1)){var e=s_pu1.createWave();pu1_src=URL.createObjectURL(new Blob([e],{type:"audio/wav"})),sound2=document.createElement("audio")}}));var done_pu2=!1;s_pu2.init(pu2),setInterval((function(){if(!done_pu2&&(done_pu2=s_pu2.generate()>=1)){var e=s_pu2.createWave();pu2_src=URL.createObjectURL(new Blob([e],{type:"audio/wav"}))}}));var done_pu3=!1;s_pu3.init(pu3),setInterval((function(){if(!done_pu3&&(done_pu3=s_pu3.generate()>=1)){var e=s_pu3.createWave();pu3_src=URL.createObjectURL(new Blob([e],{type:"audio/wav"}))}}));var done_lp1=!1;s_lp1.init(lp1),setInterval((function(){if(!done_lp1&&(done_lp1=s_lp1.generate()>=1)){var e=s_lp1.createWave();lp1_src=URL.createObjectURL(new Blob([e],{type:"audio/wav"})),sound1=document.createElement("audio")}}));var done_lp2=!1;s_lp2.init(lp2),setInterval((function(){if(!done_lp2&&(done_lp2=s_lp2.generate()>=1)){var e=s_lp2.createWave();lp2_src=URL.createObjectURL(new Blob([e],{type:"audio/wav"}))}}));var done_lp3=!1;s_lp3.init(lp3),setInterval((function(){if(!done_lp3&&(done_lp3=s_lp3.generate()>=1)){var e=s_lp3.createWave();lp3_src=URL.createObjectURL(new Blob([e],{type:"audio/wav"}))}}));var done_lz1=!1;s_lz1.init(lz1),setInterval((function(){if(!done_lz1){if(done_lz1=s_lz1.generate()>=1){var e=s_lz1.createWave();lz1_src=URL.createObjectURL(new Blob([e],{type:"audio/wav"}))}sound3=document.createElement("audio")}}));var done_dr1=!1;s_dr1.init(dr1),setInterval((function(){if(!done_dr1&&(done_dr1=s_dr1.generate()>=1)){var e=s_dr1.createWave();dr1_src=URL.createObjectURL(new Blob([e],{type:"audio/wav"}))}}));var done_dr2=!1;s_dr2.init(dr2),setInterval((function(){if(!done_dr2&&(done_dr2=s_dr2.generate()>=1)){var e=s_dr2.createWave();dr2_src=URL.createObjectURL(new Blob([e],{type:"audio/wav"})),(audio=document.createElement("audio")).onended=function(){audio.src==dr2_src&&(audio.src=m_death_src,audio.loop=!1,audio.currentTime=0,audio.playbackRate=1,audio.play())}}}));var done_dr3=!1;s_dr3.init(dr3),setInterval((function(){if(!done_dr3&&(done_dr3=s_dr3.generate()>=1)){var e=s_dr3.createWave();dr3_src=URL.createObjectURL(new Blob([e],{type:"audio/wav"}))}}));var done_b1=!1;s_b1.init(b1),setInterval((function(){if(!done_b1&&(done_b1=s_b1.generate()>=1)){var e=s_b1.createWave();b1_src=URL.createObjectURL(new Blob([e],{type:"audio/wav"}))}}));var level=1,countdownStart=15,levelEndScore=100,level_win_amount=14,score=0,total_score=0,timer=countdownStart,second_counter=0,game_started=!1,level_score_calculating=!1,mid_boss_time=!1,final_boss_time=!1,player_speed=3,letter_spawn_time=1,current_letter_spawn_time=0,letter_fall_speed=1,powerup_fall_speed=1;let powerups=[];powerups.push({effect:"magnet_range",content:"U",color:"cyan"}),powerups.push({effect:"magnet_speed_mult",content:"U",color:"green"}),powerups.push({effect:"thrust_time",content:"T",color:"orange"}),powerups.push({effect:"thrust_refresh_time",content:"T",color:"brown"}),powerups.push({effect:"thrust_mult",content:"T",color:"green"}),powerups.push({effect:"player_speed",content:"S",color:"green"});let letterz=[],primes=[],gprimes=[],dubz=[],gdubz=[],enemies=[],bombs=[],ui=[];initKeys(),initGamepad();let image=new Image;image.src="player_sheet.png",image.onload=function(){let e=SpriteSheet({image:image,frameWidth:32,frameHeight:32,animations:{idle:{frames:[0,1,2,3],frameRate:5,loop:!0},walk:{frames:[4,5,6,7],frameRate:5,loop:!0},die:{frames:10,frameRate:5,loop:!1}}}),t=Sprite({speed:player_speed,isMoving:!1,isPrimed:!1,scaleX:1,scaleY:1,badShit:0,win:!1,magnetRange:32,magnetSpeedMult:1,thrustMult:1,thrustRefreshTime:.5,currentThrustRefreshTime:0,thrustTime:.3,currentThurstTime:0,isThrusting:!1,isThrustRefreshing:!1,bombTime:5,currentBombTime:0,x:360,y:240,anchor:{x:.5,y:.5},animations:e.animations,ttl:0,update(){let e=gamepadAxis("leftstickx",0),t=gamepadAxis("leftsticky",0);this.isMoving=!1,this.currentBombTime>0&&(this.currentBombTime-=1/60),e<-.4||keyPressed(["arrowleft","a"])?(this.x-=1*this.speed,this.isMoving=!0):(e>.4||keyPressed(["arrowright","d"]))&&(this.x+=1*this.speed,this.isMoving=!0),t<-.4||keyPressed(["arrowup","w"])?(this.y-=1*this.speed,this.isMoving=!0):(t>.4||keyPressed(["arrowdown","s"]))&&(this.y+=1*this.speed,this.isMoving=!0),this.isThrusting&&(this.currentThurstTime>this.thrustTime?(this.isThrusting=!1,this.isThrustRefreshing=!0,this.speed=player_speed,this.currentThurstTime=0):this.currentThurstTime+=1/60),this.isThrustRefreshing&&(this.currentThrustRefreshTime>this.thrustRefreshTime?(this.isThrustRefreshing=!1,this.currentThrustRefreshTime=0):this.currentThrustRefreshTime+=1/60);for(var r=0;r<letterz.length;r++){let e=letterz[r];if(s(this,e)){if("letter"==e.type){if(score+=parseInt(e.content),timer+=parseInt(e.content),score>=levelEndScore)level+=1,p.content="Level: "+level,audio.pause(),level>=level_win_amount?(S(),k()):(draw(context,"Next Level!",9,"#FFFFFF",125,200),M.stop(),level_up_audio.play(),letter_fall_speed+=.25);else 0==(c=Math.floor(3*Math.random()))&&i(sound1,lp1_src),1==c&&i(sound1,lp2_src),2==c&&i(sound1,lp3_src);_.content="Score: "+score,primes.includes(score)?(o(),this.isPrimed=!0,this.isThrusting=!1,a()):(o(),this.isPrimed=!1),dubz.includes(score)&&(h(powerups[Math.floor(Math.random()*powerups.length)]),dubz=dubz.filter((e=>e!=score))),w()}if("powerup"==e.type)0==(c=Math.floor(3*Math.random()))&&i(sound1,lp1_src),1==c&&i(sound1,lp2_src),2==c&&i(sound1,lp3_src),0==c&&i(sound2,pu1_src),1==c&&i(sound2,pu2_src),2==c&&i(sound2,pu3_src),P(e.effect);e.ttl=0}e.x>=this.x-this.magnetRange&&e.x<=this.x+this.magnetRange&&e.y>=this.y-this.magnetRange&&e.y<=this.y+this.magnetRange&&(e.x>this.x&&(e.x-=1*this.magnetSpeedMult),e.x<this.x&&(e.x+=1*this.magnetSpeedMult),e.y>this.y&&(e.y-=1*this.magnetSpeedMult),e.y<this.y&&(e.y+=1*this.magnetSpeedMult))}for(r=0;r<enemies.length;r++){let e=enemies[r];for(var n=0;n<bombs.length;n++){let t=bombs[n];s(e,t)&&(console.log("bombed"),"p_bomb"!=t.type||"1"!=e.type&&"2"!=e.type&&"3"!=e.type&&"4"!=e.type||(i(sound2,b1_src),e.ttl=0,t.ttl=0))}var c;if(("1"==e.type||"2"==e.type||"3"==e.type||"4"==e.type||"enemy_shot"==e.type)&&s(this,e))(score-=e.scoreDamage)<0&&(score=0),_.content="Score: "+score,e.ttl=0,0==(c=Math.floor(3*Math.random()))&&i(sound1,lp1_src),1==c&&i(sound1,lp2_src),2==c&&i(sound1,lp3_src),primes.includes(score)?(o(),this.isPrimed=!0,this.isThrusting=!1,a()):(o(),this.isPrimed=!1),dubz.includes(score)&&(h(powerups[Math.floor(Math.random()*powerups.length)]),dubz=dubz.filter((e=>e!=score))),w();"mid_boss_shot"==e.type&&s(this,e)&&R(),"final_boss_shot"==e.type&&s(this,e)&&R()}this.isMoving?"walk"!=this.currentAnimation.name&&this.playAnimation("walk"):"idle"!=this.currentAnimation.name&&this.playAnimation("idle"),this.advance()}});function s(e,t){return e.x>=t.x-t.width/2&&e.x<=t.x+t.width/2&&e.y>=t.y-t.height/2&&e.y<=t.y+t.height/2}function i(e,t){e.src=t,e.play()}function r(e){audio.pause(),audio.currentTime=0,audio.src=e,audio.play()}function a(){i(sound2,dr1_src),t.badShit=Math.floor(3*Math.random()+1),1==t.badShit&&(t.speed=-t.speed),2==t.badShit&&(t.speed=.5),3==t.badShit&&(t.speed=10)}function o(){t.isPrimed&&i(sound2,dr3_src),1==t.badShit&&(t.speed=-t.speed),2==t.badShit&&(t.speed=player_speed),3==t.badShit&&(t.speed=player_speed),t.badShit=0}function n(e=0,t=1,s=Math.floor(Math.random()*canvas.width),i=0){let r=Sprite({type:"letter",dirX:e,dirY:t,content:Math.floor(9*Math.random()+1).toString(),speed:letter_fall_speed,x:s,y:i,anchor:{x:.5,y:.5},color:"#eeeeee",width:20,height:20,update(){this.x+=e*this.speed,this.y+=t*this.speed,(this.y<0||this.y>canvas.height||this.x<0||this.x>canvas.width)&&(this.ttl=0)},render(){draw(context,this.content,4,this.color)}});letterz.push(r)}function h(e){let t=Sprite({type:"powerup",effect:e.effect,content:e.content,speed:powerup_fall_speed,x:Math.floor(Math.random()*canvas.width),y:0,anchor:{x:.5,y:.5},color:e.color,color1:e.color,color2:"white",blinkTimer:0,blinkSpeed:30,width:20,height:20,update(){this.y+=1*this.speed,this.blinkTimer+=1,this.blinkTimer>this.blinkSpeed&&(this.color==this.color1?this.color=this.color2:this.color=this.color1,this.blinkTimer=0)},render(){draw(context,this.content,4,this.color)}});letterz.push(t)}function c(e,s,r){let a=Sprite({type:e,content:d(e),speed:s,scoreDamage:r,shotTimer:60,currentShotTime:0,isMoving:!1,x:Math.floor(Math.random()*canvas.width),y:Math.floor(Math.random()*canvas.height),anchor:{x:.5,y:.5},color:"yellow",width:30,height:30,update(){var s=Math.floor(2*Math.random()),r=Math.floor(2*Math.random());"2"!=e&&"4"!=e||(this.currentShotTime+=1,this.currentShotTime>this.shotTimer&&(!function(e,t){i(sound3,lz1_src);let s=Sprite({type:"enemy_shot",moveX:Math.floor(2*Math.random()),moveY:Math.floor(2*Math.random()),ttl:180,content:"O",speed:3,scoreDamage:1,isMoving:!1,x:e,y:t,anchor:{x:.5,y:.5},color:"pink",width:10,height:10,update(e){0==this.moveX?(this.x-=1*this.speed,this.isMoving=!0):1==this.moveX&&(this.x+=1*this.speed,this.isMoving=!0),0==this.moveY?(this.y-=1*this.speed,this.isMoving=!0):1==this.moveY&&(this.y+=1*this.speed,this.isMoving=!0)},render(){draw(context,this.content,2,this.color)}});enemies.push(s)}(this.x,this.y),this.currentShotTime=0)),0==s?(this.x-=1*this.speed,this.isMoving=!0):1==s&&(this.x+=1*this.speed,this.isMoving=!0),0==r?(this.y-=1*this.speed,this.isMoving=!0):1==r&&(this.y+=1*this.speed,this.isMoving=!0),this.x<t.x&&(this.x+=1*this.speed),this.x>t.x&&(this.x-=1*this.speed),this.y<t.y&&(this.y+=1*this.speed),this.y>t.y&&(this.y-=1*this.speed),this.x<0&&(this.x=0),this.x>canvas.width&&(this.x=canvas.width),this.y<0&&(this.y=0),this.y>canvas.height&&(this.y=canvas.height)},render(){draw(context,this.content,4,this.color)}});enemies.push(a)}function d(e){return"1"==e?"2":"2"==e?"3":"3"==e?"5":"4"==e?"7":void 0}function l(){let e=Sprite({type:"mid_boss",shotTimer:120,currentShotTime:0,content:"PR1M3",speed:1,isMoving:!1,x:Math.floor(Math.random()*canvas.width),y:Math.floor(Math.random()*canvas.height),anchor:{x:.5,y:.5},color:"yellow",width:100,height:20,update(){this.currentShotTime+=1,this.currentShotTime>this.shotTimer&&(i(sound3,lz1_src),m(this.x,this.y,-1,-1),m(this.x,this.y,-1,1),m(this.x,this.y,1,-1),m(this.x,this.y,1,1),this.currentShotTime=0);var e=Math.floor(2*Math.random()),t=Math.floor(2*Math.random());0==e?(this.x-=3*this.speed,this.isMoving=!0):1==e&&(this.x+=3*this.speed,this.isMoving=!0),0==t?(this.y-=3*this.speed,this.isMoving=!0):1==t&&(this.y+=3*this.speed,this.isMoving=!0),this.x<0&&(this.x=0),this.x>canvas.width&&(this.x=canvas.width),this.y<0&&(this.y=0),this.y>canvas.height&&(this.y=canvas.height)},render(){draw(context,this.content,6,this.color)}});enemies.push(e)}function u(){let e=Sprite({type:"final_boss",shotTimer:60,currentShotTime:0,content:"8055",speed:1.5,isMoving:!1,x:Math.floor(Math.random()*canvas.width),y:Math.floor(Math.random()*canvas.height),anchor:{x:.5,y:.5},color:"red",width:80,height:20,update(){this.currentShotTime+=1,this.currentShotTime>this.shotTimer&&(i(sound3,lz1_src),function(e,t){let s=Sprite({type:"final_boss_shot",moveX:Math.floor(2*Math.random()),moveY:Math.floor(2*Math.random()),ttl:180,content:"13",speed:3,isMoving:!1,x:e,y:t,anchor:{x:.5,y:.5},color:"pink",width:40,height:20,update(e){this.rotation+=.2,0==this.moveX?(this.x-=1*this.speed,this.isMoving=!0):1==this.moveX&&(this.x+=1*this.speed,this.isMoving=!0),0==this.moveY?(this.y-=1*this.speed,this.isMoving=!0):1==this.moveY&&(this.y+=1*this.speed,this.isMoving=!0)},render(){draw(context,this.content,4,this.color)}});enemies.push(s)}(this.x,this.y),this.currentShotTime=0);var e=Math.floor(2*Math.random()),s=Math.floor(2*Math.random());0==e?(this.x-=3*this.speed,this.isMoving=!0):1==e&&(this.x+=3*this.speed,this.isMoving=!0),0==s?(this.y-=3*this.speed,this.isMoving=!0):1==s&&(this.y+=3*this.speed,this.isMoving=!0),this.x<t.x&&(this.x+=1*this.speed),this.x>t.x&&(this.x-=1*this.speed),this.y<t.y&&(this.y+=1*this.speed),this.y>t.y&&(this.y-=1*this.speed),this.x<0&&(this.x=0),this.x>canvas.width&&(this.x=canvas.width),this.y<0&&(this.y=0),this.y>canvas.height&&(this.y=canvas.height)},render(){draw(context,this.content,8,this.color)}});enemies.push(e)}function m(e,t,s,i){let r=Sprite({type:"mid_boss_shot",moveX:s,moveY:i,ttl:180,content:"7",speed:3,isMoving:!1,x:e,y:t,anchor:{x:.5,y:.5},color:"orange",width:10,height:10,update(e){this.rotation+=.1,this.x+=s,this.y+=i},render(){draw(context,this.content,4,this.color)}});enemies.push(r)}let p=Sprite({content:"Level: "+level,x:5,y:5,color:"#eeeeee",width:20,height:20,update(){},render(){draw(context,this.content,4,this.color)}});ui.push(p);let _=Sprite({content:"Score: "+score,x:5,y:30,color:"#eeeeee",width:20,height:20,update(){t.isPrimed?this.color="#ff0000":this.color="#eeeeee"},render(){draw(context,this.content,4,this.color)}});ui.push(_);let v=Sprite({content:score.toString(),x:-3,y:-35,color:"#eeeeee",width:15,height:15,update(){this.content=score.toString(),this.x=score>9?-10:-3,t.isPrimed?this.color="#ff0000":this.color="#eeeeee"},render(){draw(context,this.content,3,this.color)}});t.addChild(v);let f=Sprite({content:score.toString(),x:-23,y:20,color:"green",width:15,height:15,update(){},render(){draw(context,this.content,3,this.color)}});t.addChild(f);let g=Sprite({content:score.toString(),x:13,y:20,color:"red",width:15,height:15,update(){},render(){draw(context,this.content,3,this.color)}});t.addChild(g);let y=Sprite({content:"Time Left: "+timer,x:5,y:55,color:"#eeeeee",width:20,height:20,update(){this.content="Time Left: "+timer,timer<=10?(this.color="#ff0000",audio.playbackRate=timer<=5?1.22:1.11):(this.color="#eeeeee",audio.playbackRate=1)},render(){draw(context,this.content,4,this.color)}});ui.push(y);let b=Sprite({content:"Total: "+total_score,x:5,y:80,color:"#eeeeee",width:20,height:20,update(){},render(){draw(context,this.content,4,this.color)}});function w(){gprimes=primes.filter((e=>e>score)),gdubz=dubz.filter((e=>e>score));var e=(gprimes[0]-score).toString();"NaN"==e&&(e=" "),g.content=e,"NaN"==(e=(gdubz[0]-score).toString())&&(e=" "),f.content=e}ui.push(b);let M=GameLoop({update:function(){if(t.isAlive()){if(level_score_calculating)score>0&&(score-=1,_.content="Score: "+score,total_score+=1,b.content="Total: "+total_score),score<1&&timer>0&&(timer-=1,y.content="Time: "+timer,total_score+=1,b.content="Total: "+total_score),score<1&&timer<1&&(enemies=enemies.filter((e=>{e.isAlive()})),bombs=bombs.filter((e=>{e.isAlive()})),letterz=letterz.filter((e=>{e.isAlive()})),primes=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97],dubz=[11,22,33,44,55,66,77,88,99],level_score_calculating=!1,score=0,timer=countdownStart,w(),4==level?(audio.playbackRate=1,r(m_game3_src)):7==level?(audio.playbackRate=1,r(m_game2_src),l()):(audio.playbackRate+=.1,audio.currentTime=0,audio.play()),13==level&&x());else{if(current_letter_spawn_time+=1/60,(second_counter+=1/60)>1){if(timer-=1,level>1&&primes.includes(timer))for(c((Math.floor(3*Math.random())+1).toString(),Math.floor(1*Math.random())+1,Math.floor(1*Math.random())+1);enemies.length>10;)enemies.splice(1,1);second_counter=0}if(current_letter_spawn_time>letter_spawn_time){if(level<3)n();else if(level>=3&&level<7){0==(e=Math.floor(2*Math.random()))?n(0,1):n(0,-1,Math.floor(Math.random()*canvas.width),canvas.height)}else if(level>=7&&level<10){0==(e=Math.floor(4*Math.random()))&&n(0,1),1==e&&n(0,-1,Math.floor(Math.random()*canvas.width),canvas.height),2==e&&n(1,0,0,Math.floor(Math.random()*canvas.height)),3==e&&n(-1,0,canvas.width,Math.floor(Math.random()*canvas.height))}else if(level>9){var e;0==(e=Math.floor(8*Math.random()))&&n(0,1),1==e&&n(0,-1,Math.floor(Math.random()*canvas.width),canvas.height),2==e&&n(1,0,0,Math.floor(Math.random()*canvas.height)),3==e&&n(-1,0,canvas.width,Math.floor(Math.random()*canvas.height)),4==e&&n(1,1,Math.floor(Math.random()*canvas.width),0),5==e&&n(-1,1,Math.floor(Math.random()*canvas.width),0),6==e&&n(1,-1,Math.floor(Math.random()*canvas.width),canvas.height),7==e&&n(-1,-1,Math.floor(Math.random()*canvas.width),canvas.height)}current_letter_spawn_time=0}t.update(),t.x>canvas.width&&(t.x=canvas.width),t.x<0&&(t.x=0),t.y<0&&(t.y=0),t.y>canvas.height&&(t.y=canvas.height),final_boss_time||(letterz.map((e=>{e.update()})),letterz=letterz.filter((e=>e.isAlive())),timer<1&&R()),enemies.map((e=>{e.update()})),enemies=enemies.filter((e=>e.isAlive())),bombs=bombs.filter((e=>e.isAlive()))}ui.map((e=>{e.update()}))}else game_started&&(gamepadPressed("start")||gamepadPressed("south")||keyPressed(["r","enter","space"]))&&(primes=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97],dubz=[11,22,33,44,55,66,77,88,99],final_boss_time?(t.x=canvas.width/2,t.y=canvas.height/2+canvas.height/4,t.ttl=1/0,t.win=!1,audio.position=0,audio.playbackRate=1,audio.src=m_boss_src,audio.loop=!0,audio.play()):(mid_boss_time=!1,final_boss_time=!1,level=1,p.content="Level: "+level,score=0,_.content="Score: "+score,total_score=0,b.content="Total: "+total_score,timer=countdownStart,second_counter=0,y.content="Time Left: "+timer,w(),ui.push(p),ui.push(_),ui.push(y),enemies=enemies.filter((e=>!e.isAlive())),bombs=bombs.filter((e=>{e.isAlive()})),t.x=canvas.width/2+canvas.height/4,t.y=canvas.height/2+canvas.height/4,t.ttl=1/0,t.win=!1,audio.playbackRate=1,audio.src=m_game1_src,audio.loop=M,audio.play())),!game_started&&(gamepadPressed("start")||gamepadPressed("south")||keyPressed(["r","enter","space"]))&&(final_boss_time=!1,mid_boss_time=!1,primes=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97],dubz=[11,22,33,44,55,66,77,88,99],level=1,levelEndScore=100,p.content="Level: "+level,score=0,_.content="Score: "+score,total_score=0,b.content="Total: "+total_score,timer=countdownStart,second_counter=0,y.content="Time Left: "+timer,w(),ui.push(p),ui.push(_),ui.push(y),enemies=enemies.filter((e=>!e.isAlive())),bombs=bombs.filter((e=>{e.isAlive()})),t.x=canvas.width/2,t.y=canvas.height/2+canvas.height/4,t.ttl=1/0,t.win=!1,game_started=!0,audio.position=0,audio.playbackRate=1,audio.src=m_game1_src,audio.loop=!0,audio.play());(gamepadPressed("select")||keyPressed(["m"]))&&(audio.muted=!audio.muted),(gamepadPressed("north")||keyPressed(["l"]))&&function(e=!1){if(level+=1,audio.pause(),e){score+=100;for(var t=0;t<5;t++)P(powerups[Math.floor(Math.random()*(powerups.length-1))].effect)}level>=level_win_amount?(S(),k()):(draw(context,"Next Level!",9,"#FFFFFF",125,200),M.stop(),level_up_audio.play(),letter_fall_speed+=.25);p.content="Level: "+level}(!0),(gamepadPressed("east")||keyPressed(["e"]))&&t.currentBombTime<=0&&function(e,s){let r=Sprite({type:"p_bomb",content:"X",x:e,y:s,anchor:{x:.5,y:.5},color:"#CCCCCC",width:35,height:35,bombTimer:10,update(){this.bombTimer-=1/60,this.bombTimer<0&&(i(sound2,b1_src),this.ttl=0)},render(){draw(context,this.content,4,this.color)}});t.currentBombTime=t.bombTime,bombs.push(r)}(t.x,t.y),keyPressed(["n"])&&!mid_boss_time&&(mid_boss_time=!0,l()),keyPressed(["b"])&&!final_boss_time&&x()},render:function(){game_started?(t.render(),letterz.map((e=>{e.render()})),ui.map((e=>{e.render()})),enemies.map((e=>{e.render()})),bombs.map((e=>{e.render()})),t.isAlive()||(t.win?k():draw(context,"GAME OVER",12,"red",125,200))):L()}});function x(){final_boss_time=!0,p.ttl=0,_.ttl=0,y.ttl=0,b.ttl=0,enemies=enemies.filter((e=>{e.isAlive()})),bombs=bombs.filter((e=>{e.isAlive()})),letterz=letterz.filter((e=>!e.isAlive())),ui=ui.filter((e=>{e.isAlive()})),audio.pause(),audio.currentTime=0,audio.playbackRate=1,audio.src=m_boss_src,audio.loop=!0,audio.play(),u()}onKey(["p"],(function(e){M.isStopped?M.start():M.stop()})),keyMap.BracketLeft="leftbracket",keyMap.BracketRight="rightbracket",keyMap.ShiftLeft="leftshift",onKey("leftbracket",(function(e){(current_music_track-=1)<0&&(current_music_track=0),audio.pause(),audio.currentTime=0,audio.src=music_tracks[current_music_track],audio.play()})),onKey("rightbracket",(function(e){(current_music_track+=1)>music_tracks.length-1&&(current_music_track=0),audio.pause(),audio.currentTime=0,audio.src=music_tracks[current_music_track],audio.play()})),onKey("leftshift",(function(e){t.isThrusting||t.isThrustRefreshing||t.isPrimed||(t.isThrusting=!0,t.speed=player_speed*t.thrustMult)})),onKey("leftshift",(function(e){t.isThrusting&&(t.isThrusting=!1,t.isThrustRefreshing=!0,t.speed=player_speed)}),{handler:"keyup"}),onGamepad("west",(function(e){t.isThrusting||t.isThrustRefreshing||t.isPrimed||(t.isThrusting=!0,t.speed=player_speed*t.thrustMult)})),onGamepad("west",(function(e){t.isThrusting&&(t.isThrusting=!1,t.isThrustRefreshing=!0,t.speed=player_speed)}),{handler:"gamepadup"});var T=!1;function R(){t.ttl=0,t.win=!1,t.playAnimation("die"),letterz.filter((e=>{e.ttl=0})),audio.pause(),audio.currentTime=0,audio.playbackRate=1,audio.src=dr2_src,audio.loop=!1,audio.play()}function S(){t.ttl=0,t.win=!0,t.playAnimation("idle"),letterz.filter((e=>{e.ttl=0})),audio.pause(),audio.currentTime=0}function k(){draw(context,"YOU WIN!",12,"red",150,200)}function L(){draw(context,"PRIMONUMEROPHOBIA",9,"red",340,300)}function P(e){"magnet_range"==e&&(t.magnetRange+=4),"magnet_speed_mult"==e&&(t.magnetSpeedMult+=.1),"thrust_time"==e&&(t.thrustTime+=.1),"thrust_refresh_time"==e&&(t.thrustRefreshTime-=.05),"thrust_mult"==e&&(t.thrustMult+=.1),"player_speed"==e&&(player_speed+=.1,t.speed=player_speed)}s_lu1.init(lu1),setInterval((function(){if(!T&&(T=s_lu1.generate()>=1)){var e=s_lu1.createWave();lu1_src=URL.createObjectURL(new Blob([e],{type:"audio/wav"})),(level_up_audio=document.createElement("audio")).src=lu1_src,level_up_audio.loop=!1,level_up_audio.onended=function(){level_score_calculating=!0,M.start()}}})),L(),M.start()};