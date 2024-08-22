!function(){"use strict";
/**
   * @preserve
   * Kontra.js v9.0.0
   */let t=()=>{};let e,i,s={};function h(t,e){s[t]=s[t]||[],s[t].push(e)}function n(t,...e){(s[t]||[]).map((t=>t(...e)))}let r={get:(e,i)=>"_proxy"==i||t};function o(){return i}class a{constructor({spriteSheet:t,frames:e,frameRate:i,loop:s=!0,name:h}){let{width:n,height:r,margin:o=0}=t.frame;Object.assign(this,{spriteSheet:t,frames:e,frameRate:i,loop:s,name:h,width:n,height:r,margin:o,isStopped:!1,_f:0,_a:0})}clone(){return new a(this)}start(){this.isStopped=!1,this.loop||this.reset()}stop(){this.isStopped=!0}reset(){this._f=0,this._a=0}update(t=1/60){if(!this.isStopped)if(this.loop||this._f!=this.frames.length-1)for(this._a+=t;this._a*this.frameRate>=1;)this._f=++this._f%this.frames.length,this._a-=1/this.frameRate;else this.stop()}render({x:t,y:e,width:i=this.width,height:s=this.height,context:h=o()}){let n=this.frames[this._f]/this.spriteSheet._f|0,r=this.frames[this._f]%this.spriteSheet._f|0;h.drawImage(this.spriteSheet.image,r*this.width+(2*r+1)*this.margin,n*this.height+(2*n+1)*this.margin,this.width,this.height,t,e,i,s)}}function c(){return new a(...arguments)}function d(t,e,i){return Math.min(Math.max(t,i),e)}class l{constructor(t=0,e=0,i={}){null!=t.x?(this.x=t.x,this.y=t.y):(this.x=t,this.y=e),i._c&&(this.clamp(i._a,i._b,i._d,i._e),this.x=t,this.y=e)}set(t){this.x=t.x,this.y=t.y}add(t){return new l(this.x+t.x,this.y+t.y,this)}subtract(t){return new l(this.x-t.x,this.y-t.y,this)}scale(t){return new l(this.x*t,this.y*t)}normalize(t=this.length()||1){return new l(this.x/t,this.y/t)}dot(t){return this.x*t.x+this.y*t.y}length(){return Math.hypot(this.x,this.y)}distance(t){return Math.hypot(this.x-t.x,this.y-t.y)}angle(t){return Math.acos(this.dot(t)/(this.length()*t.length()))}direction(){return Math.atan2(this.y,this.x)}clamp(t,e,i,s){this._c=!0,this._a=t,this._b=e,this._d=i,this._e=s}get x(){return this._x}get y(){return this._y}set x(t){this._x=this._c?d(this._a,this._d,t):t}set y(t){this._y=this._c?d(this._b,this._e,t):t}}function p(){return new l(...arguments)}class u{constructor(t){return this.init(t)}init(t={}){this.position=p(),this.velocity=p(),this.acceleration=p(),this.ttl=1/0,Object.assign(this,t)}update(t){this.advance(t)}advance(t){let e=this.acceleration;t&&(e=e.scale(t)),this.velocity=this.velocity.add(e);let i=this.velocity;t&&(i=i.scale(t)),this.position=this.position.add(i),this._pc(),this.ttl--}get dx(){return this.velocity.x}get dy(){return this.velocity.y}set dx(t){this.velocity.x=t}set dy(t){this.velocity.y=t}get ddx(){return this.acceleration.x}get ddy(){return this.acceleration.y}set ddx(t){this.acceleration.x=t}set ddy(t){this.acceleration.y=t}isAlive(){return this.ttl>0}_pc(){}}class y extends u{init({width:t=0,height:e=0,context:i=o(),render:s=this.draw,update:n=this.advance,children:r=[],anchor:a={x:0,y:0},opacity:c=1,rotation:d=0,scaleX:l=1,scaleY:p=1,...u}={}){this._c=[],super.init({width:t,height:e,context:i,anchor:a,opacity:c,rotation:d,scaleX:l,scaleY:p,...u}),this._di=!0,this._uw(),this.addChild(r),this._rf=s,this._uf=n,h("init",(()=>{this.context??=o()}))}update(t){this._uf(t),this.children.map((e=>e.update&&e.update(t)))}render(){let t=this.context;t.save(),(this.x||this.y)&&t.translate(this.x,this.y),this.rotation&&t.rotate(this.rotation),1==this.scaleX&&1==this.scaleY||t.scale(this.scaleX,this.scaleY);let e=-this.width*this.anchor.x,i=-this.height*this.anchor.y;(e||i)&&t.translate(e,i),this.context.globalAlpha=this.opacity,this._rf(),(e||i)&&t.translate(-e,-i),this.children.map((t=>t.render&&t.render())),t.restore()}draw(){}_pc(){this._uw(),this.children.map((t=>t._pc()))}get x(){return this.position.x}get y(){return this.position.y}set x(t){this.position.x=t,this._pc()}set y(t){this.position.y=t,this._pc()}get width(){return this._w}set width(t){this._w=t,this._pc()}get height(){return this._h}set height(t){this._h=t,this._pc()}_uw(){if(!this._di)return;let{_wx:t=0,_wy:e=0,_wo:i=1,_wr:s=0,_wsx:h=1,_wsy:n=1}=this.parent||{};this._wx=this.x,this._wy=this.y,this._ww=this.width,this._wh=this.height,this._wo=i*this.opacity,this._wsx=h*this.scaleX,this._wsy=n*this.scaleY,this._wx=this._wx*h,this._wy=this._wy*n,this._ww=this.width*this._wsx,this._wh=this.height*this._wsy,this._wr=s+this.rotation;let{x:r,y:o}=function(t,e){let i=Math.sin(e),s=Math.cos(e);return{x:t.x*s-t.y*i,y:t.x*i+t.y*s}}({x:this._wx,y:this._wy},s);this._wx=r,this._wy=o,this._wx+=t,this._wy+=e}get world(){return{x:this._wx,y:this._wy,width:this._ww,height:this._wh,opacity:this._wo,rotation:this._wr,scaleX:this._wsx,scaleY:this._wsy}}set children(t){this.removeChild(this._c),this.addChild(t)}get children(){return this._c}addChild(...e){e.flat().map((e=>{this.children.push(e),e.parent=this,e._pc=e._pc||t,e._pc()}))}removeChild(...t){t.flat().map((t=>{(function(t,e){let i=t.indexOf(e);if(-1!=i)return t.splice(i,1),!0})(this.children,t)&&(t.parent=null,t._pc())}))}get opacity(){return this._opa}set opacity(t){this._opa=d(0,1,t),this._pc()}get rotation(){return this._rot}set rotation(t){this._rot=t,this._pc()}setScale(t,e=t){this.scaleX=t,this.scaleY=e}get scaleX(){return this._scx}set scaleX(t){this._scx=t,this._pc()}get scaleY(){return this._scy}set scaleY(t){this._scy=t,this._pc()}}class m extends y{init({image:t,width:e=(t?t.width:void 0),height:i=(t?t.height:void 0),...s}={}){super.init({image:t,width:e,height:i,...s})}get animations(){return this._a}set animations(t){let e,i;for(e in this._a={},t)this._a[e]=t[e].clone(),i=i||this._a[e];this.currentAnimation=i,this.width=this.width||i.width,this.height=this.height||i.height}playAnimation(t){this.currentAnimation?.stop(),this.currentAnimation=this.animations[t],this.currentAnimation.start()}advance(t){super.advance(t),this.currentAnimation?.update(t)}draw(){this.image&&this.context.drawImage(this.image,0,0,this.image.width,this.image.height),this.currentAnimation&&this.currentAnimation.render({x:0,y:0,width:this.width,height:this.height,context:this.context}),this.color&&(this.context.fillStyle=this.color,this.context.fillRect(0,0,this.width,this.height))}}function f(){return new m(...arguments)}function g(t){let e=t.canvas;t.clearRect(0,0,e.width,e.height)}let w=[],x={},v={},_={0:"south",1:"east",2:"west",3:"north",4:"leftshoulder",5:"rightshoulder",6:"lefttrigger",7:"righttrigger",8:"select",9:"start",10:"leftstick",11:"rightstick",12:"dpadup",13:"dpaddown",14:"dpadleft",15:"dpadright"};function M(t){w[t.gamepad.index]={pressedButtons:{},axes:{}}}function b(t){delete w[t.gamepad.index]}function S(){w.map((t=>{t.pressedButtons={},t.axes={}}))}function R(){let t=navigator.getGamepads?navigator.getGamepads():navigator.webkitGetGamepads?navigator.webkitGetGamepads:[];for(let e=0;e<t.length;e++){let i=t[e];if(!i)continue;i.buttons.map(((t,e)=>{let s=_[e],{pressed:h}=t,{pressedButtons:n}=w[i.index],r=n[s];!r&&h?[x[i.index],x].map((e=>{e?.[s]?.(i,t,s)})):r&&!h&&[v[i.index],v].map((e=>{e?.[s]?.(i,t,s)})),n[s]=h}));let{axes:s}=w[i.index];s.leftstickx=i.axes[0],s.leftsticky=i.axes[1],s.rightstickx=i.axes[2],s.rightsticky=i.axes[3]}}function T(t,{gamepad:e}={}){return isNaN(e)?w.some((e=>e.pressedButtons[t])):!!w[e]&&!!w[e].pressedButtons[t]}function k(t,e){return w[e]?.axes[t]||0}let A={},L={},E={},P={Enter:"enter",Escape:"esc",Space:"space",ArrowLeft:"arrowleft",ArrowUp:"arrowup",ArrowRight:"arrowright",ArrowDown:"arrowdown"};function Y(e=t,i){e._pd&&i.preventDefault(),e(i)}function C(t){let e=P[t.code],i=A[e];E[e]=!0,Y(i,t)}function U(t){let e=P[t.code],i=L[e];E[e]=!1,Y(i,t)}function I(){E={}}function B(t,e,{handler:i="keydown",preventDefault:s=!0}={}){let h="keydown"==i?A:L;e._pd=s,[].concat(t).map((t=>h[t]=e))}function O(t){return!![].concat(t).some((t=>E[t]))}function X(t){if(+t==t)return t;let e=[],i=t.split(".."),s=+i[0],h=+i[1],n=s;if(s<h)for(;n<=h;n++)e.push(n);else for(;n>=h;n--)e.push(n);return e}class W{constructor({image:t,frameWidth:e,frameHeight:i,frameMargin:s,animations:h}={}){if(!t)throw Error("You must provide an Image for the SpriteSheet");this.animations={},this.image=t,this.frame={width:e,height:i,margin:s},this._f=t.width/e|0,this.createAnimations(h)}createAnimations(t){let e,i;for(i in t){let{frames:s,frameRate:h,loop:n}=t[i];if(e=[],null==s)throw Error("Animation "+i+" must provide a frames property");[].concat(s).map((t=>{e=e.concat(X(t))})),this.animations[i]=c({spriteSheet:this,frames:e,frameRate:h,loop:n,name:i})}}}let{canvas:j,context:F}=function(t,{contextless:s=!1}={}){if(e=document.getElementById(t)||t||document.querySelector("canvas"),s&&(e=e||new Proxy({},r)),!e)throw Error("You must provide a canvas element for the game");return i=e.getContext("2d")||new Proxy({},r),i.imageSmoothingEnabled=!1,n("init"),{canvas:e,context:i}}();j.width=window.innerWidth,j.height=window.innerHeight;var D,G,N,H,q,z,K,V,J,Q,Z,$,tt,et=new CPlayer,it=new CPlayer,st=new CPlayer,ht=new CPlayer,nt=new CPlayer,rt=new CPlayer,ot=new CPlayer,at=new CPlayer;let ct=[];var dt=0,lt=!1;et.init(song),setInterval((function(){if(!lt&&(lt=et.generate()>=1)){var t=et.createWave();G=URL.createObjectURL(new Blob([t],{type:"audio/wav"})),ct.push(G)}}));var pt=!1;it.init(song2),setInterval((function(){if(!pt&&(pt=it.generate()>=1)){var t=it.createWave();N=URL.createObjectURL(new Blob([t],{type:"audio/wav"})),ct.push(N)}}));var ut=!1;nt.init(death_song),setInterval((function(){if(!ut&&(ut=nt.generate()>=1)){var t=nt.createWave();H=URL.createObjectURL(new Blob([t],{type:"audio/wav"}))}}));var yt=!1;st.init(menu_song),setInterval((function(){if(!yt&&(yt=st.generate()>=1)){var t=st.createWave();q=URL.createObjectURL(new Blob([t],{type:"audio/wav"})),ct.push(q),(Q=document.createElement("audio")).src=q,Q.loop=!0,Q.play()}}));var mt=!1;ht.init(boss_song),setInterval((function(){if(!mt&&(mt=ht.generate()>=1)){var t=ht.createWave();J=URL.createObjectURL(new Blob([t],{type:"audio/wav"})),ct.push(J)}}));var ft=!1;rt.init(collect_song),setInterval((function(){if(!ft&&(ft=rt.generate()>=1)){var t=rt.createWave();z=URL.createObjectURL(new Blob([t],{type:"audio/wav"})),(Z=document.createElement("audio")).src=z,Z.loop=!1}}));var gt=!1;ot.init(level_song),setInterval((function(){if(!gt&&(gt=ot.generate()>=1)){var t=ot.createWave();K=URL.createObjectURL(new Blob([t],{type:"audio/wav"})),($=document.createElement("audio")).src=K,$.loop=!1}}));var wt=1,xt=15,vt=100,_t=0,Mt=0,bt=15,St=0,Rt=!1,Tt=!1,kt=!1,At=!1,Lt=0,Et=1;let Pt=[];Pt.push({effect:"magnet",color:"green"}),Pt.push({effect:"thrust",color:"orange"});let Yt=[],Ct=[];!function(){let t;for(t=0;t<26;t++)P["Key"+String.fromCharCode(t+65)]=String.fromCharCode(t+97);for(t=0;t<10;t++)P["Digit"+t]=P["Numpad"+t]=""+t;window.addEventListener("keydown",C),window.addEventListener("keyup",U),window.addEventListener("blur",I)}(),window.addEventListener("gamepadconnected",M),window.addEventListener("gamepaddisconnected",b),window.addEventListener("blur",S),h("tick",R);let Ut=new Image;Ut.src="player_sheet.png",Ut.onload=function(){let e=function(){return new W(...arguments)}({image:Ut,frameWidth:32,frameHeight:32,animations:{idle:{frames:[0,1,2,3],frameRate:5,loop:!0},walk:{frames:[4,5,6,7],frameRate:5,loop:!0},die:{frames:10,frameRate:5,loop:!1}}}),i=f({speed:3,isMoving:!1,isPrimed:!1,scaleX:1,scaleY:1,badShit:0,win:!1,magnetRange:32,thrustingMult:1,isThrusting:!1,x:360,y:240,anchor:{x:.5,y:.5},animations:e.animations,ttl:0,update(){let t=k("leftstickx",0),e=k("leftsticky",0);this.isMoving=!1,t<-.4||O(["arrowleft","a"])?(this.x-=1*this.speed,this.isMoving=!0):(t>.4||O(["arrowright","d"]))&&(this.x+=1*this.speed,this.isMoving=!0),e<-.4||O(["arrowup","w"])?(this.y-=1*this.speed,this.isMoving=!0):(e>.4||O(["arrowdown","s"]))&&(this.y+=1*this.speed,this.isMoving=!0);for(var i=0;i<c.length;i++){let t=c[i];s(this,t)&&("letter"==t.type&&(_t+=parseInt(t.content),bt+=parseInt(t.content),_t>=vt?(wt+=1,Q.pause(),wt>=14?(U(),I()):(draw(F,"Next Level!",9,"#FFFFFF",125,200),L.stop(),tt.play(),Et+=.5)):Z.play(),b.content="Score: "+_t,d.includes(_t)?(this.isPrimed=!0,this.isThrusting=!1,a(),r()):(this.isPrimed=!1,a()),l.includes(_t)&&p(Pt[Math.floor(Math.random()*Pt.length)])),"powerup"==t.type&&y(t.effect),t.ttl=0),t.x>=this.x-this.magnetRange&&t.x<=this.x+this.magnetRange&&t.y>=this.y-this.magnetRange&&t.y<=this.y+this.magnetRange&&(t.x>this.x&&(t.x-=1),t.x<this.x&&(t.x+=1),t.y>this.y&&(t.y-=1),t.y<this.y&&(t.y+=1))}for(i=0;i<Yt.length;i++){let t=Yt[i];"1"!=t.type&&"2"!=t.type&&"3"!=t.type&&"4"!=t.type&&"enemy_shot"!=t.type||!s(this,t)||((_t-=t.scoreDamage)<0&&(_t=0),b.content="Score: "+_t,t.ttl=0,d.includes(_t)?(this.isPrimed=!0,this.isThrusting=!1,a(),r()):(this.isPrimed=!1,a()),l.includes(_t)&&p(Pt[Math.floor(Math.random()*Pt.length)])),"mid_boss_shot"==t.type&&s(this,t)&&C(),"final_boss_shot"==t.type&&s(this,t)&&C()}this.isMoving?"walk"!=this.currentAnimation.name&&this.playAnimation("walk"):"idle"!=this.currentAnimation.name&&this.playAnimation("idle"),this.advance()}});function s(t,e){return t.x>=e.x-e.width/2&&t.x<=e.x+e.width/2&&t.y>=e.y-e.height/2&&t.y<=e.y+e.height/2}function r(){i.badShit=Math.floor(3*Math.random()+1),1==i.badShit&&(i.speed=-i.speed),2==i.badShit&&(i.speed=.5),3==i.badShit&&(i.speed=10)}function a(){1==i.badShit&&(i.speed=-i.speed),2==i.badShit&&(i.speed=3),3==i.badShit&&(i.speed=3),i.badShit=0}let c=[],d=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97],l=[11,22,33,44,55,66,77,88,99];function p(t){let e=f({type:"powerup",effect:t.effect,content:u(t.effect),speed:1,x:Math.floor(Math.random()*j.width),y:0,anchor:{x:.5,y:.5},color:t.color,color1:t.color,color2:"white",blinkTimer:0,blinkSpeed:30,width:20,height:20,update(){this.y+=1*this.speed,this.blinkTimer+=1,this.blinkTimer>this.blinkSpeed&&(this.color==this.color1?this.color=this.color2:this.color=this.color1,this.blinkTimer=0)},render(){draw(F,this.content,4,this.color)}});c.push(e)}function u(t){return"magnet"==t?"U":"thrust"==t?"I":void 0}function y(t){"magnet"==t&&(i.magnetRange+=8),"thrust"==t&&(i.thrustingMult+=.2)}function m(t,e,s){let h=f({type:t,content:w(t),speed:e,scoreDamage:s,shotTimer:60,currentShotTime:0,isMoving:!1,x:Math.floor(Math.random()*j.width),y:Math.floor(Math.random()*j.height),anchor:{x:.5,y:.5},color:"yellow",width:20,height:20,update(){var e=Math.floor(2*Math.random()),s=Math.floor(2*Math.random());"2"!=t&&"4"!=t||(this.currentShotTime+=1,this.currentShotTime>this.shotTimer&&(!function(t,e){let i=f({type:"enemy_shot",moveX:Math.floor(2*Math.random()),moveY:Math.floor(2*Math.random()),ttl:180,content:"O",speed:3,scoreDamage:1,isMoving:!1,x:t,y:e,anchor:{x:.5,y:.5},color:"pink",width:10,height:10,update(t){0==this.moveX?(this.x-=1*this.speed,this.isMoving=!0):1==this.moveX&&(this.x+=1*this.speed,this.isMoving=!0),0==this.moveY?(this.y-=1*this.speed,this.isMoving=!0):1==this.moveY&&(this.y+=1*this.speed,this.isMoving=!0)},render(){draw(F,this.content,2,this.color)}});Yt.push(i)}(this.x,this.y),this.currentShotTime=0)),0==e?(this.x-=1*this.speed,this.isMoving=!0):1==e&&(this.x+=1*this.speed,this.isMoving=!0),0==s?(this.y-=1*this.speed,this.isMoving=!0):1==s&&(this.y+=1*this.speed,this.isMoving=!0),this.x<i.x&&(this.x+=1*this.speed),this.x>i.x&&(this.x-=1*this.speed),this.y<i.y&&(this.y+=1*this.speed),this.y>i.y&&(this.y-=1*this.speed),this.x<0&&(this.x=0),this.x>j.width&&(this.x=j.width),this.y<0&&(this.y=0),this.y>j.height&&(this.y=j.height)},render(){draw(F,this.content,4,this.color)}});Yt.push(h)}function w(t){return"1"==t?"2":"2"==t?"3":"3"==t?"5":"4"==t?"7":void 0}function x(){let t=f({type:"mid_boss",shotTimer:120,currentShotTime:0,content:"PR1M3",speed:1,isMoving:!1,x:Math.floor(Math.random()*j.width),y:Math.floor(Math.random()*j.height),anchor:{x:.5,y:.5},color:"yellow",width:100,height:20,update(){this.currentShotTime+=1,this.currentShotTime>this.shotTimer&&(_(this.x,this.y,-1,-1),_(this.x,this.y,-1,1),_(this.x,this.y,1,-1),_(this.x,this.y,1,1),this.currentShotTime=0);var t=Math.floor(2*Math.random()),e=Math.floor(2*Math.random());0==t?(this.x-=3*this.speed,this.isMoving=!0):1==t&&(this.x+=3*this.speed,this.isMoving=!0),0==e?(this.y-=3*this.speed,this.isMoving=!0):1==e&&(this.y+=3*this.speed,this.isMoving=!0),this.x<0&&(this.x=0),this.x>j.width&&(this.x=j.width),this.y<0&&(this.y=0),this.y>j.height&&(this.y=j.height)},render(){draw(F,this.content,6,this.color)}});Yt.push(t)}function v(){let t=f({type:"final_boss",shotTimer:60,currentShotTime:0,content:"8055",speed:1.5,isMoving:!1,x:Math.floor(Math.random()*j.width),y:Math.floor(Math.random()*j.height),anchor:{x:.5,y:.5},color:"red",width:80,height:20,update(){this.currentShotTime+=1,this.currentShotTime>this.shotTimer&&(!function(t,e){let i=f({type:"final_boss_shot",moveX:Math.floor(2*Math.random()),moveY:Math.floor(2*Math.random()),ttl:180,content:"13",speed:3,isMoving:!1,x:t,y:e,anchor:{x:.5,y:.5},color:"pink",width:40,height:20,update(t){0==this.moveX?(this.x-=1*this.speed,this.isMoving=!0):1==this.moveX&&(this.x+=1*this.speed,this.isMoving=!0),0==this.moveY?(this.y-=1*this.speed,this.isMoving=!0):1==this.moveY&&(this.y+=1*this.speed,this.isMoving=!0)},render(){draw(F,this.content,4,this.color)}});Yt.push(i)}(this.x,this.y),this.currentShotTime=0);var t=Math.floor(2*Math.random()),e=Math.floor(2*Math.random());0==t?(this.x-=3*this.speed,this.isMoving=!0):1==t&&(this.x+=3*this.speed,this.isMoving=!0),0==e?(this.y-=3*this.speed,this.isMoving=!0):1==e&&(this.y+=3*this.speed,this.isMoving=!0),this.x<i.x&&(this.x+=1*this.speed),this.x>i.x&&(this.x-=1*this.speed),this.y<i.y&&(this.y+=1*this.speed),this.y>i.y&&(this.y-=1*this.speed),this.x<0&&(this.x=0),this.x>j.width&&(this.x=j.width),this.y<0&&(this.y=0),this.y>j.height&&(this.y=j.height)},render(){draw(F,this.content,8,this.color)}});Yt.push(t)}function _(t,e,i,s){let h=f({type:"mid_boss_shot",moveX:i,moveY:s,ttl:180,content:"7",speed:3,isMoving:!1,x:t,y:e,anchor:{x:.5,y:.5},color:"orange",width:10,height:10,update(t){this.rotation+=.1,this.x+=i,this.y+=s},render(){draw(F,this.content,4,this.color)}});Yt.push(h)}let M=f({content:"Level: "+wt,x:5,y:5,color:"#eeeeee",width:20,height:20,update(){},render(){draw(F,this.content,4,this.color)}});Ct.push(M);let b=f({content:"Score: "+_t,x:5,y:30,color:"#eeeeee",width:20,height:20,update(){i.isPrimed?this.color="#ff0000":this.color="#eeeeee"},render(){draw(F,this.content,4,this.color)}});Ct.push(b);let S=f({content:_t.toString(),x:-3,y:-35,color:"#eeeeee",width:15,height:15,update(){this.content=_t.toString(),this.x=_t>9?-10:-3,i.isPrimed?this.color="#ff0000":this.color="#eeeeee"},render(){draw(F,this.content,3,this.color)}});i.addChild(S);let R=f({content:"Time Left: "+bt,x:5,y:55,color:"#eeeeee",width:20,height:20,update(){this.content="Time Left: "+bt,bt<=10?(this.color="#ff0000",Q.playbackRate=bt<=5?1.22:1.11):(this.color="#eeeeee",Q.playbackRate=1)},render(){draw(F,this.content,4,this.color)}});Ct.push(R);let A=f({content:"Total: "+Mt,x:5,y:80,color:"#eeeeee",width:20,height:20,update(){},render(){draw(F,this.content,4,this.color)}});Ct.push(A);let L=function({fps:e=60,clearCanvas:i=!0,update:s=t,render:r,context:a=o(),blur:c=!1}={}){if(!r)throw Error("You must provide a render() function");let d,l,p,u,y,m=0,f=1e3/e,w=1/e,x=i?g:t,v=!0;function _(){if(l=requestAnimationFrame(_),v&&(p=performance.now(),u=p-d,d=p,!(u>1e3))){for(n("tick"),m+=u;m>=f;)y.update(w),m-=f;x(y.context),y.render()}}return c||(window.addEventListener("focus",(()=>{v=!0})),window.addEventListener("blur",(()=>{v=!1}))),h("init",(()=>{y.context??=o()})),y={update:s,render:r,isStopped:!0,context:a,start(){d=performance.now(),this.isStopped=!1,requestAnimationFrame(_)},stop(){this.isStopped=!0,cancelAnimationFrame(l)},_frame:_,set _last(t){d=t}},y}({update:function(){var t;i.isAlive()?(Tt?(_t>0&&(_t-=1,b.content="Score: "+_t,Mt+=1,A.content="Total: "+Mt),_t<1&&bt>0&&(bt-=1,R.content="Time: "+bt,Mt+=1,A.content="Total: "+Mt),_t<1&&bt<1&&(Yt=Yt.filter((t=>{t.isAlive()})),c=c.filter((t=>{t.isAlive()})),Tt=!1,_t=0,bt=15,7==wt?(Q.playbackRate=1,t=N,Q.pause(),Q.currentTime=0,Q.src=t,Q.play(),x()):(Q.playbackRate+=.1,Q.currentTime=0,Q.play()),13==wt&&E(),M.content="Level: "+wt)):(Lt+=1/60,(St+=1/60)>1&&(bt-=1,d.includes(bt)&&m((Math.floor(3*Math.random())+1).toString(),Math.floor(1*Math.random())+1,Math.floor(1*Math.random())+1),St=0),Lt>1&&(!function(){let t=f({type:"letter",content:Math.floor(8*Math.random()+1).toString(),speed:Et,x:Math.floor(Math.random()*j.width),y:0,anchor:{x:.5,y:.5},color:"#eeeeee",width:20,height:20,update(){this.y+=1*this.speed,this.y>j.height&&(this.ttl=0)},render(){draw(F,this.content,4,this.color)}});c.push(t)}(),Lt=0),i.update(),i.x>j.width&&(i.x=j.width),i.x<0&&(i.x=0),i.y<0&&(i.y=0),i.y>j.height&&(i.y=j.height),At||(c.map((t=>{t.update()})),c=c.filter((t=>t.isAlive())),bt<1&&C()),Yt.map((t=>{t.update()})),Yt=Yt.filter((t=>t.isAlive()))),Ct.map((t=>{t.update()}))):(Rt&&(T("south")||O(["r","enter","space"]))&&(At?(i.x=j.width/2,i.y=j.height/2,i.ttl=1/0,i.win=!1,Q.position=0,Q.playbackRate=1,Q.src=J,Q.loop=!0,Q.play()):(kt=!1,At=!1,wt=1,M.content="Level: "+wt,_t=0,b.content="Score: "+_t,Mt=0,A.content="Total: "+Mt,bt=15,St=0,R.content="Time Left: "+bt,Ct.push(M),Ct.push(b),Ct.push(R),Yt=Yt.filter((t=>!t.isAlive())),i.x=j.width/2,i.y=j.height/2,i.ttl=1/0,i.win=!1,Q.playbackRate=1,Q.src=G,Q.loop=L,Q.play())),Rt||!T("south")&&!O(["r","enter","space"])||(At=!1,kt=!1,wt=1,vt=100,M.content="Level: "+wt,_t=0,b.content="Score: "+_t,Mt=0,A.content="Total: "+Mt,bt=xt,St=0,R.content="Time Left: "+bt,Ct.push(M),Ct.push(b),Ct.push(R),Yt=Yt.filter((t=>!t.isAlive())),i.x=j.width/2,i.y=j.height/2,i.ttl=1/0,i.win=!1,Rt=!0,Q.position=0,Q.playbackRate=1,Q.src=G,Q.loop=!0,Q.play())),(T("select")||O(["m"]))&&(Q.muted=!Q.muted),O(["n"])&&!kt&&(kt=!0,x()),O(["b"])&&!At&&E()},render:function(){Rt?(i.render(),c.map((t=>{t.render()})),Ct.map((t=>{t.render()})),Yt.map((t=>{t.render()})),i.isAlive()||(i.win?I():draw(F,"GAME OVER",12,"red",125,200))):X()}});function E(){At=!0,M.ttl=0,b.ttl=0,R.ttl=0,A.ttl=0,c=c.filter((t=>!t.isAlive())),Ct=Ct.filter((t=>{t.isAlive()})),Q.pause(),Q.currentTime=0,Q.playbackRate=1,Q.src=J,Q.loop=!0,Q.play(),v()}B(["p"],(function(t){L.isStopped?L.start():L.stop()})),P.BracketLeft="leftbracket",P.BracketRight="rightbracket",P.ShiftLeft="leftshift",B("leftbracket",(function(t){(dt-=1)<0&&(dt=0),Q.pause(),Q.currentTime=0,Q.src=ct[dt],Q.play()})),B("rightbracket",(function(t){(dt+=1)>ct.length-1&&(dt=0),Q.pause(),Q.currentTime=0,Q.src=ct[dt],Q.play()})),B("leftshift",(function(t){i.isThrusting||i.isPrimed||(i.isThrusting=!0,i.speed=3*i.thrustingMult)})),B("leftshift",(function(t){i.isThrusting&&(i.isThrusting=!1,i.speed=3)}),{handler:"keyup"});var Y=!1;function C(){i.ttl=0,i.win=!1,i.playAnimation("die"),c.filter((t=>{t.ttl=0})),Q.pause(),Q.currentTime=0,Q.playbackRate=1,Q.src=H,Q.loop=!1,Q.play()}function U(){i.ttl=0,i.win=!0,i.playAnimation("idle"),c.filter((t=>{t.ttl=0})),Q.pause(),Q.currentTime=0}function I(){draw(F,"YOU WIN!",12,"red",150,200)}function X(){draw(F,"PRIMONUMEROPHOBIA",9,"red",33,200)}at.init(lvl_up_song),setInterval((function(){Y||(Y=at.generate()>=1)&&(D=at.createWave(),V=URL.createObjectURL(new Blob([D],{type:"audio/wav"})),(tt=document.createElement("audio")).src=V,tt.loop=!1,tt.onended=function(){Tt=!0,L.start()})})),X(),L.start()}}();
