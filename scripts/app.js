/**
 * Random number god
 * This code is an implementation of Alea algorithm; (C) 2010 Johannes Baagøe.
 * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
 */

/**
     * @namespace
     * This code is an implementation of the ROT.js cellular map generation by Ondřej Žára, https://github.com/ondras/rot.js
     * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
     */

/**
   * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
   * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
   * MIT license
   */

define("eventmanager",[""],function(){function e(e,n){topics.hasOwnProperty(e)||(topics[e]=[]);topics[e].push(n);return!0}function n(e,n){if(!topics.hasOwnProperty(e))return!1;for(var a=0,t=topics[e].length;t>a;a++)if(String(topics[e][a])===String(n)){topics[e].splice(a,1);return!0}return!1}function a(){var e=Array.prototype.slice.call(arguments),n=e.shift();if(!topics.hasOwnProperty(n))return!1;for(var a=0,t=topics[n].length;t>a;a++)topics[n][a].apply(void 0,e);return!0}topics={};return{subscribe:e,unsubscrive:n,publish:a,topics:topics}});define("actorList",["eventmanager","underscore"],function(e){var n=[],a=[];e.subscribe("actor.create",function(e){n.push(e)});e.subscribe("actor.update",function(e){var a=_.findWhere(n,{uuid:e.variables.uuid});_.merge(a,e)});e.subscribe("actor.delete",function(e){var t=_.findWhere(n,{uuid:e});a.push(t.variables.uuid);n=_.without(n,t)});var t=function(){return n},i=function(){return a},r=function(){a=[]};return{getCleanUpList:i,clearCleanUpList:r,getActorList:t}});define("RNG",[],function(){function e(){a(Date.now())}function n(){return l}function a(e){e=1>e?1/e:e;l=e;p=(e>>>0)*_;e=69069*e+1>>>0;f=e*_;e=69069*e+1>>>0;u=e*_;d=1}function t(){var e=2091639*p+d*_;p=f;f=u;d=0|e;u=e-d;return u}function i(e,n){do var a=2*t()-1,i=2*t()-1,r=a*a+i*i;while(r>1||0==r);var o=a*Math.sqrt(-2*Math.log(r)/r);return(e||0)+o*(n||1)}function r(){return 1+Math.floor(100*t())}function o(e){var n=0;for(var a in e)n+=e[a];var i=Math.floor(t()*n),r=0;for(var a in e){r+=e[a];if(r>i)return a}return null}function c(){return[p,f,u,d]}function s(e){p=e[0];f=e[1];u=e[2];d=e[3]}var l,p=0,f=0,u=0,d=0,_=2.3283064365386963e-10;e();return{getSeed:n,setSeed:a,getUniform:t,getNormal:i,getPercentage:r,getWeightedValue:o,getState:c,setState:s}});define("graphNode",[],function(){function e(e,n,a){this.data={};this.x=e;this.y=n;this.pos={x:e,y:n};this.type=a}var n={OPEN:0,WALL:1};e.prototype.toString=function(){return"["+this.x+" "+this.y+"]"};e.prototype.isWall=function(){return this.type==n.WALL};return e});define("graph",["graphNode"],function(e){function n(n){for(var a=[],t=0;t<n.length;t++){a[t]=[];for(var i=0,r=n[t];i<r.length;i++)a[t][i]=new e(t,i,r[i])}this.input=n;this.nodes=a}n.prototype.toString=function(){for(var e,n,a,t,i="\n",r=this.nodes,o=0,c=r.length;c>o;o++){e="";n=r[o];for(a=0,t=n.length;t>a;a++)e+=n[a].type+" ";i=i+e+"\n"}return i};return n});define("world",["RNG","underscore","graph","eventmanager"],function(e,n,a,t){function i(){y=n.compose(l,p,l,l,r,o)();g=new a(y)}function r(n){var a,t;for(a=0;h>a;a++)for(t=0;v>t;t++)n[a][t]=e.getUniform()<W?1:0;return n}function o(){var e,n,a=[];for(e=0;h>e;e++){a[e]=[];for(n=0;v>n;n++)a[e][n]=0}return a}function c(e,n,a){for(var t=0,i=0;i<k.length;i++){var r=k[i],o=n+r[0],c=a+r[1];0>o||o>=v||0>o||c>=v||(t+=1===e[o][c]?1:0)}return t}function s(e,n){var a={};a.x=(e-n)/2;a.y=(e+n)/2;return a}function l(e){for(var n=0,a=o(),t=0;h>t;t++){var i=1,r=0;if(6===L){i=2;r=t%2}for(var s=r;v>s;s+=i){n++;var l=e[s][t],p=c(e,s,t);l&&-1!==w.indexOf(p)?a[s][t]=1:l||-1===m.indexOf(p)||(a[s][t]=1)}}return a}function p(e){for(var n=[],a=2,t=0;h>t;t++)for(var i=0;a>i;i++){var r=t*a+i;n[r]=[];for(var o=0;v>o;o++)for(var c=0;a>c;c++){var s=o*a+c;n[r][s]=e[t][o]}}v*=a;h*=a;return n}function f(e,n){return e>=0&&n>=0&&v>e&&h>n?!1:!0}function u(e,n){return{x:e,y:n}}function d(e){return 0===y[e.y][e.x]?!0:!1}function _(){var e={x:0,y:0};1===T.up&&(e.y=e.y-1);1===T.down&&(e.y=e.y+1);1===T.left&&(e.x=e.x-1);1===T.right&&(e.x=e.x+1);if(0!==e.x||0!==e.y){e=u(P.x+e.x,P.y+e.y);P.x=e.x;P.y=e.y;t.publish("center.update.start")}else t.publish("center.update.stop")}var g,h=30,v=30,x=132,b=66,y=[],m=[5,6,7,8],w=[4,5,6,7,8],L=8,P=s(0,0),W=.47,k=[[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1]],T={up:0,down:0,left:0,right:0};t.subscribe("new.frame",function(){_()});t.subscribe("pan.up",function(e){T.up=e});t.subscribe("pan.down",function(e){T.down=e});t.subscribe("pan.left",function(e){T.left=e});t.subscribe("pan.right",function(e){T.right=e});i();return{tileWidth:x,tileHeight:b,inBoundTile:u,outOfBound:f,tileIsOpen:d,height:h,width:v,mapData:y,center:P,graph:g}});define("standardlib",["world","eventmanager"],function(e){function n(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}function a(){return n()+n()+"-"+n()+"-"+n()+"-"+n()+"-"+n()+n()+n()}function t(e,n){var a={};a.x=n+e;a.y=n-e;return a}function i(e,n){var a={};a.x=(e-n)/2;a.y=(e+n)/2;return a}function r(n,a){n-=e.width/2*e.tileWidth;var t=(n/(e.tileWidth/2)+a/(e.tileHeight/2))/2,i=(a/(e.tileHeight/2)-n/(e.tileWidth/2))/2;t=Math.floor(t);i=Math.floor(i);return{x:t,y:i}}function o(){}function c(e,n){var a=setInterval(function(){e()&&clearInterval(a)},1e3)}return{guid:a,isoToTwoD:t,twoDToIso:i,worldPosToGridPos:r,windowPosToGridPos:o,checkWait:c}});define("actor",["eventmanager","actorList","standardlib","world"],function(e,n,a,t){return function(n){var i={};i.init=function(){_.each(i.handlers,function(n,a){_.each(n,function(n,t){e[a](t,i[n])})});e.publish("actor.create",i.getInfo())};i.variables={coordinates:n.coordinates,width:t.tileWidth,height:t.tileHeight,uuid:a.guid(),direction:"down",hp:0,rendered:!1,canvas:{}};i.handlers={subscribe:{"actor.selected":"actorSelect"}};i.actorSelect=function(e){i.variables.selected=i.variables.uuid==e?!0:!1};i.getInfo=function(){return i};i.destroy=function(){e.publish("actor.delete",variables.uuid)};return i}});define("binaryHeap",[""],function(){function e(e){this.content=[];this.scoreFunction=e}e.prototype={push:function(e){this.content.push(e);this.sinkDown(this.content.length-1)},pop:function(){var e=this.content[0],n=this.content.pop();if(this.content.length>0){this.content[0]=n;this.bubbleUp(0)}return e},remove:function(e){var n=this.content.indexOf(e),a=this.content.pop();if(n!==this.content.length-1){this.content[n]=a;this.scoreFunction(a)<this.scoreFunction(e)?this.sinkDown(n):this.bubbleUp(n)}},size:function(){return this.content.length},rescoreElement:function(e){this.sinkDown(this.content.indexOf(e))},sinkDown:function(e){for(var n=this.content[e];e>0;){var a=(e+1>>1)-1,t=this.content[a];if(!(this.scoreFunction(n)<this.scoreFunction(t)))break;this.content[a]=n;this.content[e]=t;e=a}},bubbleUp:function(e){for(var n=this.content.length,a=this.content[e],t=this.scoreFunction(a);;){var i=e+1<<1,r=i-1,o=null;if(n>r){var c=this.content[r],s=this.scoreFunction(c);t>s&&(o=r)}if(n>i){var l=this.content[i],p=this.scoreFunction(l);(null===o?t:s)>p&&(o=i)}if(null===o)break;this.content[e]=this.content[o];this.content[o]=a;e=o}}};return e});define("astar",["binaryHeap"],function(e){var n={init:function(e){for(var n=0,a=e.length;a>n;n++)for(var t=0,i=e[n].length;i>t;t++){var r=e[n][t];r.f=0;r.g=0;r.h=0;r.cost=r.type;r.visited=!1;r.closed=!1;r.parent=null}},heap:function(){return new e(function(e){return e.f})},search:function(e,a,t,i,r){n.init(e);r=r||n.manhattan;i=!!i;var o=n.heap();o.push(a);for(;o.size()>0;){var c=o.pop();if(c===t){for(var s=c,l=[];s.parent;){l.push(s);s=s.parent}return l.reverse()}c.closed=!0;for(var p=n.neighbors(e,c,i),f=0,u=p.length;u>f;f++){var d=p[f];if(!d.closed&&!d.isWall()){var _=c.g+d.cost,g=d.visited;if(!g||_<d.g){d.visited=!0;d.parent=c;d.h=d.h||r(d.pos,t.pos);d.g=_;d.f=d.g+d.h;g?o.rescoreElement(d):o.push(d)}}}}return[]},manhattan:function(e,n){var a=Math.abs(n.x-e.x),t=Math.abs(n.y-e.y);return a+t},neighbors:function(e,n,a){var t=[],i=n.x,r=n.y;e[i-1]&&e[i-1][r]&&t.push(e[i-1][r]);e[i+1]&&e[i+1][r]&&t.push(e[i+1][r]);e[i]&&e[i][r-1]&&t.push(e[i][r-1]);e[i]&&e[i][r+1]&&t.push(e[i][r+1]);if(a){e[i-1]&&e[i-1][r-1]&&t.push(e[i-1][r-1]);e[i+1]&&e[i+1][r-1]&&t.push(e[i+1][r-1]);e[i-1]&&e[i-1][r+1]&&t.push(e[i-1][r+1]);e[i+1]&&e[i+1][r+1]&&t.push(e[i+1][r+1])}return t}};return n});define("actor.unit",["actor","eventmanager","astar","world","underscore"],function(e,n,a,t){return function(i){var r=e(i),o={path:[],focus:"",strenght:0,dexterity:0,intelligence:0,health:0,death:!1,hp:0,attack:10},c={"new.gamecycle":"move"};_.extend(r.variables,o);_.extend(r.handlers.subscribe,c);r.generatePath=function(){var e=t.graph.nodes[r.variables.coordinates.y][r.variables.coordinates.x],n=t.graph.nodes[r.variables.goal.y][r.variables.goal.x];r.variables.path=a.search(t.graph.nodes,e,n,!0)};r.move=function(){if(0!==r.variables.path.length){var e=_.first(r.variables.path);r.variables.path=_.rest(r.variables.path);var a={x:r.variables.coordinates.x-e.y,y:r.variables.coordinates.y-e.x};-1==a.x?r.variables.direction=0:1==a.x?r.variables.direction=2:-1==a.y?r.variables.direction=1:1==a.y&&(r.variables.direction=3);r.variables.coordinates={x:e.y,y:e.x};n.publish("command",{event:"actor.update",parameters:r})}};return r}});define("actor.unit.local",["actor.unit","eventmanager"],function(e){return function(n){var a=e(n),t={focus:"",state:"base"};_.extend(a.variables,t);var i={"map.click":"checkMapClick"};_.extend(a.handlers.subscribe,i);a.checkMapClick=function(e){if(a.variables.selected){a.variables.goal=e;a.generatePath()}};return a}});define("plane",["actor.unit.local","eventmanager"],function(e){return function(n){var a=e(n),t={focus:"",state:"base",direction:0,sprite:{center:{x:24,y:20},base:{0:["plane/base/Plane_Large_face0_0.png","plane/base/Plane_Large_face0_1.png","plane/base/Plane_Large_face0_2.png","plane/base/Plane_Large_face0_3.png"],1:["plane/base/Plane_Large_face1_0.png","plane/base/Plane_Large_face1_1.png","plane/base/Plane_Large_face1_2.png","plane/base/Plane_Large_face1_3.png"],2:["plane/base/Plane_Large_face2_0.png","plane/base/Plane_Large_face2_1.png","plane/base/Plane_Large_face2_2.png","plane/base/Plane_Large_face2_3.png"],3:["plane/base/Plane_Large_face3_0.png","plane/base/Plane_Large_face3_1.png","plane/base/Plane_Large_face3_2.png","plane/base/Plane_Large_face3_3.png"]},explode:{0:["plane/explode/color0_Plane_Large_face0_fiery_explode_0.png","plane/explode/color0_Plane_Large_face0_fiery_explode_1.png","plane/explode/color0_Plane_Large_face0_fiery_explode_2.png","plane/explode/color0_Plane_Large_face0_fiery_explode_3.png","plane/explode/color0_Plane_Large_face0_fiery_explode_4.png","plane/explode/color0_Plane_Large_face0_fiery_explode_5.png","plane/explode/color0_Plane_Large_face0_fiery_explode_6.png","plane/explode/color0_Plane_Large_face0_fiery_explode_7.png","plane/explode/color0_Plane_Large_face0_fiery_explode_8.png","plane/explode/color0_Plane_Large_face0_fiery_explode_9.png","plane/explode/color0_Plane_Large_face0_fiery_explode_10.png","plane/explode/color0_Plane_Large_face0_fiery_explode_11.png"],1:["plane/explode/color0_Plane_Large_face1_fiery_explode_0.png","plane/explode/color0_Plane_Large_face1_fiery_explode_1.png","plane/explode/color0_Plane_Large_face1_fiery_explode_2.png","plane/explode/color0_Plane_Large_face1_fiery_explode_3.png","plane/explode/color0_Plane_Large_face1_fiery_explode_4.png","plane/explode/color0_Plane_Large_face1_fiery_explode_5.png","plane/explode/color0_Plane_Large_face1_fiery_explode_6.png","plane/explode/color0_Plane_Large_face1_fiery_explode_7.png","plane/explode/color0_Plane_Large_face1_fiery_explode_8.png","plane/explode/color0_Plane_Large_face1_fiery_explode_9.png","plane/explode/color0_Plane_Large_face1_fiery_explode_10.png","plane/explode/color0_Plane_Large_face1_fiery_explode_11.png"],2:["plane/explode/color0_Plane_Large_face2_fiery_explode_0.png","plane/explode/color0_Plane_Large_face2_fiery_explode_1.png","plane/explode/color0_Plane_Large_face2_fiery_explode_2.png","plane/explode/color0_Plane_Large_face2_fiery_explode_3.png","plane/explode/color0_Plane_Large_face2_fiery_explode_4.png","plane/explode/color0_Plane_Large_face2_fiery_explode_5.png","plane/explode/color0_Plane_Large_face2_fiery_explode_6.png","plane/explode/color0_Plane_Large_face2_fiery_explode_7.png","plane/explode/color0_Plane_Large_face2_fiery_explode_8.png","plane/explode/color0_Plane_Large_face2_fiery_explode_9.png","plane/explode/color0_Plane_Large_face2_fiery_explode_10.png","plane/explode/color0_Plane_Large_face2_fiery_explode_11.png"],3:["plane/explode/color0_Plane_Large_face3_fiery_explode_0.png","plane/explode/color0_Plane_Large_face3_fiery_explode_1.png","plane/explode/color0_Plane_Large_face3_fiery_explode_2.png","plane/explode/color0_Plane_Large_face3_fiery_explode_3.png","plane/explode/color0_Plane_Large_face3_fiery_explode_4.png","plane/explode/color0_Plane_Large_face3_fiery_explode_5.png","plane/explode/color0_Plane_Large_face3_fiery_explode_6.png","plane/explode/color0_Plane_Large_face3_fiery_explode_7.png","plane/explode/color0_Plane_Large_face3_fiery_explode_8.png","plane/explode/color0_Plane_Large_face3_fiery_explode_9.png","plane/explode/color0_Plane_Large_face3_fiery_explode_10.png","plane/explode/color0_Plane_Large_face3_fiery_explode_11.png"]}},health:75,death:!1,hp:100};_.extend(a.variables,t);return a}});define("text!assetsList",[],function(){return'{\n  "0" : {\n    "name": "mapTiles",\n    "type": "atlas",\n    "configuration": "./art/panama.json",\n    "file": "./art/panama.png"\n  }\n}'});define("spriteSheet",[""],function(){var e=function(e,n){var a=[],t=e,i=n,r=function(){_.forEach(t.frames,function(e){var n=e,a=.5*-n.frame.w,t=.5*-n.frame.h;if(n.trimmed){a=n.spriteSourceSize.x-.5*n.sourceSize.w;t=n.spriteSourceSize.y-.5*n.sourceSize.h}o(n.filename,n.frame.x,n.frame.y,n.frame.w,n.frame.h,a,t)})},o=function(e,n,t,i,r,o,c){var s={id:e,x:n,y:t,w:i,h:r,cx:null===o?0:o,cy:null===c?0:c};a.push(s)};r();return{img:i,sprites:a}};return e});define("assetLoader",["spriteSheet","underscore","jQuery"],function(e){var n=[],a=function(a){var t=this;_.forEach(a.config,function(i){var r=$.Deferred();switch(i.type){case"atlas":t.loadAtlas(i,function(n){a.loaded.atlas.push({name:i.name,sprite:new e(n.configuration,n.file)});r.resolve()});break;case"music":}n.push(r)});return n},t=function(e,n){jQuery.getJSON(e.configuration,function(n){e.configuration=n}).then(function(){var a=new Image;a.src=e.file;a.onload=function(){console.log("imgloaded");e.file=a;n(e)}})};return{preloadassets:a,loadAtlas:t}});define("assets",["text!assetsList","assetLoader","eventmanager"],function(e,n){var a={config:{},loaded:{atlas:[],music:[]}};a.load=function(t){a.config=JSON.parse(e);var i=n.preloadassets(a);$.when(i).then(function(){console.log("assetsloaded");t()})};return a});define("commandQueue",[""],function(){function e(e){t.push(e)}function n(){t=[]}function a(){return t}var t=[];return{add:e,get:a,clear:n}});define("command",["commandQueue","eventmanager"],function(e,n){function a(n){e.add(n)}function t(){var a=e.get();_.forEach(a,function(e){n.publish(e.event,e.parameters)});e.clear()}n.subscribe("command",function(e){a(e)});n.subscribe("new.gamecycle",function(){t()})});define("gamecycle",["eventmanager","command"],function(e){function n(){a()}function a(){setTimeout(a,200);e.publish("new.gamecycle")}e.subscribe("game.init",function(){n()})});define("RequestAnimationFrame",[""],function(){window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/16.5)}}()});define("map",["eventmanager","world","standardlib","assets","underscore","jQuery"],function(e,n,a,t){function i(){console.log("startdrawing");f.canvas=document.getElementById("mapCanvas");f.context=f.canvas.getContext("2d");f.canvas.width=n.width*n.tileWidth;f.canvas.height=n.height*n.tileHeight;f.canvas.addEventListener("contextmenu",function(n){var t=f.canvas.relmouseCoordinates(n);t=a.worldPosToGridPos(t.x,t.y);e.publish("map.click",t)});f.canvas.addEventListener("mousedown",function(e){if(1==e.which){$(".ghost-select").addClass("ghost-active");$(".ghost-select").css({left:e.pageX,top:e.pageY});initialW=e.pageX;initialH=e.pageY;$(document).bind("mouseup",r);$(document).bind("mousemove",o)}});c();l()}function r(){$(document).unbind("mousemove",o);$(document).unbind("mouseup",r);var n=$(".ghost-select");e.publish("map.selection",{width:n.width(),height:n.height(),left:n.offset().left,top:n.offset().top});$(".ghost-select").css({left:0,top:0,width:0,height:0}).removeClass("ghost-active")}function o(e){var n=Math.abs(initialW-e.pageX),a=Math.abs(initialH-e.pageY);$(".ghost-select").css({width:n,height:a});e.pageX<=initialW&&e.pageY>=initialH?$(".ghost-select").css({left:e.pageX}):e.pageY<=initialH&&e.pageX>=initialW?$(".ghost-select").css({top:e.pageY}):e.pageY<initialH&&e.pageX<initialW&&$(".ghost-select").css({left:e.pageX,top:e.pageY})}function c(){f.context.clearRect(0,0,f.canvas.width,f.canvas.height);for(var e={x:0,y:0},a=0;n.height>a;a++)for(var t=0;n.width>t;t++)n.outOfBound(e.y+a,e.x+t)||s(1===n.mapData[e.y+a][e.x+t]?{sprite:"trees_2.png",x:e.x+t,y:e.y+a,correction:15}:{sprite:"landscapeTiles_066.png",x:e.x+t,y:e.y+a,correction:15})}function s(e){var i,r,o;_.findIndex(t.loaded.atlas,function(n){i=_.findWhere(n.sprite.sprites,{id:e.sprite});o=n.sprite.img;!_.isEmpty(n)});if(!_.isEmpty(i)){r=a.twoDToIso(e.x,e.y);r.x=r.x*n.tileWidth+f.canvas.width/2-(i.w-n.tileWidth)/2-n.tileWidth/2;r.y=r.y*n.tileHeight+(i.w/2-(i.h-e.correction));f.context.drawImage(o,i.x,i.y,i.w,i.h,r.x,r.y,i.w,i.h)}}function l(){var e=window.innerWidth/2,a=window.innerHeight/2,t={};t.x=-(n.center.x*n.tileWidth+f.canvas.width/2-e);t.y=-(n.center.y*n.tileHeight)+a;$(f.canvas).css("margin-left",t.x).css("margin-top",t.y)}function p(){l(n.center)}var f={};e.subscribe("new.frame",function(){p()});e.subscribe("game.init",function(){i()})});define("actors",["eventmanager","standardlib","world","actorList","assets","jQuery","underscore"],function(e,n,a,t,i){function r(){_.each(t.getCleanUpList(),function(e){$("canvas."+e.uuid).remove()});t.clearCleanUpList();_.each(t.getActorList(),function(n){if(l(n.variables.coordinates))if(n.variables.rendered)o(n);else{$(".ActorsWrapper").append('<canvas id="'+n.variables.uuid+'"></canvas>');n.variables.canvas=document.getElementById(n.variables.uuid);n.variables.canvas.context=n.variables.canvas.getContext("2d");n.variables.canvas.addEventListener("click",function(){e.publish("actor.selected",n.variables.uuid)});n.variables.rendered=!0;o(n)}else if(n.variables.rendered){$("canvas#"+n.variables.uuid).remove();n.variables.rendered=!1;n.variables.canvas=""}})}function o(e){c(e);s(e)}function c(e){var t=window.innerWidth/a.tileWidth,i=window.innerHeight/a.tileHeight,r=n.twoDToIso(e.variables.coordinates.x,e.variables.coordinates.y),o=a.center,c=r.y-o.y,s=(i/2-c-1)*a.tileHeight+20;$(e.variables.canvas).css("z-index",e.variables.coordinates.y).css("bottom",s);var l=r.x-(o.x-t/2),p=l*a.tileWidth-e.variables.sprite.center.x;$(e.variables.canvas).css("left",p)}function s(e){e.variables.canvas.context.clearRect(0,0,e.variables.canvas.width,e.variables.canvas.height);"undefined"==typeof e.variables.sprite[e.variables.state][e.variables.direction][e.variables.spriteIndex]&&(e.variables.spriteIndex=0);p({sprite:e.variables.sprite[e.variables.state][e.variables.direction][e.variables.spriteIndex],canvas:e.variables.canvas});e.variables.selected&&f({canvas:e.variables.canvas,health:e.variables.health,hp:e.variables.hp});e.variables.spriteIndex++}function l(e){var t=n.twoDToIso(e.x,e.y),i=a.center,r=Math.ceil(window.innerWidth/a.tileWidth),o=Math.ceil(window.innerHeight/a.tileHeight);return t.x>=i.x-r/2&&t.x<=i.x+r/2&&t.y>=i.y-o/2&&t.y<=i.y+o/2?!0:!1}function p(e){var n,a;_.findIndex(i.loaded.atlas,function(t){n=_.findWhere(t.sprite.sprites,{id:e.sprite});a=t.sprite.img;!_.isEmpty(t)});if(!_.isEmpty(n)){e.canvas.width=n.w;e.canvas.height=n.h+d;e.canvas.context.drawImage(a,n.x,n.y,n.w,n.h,0,d,n.w,n.h)}}function f(e){e.canvas.context.fillStyle="red";e.canvas.context.fillRect((e.canvas.width-40)/2,0,38,d-2);e.canvas.context.fillStyle="green";var n=e.health/e.hp;e.canvas.context.fillRect((e.canvas.width-40)/2,0,38*n,d-2)}function u(e){var i=window.innerWidth/2,r=window.innerHeight/2,o={};o.x=-(a.center.x*a.tileWidth+a.width*a.tileWidth/2-i);o.y=-(a.center.y*a.tileHeight)+r;var c=-o.x+e.left,s=-o.y+e.top,l=n.worldPosToGridPos(c,s);l=n.twoDToIso(l.x,l.y);var p=n.worldPosToGridPos(c+e.width,s+e.height);p=n.twoDToIso(p.x,p.y);_.each(t.getActorList(),function(e){var a=n.twoDToIso(e.variables.coordinates.x,e.variables.coordinates.y);e.variables.selected=a.x>=l.x&&a.x<=p.x&&a.y>=l.y&&a.y<=p.y?!0:!1})}var d=7.5;e.subscribe("new.frame",function(){r()});e.subscribe("center.update.start",function(){$(".ActorsWrapper").removeClass("no-panning")});e.subscribe("center.update.stop",function(){$(".ActorsWrapper").addClass("no-panning")});e.subscribe("map.selection",function(e){u(e)})});define("animate",["eventmanager","RequestAnimationFrame","map","actors"],function(e){function n(){e.publish("new.frame");window.setTimeout(n,100)}e.subscribe("game.init",function(){n()});return{}});define("mouse",["eventmanager"],function(e){HTMLCanvasElement.prototype.relmouseCoordinates=function(e){var n=0,a=0,t=0,i=0,r=this;do{n+=r.offsetLeft-r.scrollLeft;a+=r.offsetTop-r.scrollTop}while(r===r.offsetParent);t=e.pageX-n;i=e.pageY-a;return{x:t,y:i}};window.oncontextmenu=function(e){e.preventDefault();e.stopPropagation();return!1};var n=function(){};e.subscribe("game.init",function(){n()})});define("input",["eventmanager","mouse","keypress"],function(e){var n=[{keys:"up",prevent_repeat:!0,on_keydown:function(){e.publish("pan.up",1)},on_keyup:function(){e.publish("pan.up",0)}},{keys:"down",prevent_repeat:!0,on_keydown:function(){e.publish("pan.down",1)},on_keyup:function(){e.publish("pan.down",0)}},{keys:"left",prevent_repeat:!0,on_keydown:function(){e.publish("pan.left",1)},on_keyup:function(){e.publish("pan.left",0)}},{keys:"right",prevent_repeat:!0,on_keydown:function(){e.publish("pan.right",1)},on_keyup:function(){e.publish("pan.right",0)}}];keypress.register_many(n)});define("scripts/app",["plane","assets","eventmanager","gamecycle","animate","input"],function(e,n,a){n.load(function(){setTimeout(function(){a.publish("game.init")},250)});e({coordinates:{x:30,y:30}}).init();e({coordinates:{x:29,y:30}}).init();e({coordinates:{x:31,y:30}}).init();e({coordinates:{x:30,y:29}}).init();e({coordinates:{x:30,y:31}}).init();e({coordinates:{x:33,y:30}}).init();e({coordinates:{x:29,y:31}}).init();e({coordinates:{x:31,y:31}}).init();e({coordinates:{x:30,y:28}}).init()});