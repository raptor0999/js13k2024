var letters=letters={A:[[,1],[1,,1],[1,,1],[1,1,1],[1,,1]],B:[[1,1],[1,,1],[1,1,1],[1,,1],[1,1]],C:[[1,1,1],[1],[1],[1],[1,1,1]],D:[[1,1],[1,,1],[1,,1],[1,,1],[1,1]],E:[[1,1,1],[1],[1,1,1],[1],[1,1,1]],F:[[1,1,1],[1],[1,1],[1],[1]],G:[[,1,1],[1],[1,,1,1],[1,,,1],[,1,1]],H:[[1,,1],[1,,1],[1,1,1],[1,,1],[1,,1]],I:[[1,1,1],[,1],[,1],[,1],[1,1,1]],J:[[1,1,1],[,,1],[,,1],[1,,1],[1,1,1]],K:[[1,,,1],[1,,1],[1,1],[1,,1],[1,,,1]],L:[[1],[1],[1],[1],[1,1,1]],M:[[1,1,1,1,1],[1,,1,,1],[1,,1,,1],[1,,,,1],[1,,,,1]],N:[[1,,,1],[1,1,,1],[1,,1,1],[1,,,1],[1,,,1]],O:[[1,1,1],[1,,1],[1,,1],[1,,1],[1,1,1]],P:[[1,1,1],[1,,1],[1,1,1],[1],[1]],Q:[[0,1,1],[1,,,1],[1,,,1],[1,,1,1],[1,1,1,1]],R:[[1,1],[1,,1],[1,,1],[1,1],[1,,1]],S:[[1,1,1],[1],[1,1,1],[,,1],[1,1,1]],T:[[1,1,1],[,1],[,1],[,1],[,1]],U:[[1,,1],[1,,1],[1,,1],[1,,1],[1,1,1]],V:[[1,,,,1],[1,,,,1],[,1,,1],[,1,,1],[,,1]],W:[[1,,,,1],[1,,,,1],[1,,,,1],[1,,1,,1],[1,1,1,1,1]],X:[[1,,,,1],[,1,,1],[,,1],[,1,,1],[1,,,,1]],Y:[[1,,1],[1,,1],[,1],[,1],[,1]],Z:[[1,1,1,1,1],[,,,1],[,,1],[,1],[1,1,1,1,1]],0:[[1,1,1],[1,,1],[1,,1],[1,,1],[1,1,1]],1:[[,1],[,1],[,1],[,1],[,1]],2:[[1,1,1],[0,0,1],[1,1,1],[1,0,0],[1,1,1]],3:[[1,1,1],[0,0,1],[1,1,1],[0,0,1],[1,1,1]],4:[[1,0,1],[1,0,1],[1,1,1],[0,0,1],[0,0,1]],5:[[1,1,1],[1,0,0],[1,1,1],[0,0,1],[1,1,1]],6:[[1,1,1],[1,0,0],[1,1,1],[1,0,1],[1,1,1]],7:[[1,1,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1]],8:[[1,1,1],[1,0,1],[1,1,1],[1,0,1],[1,1,1]],9:[[1,1,1],[1,0,1],[1,1,1],[0,0,1],[1,1,1]],":":[[0,0,0],[0,1,0],[0,0,0],[0,1,0],[0,0,0]]," ":[[,,],[,,],[,,],[,,],[,,]]};function draw(r,t,e,l,a=0,h=0){var f=[];t=t.toUpperCase();for(var n=0;n<t.length;n++){var v=letters[t.charAt(n)];v&&f.push(v)}r.fillStyle=l;var o=a;for(n=0;n<f.length;n++){v=f[n];for(var g=h,s=0,c=0;c<v.length;c++){for(var i=v[c],p=0;p<i.length;p++)i[p]&&r.fillRect(o+p*e,g,e,e);s=Math.max(s,i.length*e),g+=e}o+=e+s}}