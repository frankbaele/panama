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

define("eventmanager",[""],function(){function e(e,t){topics.hasOwnProperty(e)||(topics[e]=[]);topics[e].push(t);return!0}function t(e,t){if(!topics.hasOwnProperty(e))return!1;for(var n=0,a=topics[e].length;a>n;n++)if(String(topics[e][n])===String(t)){topics[e].splice(n,1);return!0}return!1}function n(){var e=Array.prototype.slice.call(arguments),t=e.shift();if(!topics.hasOwnProperty(t))return!1;for(var n=0,a=topics[t].length;a>n;n++)topics[t][n].apply(void 0,e);return!0}topics={};return{subscribe:e,unsubscrive:t,publish:n,topics:topics}});define("scripts/app/controllers/uiController",["eventmanager"],function(e){ActorController=function(t){t.focus={};e.subscribe("actor.selected",function(n){t.focus.Uuid=n;e.subscribe("actor.object."+n,function(e){t.focus.actor=e;t.$digest()});e.publish("actor.getObject."+n)});e.subscribe("actor.unselected",function(n){if(t.focus.Uuid===n){e.unsubscrive("actor.object."+n,function(e){t.focus.actor=e;t.$digest()});t.focus.Uuid="";t.focus.actor="";t.$digest()}})};return["$scope","$interval",ActorController]});define("actorList",["eventmanager","underscore"],function(e){var t=[],n=[];e.subscribe("actor.create",function(e){e=e();t.push({uuid:e.variables.uuid,coordinates:e.variables.coordinates,sprite:e.variables.sprite,width:e.variables.width,height:e.variables.height,direction:e.variables.direction,state:e.variables.state,rendered:!1})});e.subscribe("actor.update",function(e){var n=_.findWhere(t,{uuid:e.variables.uuid});t=_.without(t,n);t.push({uuid:e.variables.uuid,coordinates:e.variables.coordinates,sprite:e.variables.sprite,rendered:n.rendered,direction:n.variables.direction,state:n.variables.state,spriteIndex:0})});e.subscribe("actor.delete",function(e){var a=_.findWhere(t,{uuid:e});n.push(a.variables.uuid);t=_.without(t,a)});var a=function(){return t},r=function(){return n},o=function(){n=[]};return{getCleanUpList:r,clearCleanUpList:o,getActorList:a}});define("RNG",[],function(){function e(){n(Date.now())}function t(){return _}function n(e){e=1>e?1/e:e;_=e;l=(e>>>0)*g;e=69069*e+1>>>0;u=e*g;e=69069*e+1>>>0;f=e*g;p=1}function a(){var e=2091639*l+p*g;l=u;u=f;p=0|e;f=e-p;return f}function r(e,t){do var n=2*a()-1,r=2*a()-1,o=n*n+r*r;while(o>1||0==o);var i=n*Math.sqrt(-2*Math.log(o)/o);return(e||0)+i*(t||1)}function o(){return 1+Math.floor(100*a())}function i(e){var t=0;for(var n in e)t+=e[n];var r=Math.floor(a()*t),o=0;for(var n in e){o+=e[n];if(o>r)return n}return null}function c(){return[l,u,f,p]}function s(e){l=e[0];u=e[1];f=e[2];p=e[3]}var _,l=0,u=0,f=0,p=0,g=2.3283064365386963e-10;e();return{getSeed:t,setSeed:n,getUniform:a,getNormal:r,getPercentage:o,getWeightedValue:i,getState:c,setState:s}});define("graphNode",[],function(){function e(e,t,n){this.data={};this.x=e;this.y=t;this.pos={x:e,y:t};this.type=n}var t={OPEN:0,WALL:1};e.prototype.toString=function(){return"["+this.x+" "+this.y+"]"};e.prototype.isWall=function(){return this.type==t.WALL};return e});define("graph",["graphNode"],function(e){function t(t){for(var n=[],a=0;a<t.length;a++){n[a]=[];for(var r=0,o=t[a];r<o.length;r++)n[a][r]=new e(a,r,o[r])}this.input=t;this.nodes=n}t.prototype.toString=function(){for(var e,t,n,a,r="\n",o=this.nodes,i=0,c=o.length;c>i;i++){e="";t=o[i];for(n=0,a=t.length;a>n;n++)e+=t[n].type+" ";r=r+e+"\n"}return r};return t});define("world",["RNG","underscore","graph","eventmanager"],function(e,t,n,a){function r(){k=t.compose(_,l,_,_,o,i)();d=new n(k)}function o(t){var n,a;for(n=0;h>n;n++)for(a=0;v>a;a++)t[n][a]=e.getUniform()<x?1:0;return t}function i(){var e,t,n=[];for(e=0;h>e;e++){n[e]=[];for(t=0;v>t;t++)n[e][t]=0}return n}function c(e,t,n){for(var a=0,r=0;r<W.length;r++){var o=W[r],i=t+o[0],c=n+o[1];0>i||i>=v||0>i||c>=v||(a+=1===e[i][c]?1:0)}return a}function s(e,t){var n={};n.x=(e-t)/2;n.y=(e+t)/2;return n}function _(e){for(var t=0,n=i(),a=0;h>a;a++){var r=1,o=0;if(6===L){r=2;o=a%2}for(var s=o;v>s;s+=r){t++;var _=e[s][a],l=c(e,s,a);_&&-1!==w.indexOf(l)?n[s][a]=1:_||-1===y.indexOf(l)||(n[s][a]=1)}}return n}function l(e){for(var t=[],n=2,a=0;h>a;a++)for(var r=0;n>r;r++){var o=a*n+r;t[o]=[];for(var i=0;v>i;i++)for(var c=0;n>c;c++){var s=i*n+c;t[o][s]=e[a][i]}}v*=n;h*=n;return t}function u(e,t){return e>=0&&t>=0&&v>e&&h>t?!1:!0}function f(e,t){return{x:e,y:t}}function p(e){return 0===k[e.y][e.x]?!0:!1}function g(){var e={x:0,y:0};1===I.up&&(e.y=e.y-.5);1===I.down&&(e.y=e.y+.5);1===I.left&&(e.x=e.x-.5);1===I.right&&(e.x=e.x+.5);if(0!==e.x||0!==e.y){e=f(P.x+e.x,P.y+e.y);P.x=e.x;P.y=e.y}}var d,h=30,v=30,m=132,b=66,k=[],y=[5,6,7,8],w=[4,5,6,7,8],L=8,P=s(v,h),x=.47,C={x:50,y:50},W=[[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1]],I={up:0,down:0,left:0,right:0};a.subscribe("new.frame",function(){g()});a.subscribe("pan.up",function(e){I.up=e});a.subscribe("pan.down",function(e){I.down=e});a.subscribe("pan.left",function(e){I.left=e});a.subscribe("pan.right",function(e){I.right=e});r();return{tileWidth:m,tileHeight:b,inBoundTile:f,outOfBound:u,tileIsOpen:p,height:h,width:v,mapData:k,center:P,padding:C,graph:d}});define("standardlib",["world","eventmanager"],function(e){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}function n(){return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()}function a(e,t){var n={};n.x=t+e;n.y=t-e;return n}function r(e,t){var n={};n.x=(e-t)/2;n.y=(e+t)/2;return n}function o(t,n){var a=(t/(e.tileWidth/2)+n/(e.tileHeight/2))/2-e.width/2,r=(n/(e.tileHeight/2)-t/(e.tileWidth/2))/2+e.height/2;a=Math.floor(a);r=Math.floor(r);return{x:a,y:r}}function i(e,t){var n=setInterval(function(){e()&&clearInterval(n)},1e3)}return{guid:n,isoToTwoD:a,twoDToIso:r,worldPosToGridPos:o,checkWait:i}});define("actor",["eventmanager","actorList","standardlib","world"],function(e,t,n,a){return function(t){var r={};r.init=function(){_.each(r.handlers,function(t,n){_.each(t,function(t,a){e[n](a,r[t])})})};r.variables={coordinates:t.coordinates,width:a.tileWidth,height:a.tileHeight,uuid:n.guid(),direction:"down",hp:0};r.handlers={publish:{"actor.create":"getInfo"},subscribe:{"mouse.click.left":"checkLeftClick","actor.selected":"checkFocus"}};r.checkLeftClick=function(t){if(t.x==r.variables.coordinates.x&&t.y==r.variables.coordinates.y){r.variables.selected=!0;e.publish("actor.selected",r.variables.uuid)}else if(r.variables.selected){r.variables.selected=!1;e.publish("actor.unselected",r.variables.uuid)}};r.checkFocus=function(){};r.getInfo=function(){return r};r.destroy=function(){e.publish("actor.delete",variables.uuid)};return r}});define("binaryHeap",[""],function(){function e(e){this.content=[];this.scoreFunction=e}e.prototype={push:function(e){this.content.push(e);this.sinkDown(this.content.length-1)},pop:function(){var e=this.content[0],t=this.content.pop();if(this.content.length>0){this.content[0]=t;this.bubbleUp(0)}return e},remove:function(e){var t=this.content.indexOf(e),n=this.content.pop();if(t!==this.content.length-1){this.content[t]=n;this.scoreFunction(n)<this.scoreFunction(e)?this.sinkDown(t):this.bubbleUp(t)}},size:function(){return this.content.length},rescoreElement:function(e){this.sinkDown(this.content.indexOf(e))},sinkDown:function(e){for(var t=this.content[e];e>0;){var n=(e+1>>1)-1,a=this.content[n];if(!(this.scoreFunction(t)<this.scoreFunction(a)))break;this.content[n]=t;this.content[e]=a;e=n}},bubbleUp:function(e){for(var t=this.content.length,n=this.content[e],a=this.scoreFunction(n);;){var r=e+1<<1,o=r-1,i=null;if(t>o){var c=this.content[o],s=this.scoreFunction(c);a>s&&(i=o)}if(t>r){var _=this.content[r],l=this.scoreFunction(_);(null===i?a:s)>l&&(i=r)}if(null===i)break;this.content[e]=this.content[i];this.content[i]=n;e=i}}};return e});define("astar",["binaryHeap"],function(e){var t={init:function(e){for(var t=0,n=e.length;n>t;t++)for(var a=0,r=e[t].length;r>a;a++){var o=e[t][a];o.f=0;o.g=0;o.h=0;o.cost=o.type;o.visited=!1;o.closed=!1;o.parent=null}},heap:function(){return new e(function(e){return e.f})},search:function(e,n,a,r,o){t.init(e);o=o||t.manhattan;r=!!r;var i=t.heap();i.push(n);for(;i.size()>0;){var c=i.pop();if(c===a){for(var s=c,_=[];s.parent;){_.push(s);s=s.parent}return _.reverse()}c.closed=!0;for(var l=t.neighbors(e,c,r),u=0,f=l.length;f>u;u++){var p=l[u];if(!p.closed&&!p.isWall()){var g=c.g+p.cost,d=p.visited;if(!d||g<p.g){p.visited=!0;p.parent=c;p.h=p.h||o(p.pos,a.pos);p.g=g;p.f=p.g+p.h;d?i.rescoreElement(p):i.push(p)}}}}return[]},manhattan:function(e,t){var n=Math.abs(t.x-e.x),a=Math.abs(t.y-e.y);return n+a},neighbors:function(e,t,n){var a=[],r=t.x,o=t.y;e[r-1]&&e[r-1][o]&&a.push(e[r-1][o]);e[r+1]&&e[r+1][o]&&a.push(e[r+1][o]);e[r]&&e[r][o-1]&&a.push(e[r][o-1]);e[r]&&e[r][o+1]&&a.push(e[r][o+1]);if(n){e[r-1]&&e[r-1][o-1]&&a.push(e[r-1][o-1]);e[r+1]&&e[r+1][o-1]&&a.push(e[r+1][o-1]);e[r-1]&&e[r-1][o+1]&&a.push(e[r-1][o+1]);e[r+1]&&e[r+1][o+1]&&a.push(e[r+1][o+1])}return a}};return t});define("actor.unit",["actor","eventmanager","astar","world","underscore"],function(e,t,n,a){return function(r){var o=e(r),i={path:[],focus:"",strenght:0,dexterity:0,intelligence:0,health:0,death:!1,hp:50,attack:10},c={"new.gamecycle":"move"};_.extend(o.variables,i);_.extend(o.handlers.subscribe,c);o.generatePath=function(){var e=a.graph.nodes[o.variables.coordinates.y][o.variables.coordinates.x],t=a.graph.nodes[o.variables.goal.y][o.variables.goal.x];o.variables.path=n.search(a.graph.nodes,e,t,!0)};o.move=function(){if(0!==o.variables.path.length){var e=_.first(o.variables.path);o.variables.path=_.rest(o.variables.path);o.variables.coordinates={x:e.y,y:e.x};t.publish("command",{event:"actor.update",parameters:o})}};return o}});define("actor.unit.local",["actor.unit","eventmanager"],function(e){return function(t){var n=e(t),a={focus:"",state:"base",sprite:{base:{up:["color0_Plane_Large_face0_attack_0_0.png","color0_Plane_Large_face0_attack_0_1.png","color0_Plane_Large_face0_attack_0_2.png","color0_Plane_Large_face0_attack_0_3.png","color0_Plane_Large_face0_attack_0_4.png","color0_Plane_Large_face0_attack_0_5.png","color0_Plane_Large_face0_attack_0_6.png","color0_Plane_Large_face0_attack_0_7.png","color0_Plane_Large_face0_attack_0_8.png","color0_Plane_Large_face0_attack_0_9.png","color0_Plane_Large_face0_attack_0_10.png","color0_Plane_Large_face0_attack_0_11.png","color0_Plane_Large_face0_attack_0_12.png","color0_Plane_Large_face0_attack_0_13.png","color0_Plane_Large_face0_attack_0_14.png","color0_Plane_Large_face0_attack_0_15.png"],up_right:["color0_Plane_Large_face0_attack_0_0.png","color0_Plane_Large_face0_attack_0_1.png","color0_Plane_Large_face0_attack_0_2.png","color0_Plane_Large_face0_attack_0_3.png","color0_Plane_Large_face0_attack_0_4.png","color0_Plane_Large_face0_attack_0_5.png","color0_Plane_Large_face0_attack_0_6.png","color0_Plane_Large_face0_attack_0_7.png","color0_Plane_Large_face0_attack_0_8.png","color0_Plane_Large_face0_attack_0_9.png","color0_Plane_Large_face0_attack_0_10.png","color0_Plane_Large_face0_attack_0_11.png","color0_Plane_Large_face0_attack_0_12.png","color0_Plane_Large_face0_attack_0_13.png","color0_Plane_Large_face0_attack_0_14.png","color0_Plane_Large_face0_attack_0_15.png"],right:["color0_Plane_Large_face0_attack_0_0.png","color0_Plane_Large_face0_attack_0_1.png","color0_Plane_Large_face0_attack_0_2.png","color0_Plane_Large_face0_attack_0_3.png","color0_Plane_Large_face0_attack_0_4.png","color0_Plane_Large_face0_attack_0_5.png","color0_Plane_Large_face0_attack_0_6.png","color0_Plane_Large_face0_attack_0_7.png","color0_Plane_Large_face0_attack_0_8.png","color0_Plane_Large_face0_attack_0_9.png","color0_Plane_Large_face0_attack_0_10.png","color0_Plane_Large_face0_attack_0_11.png","color0_Plane_Large_face0_attack_0_12.png","color0_Plane_Large_face0_attack_0_13.png","color0_Plane_Large_face0_attack_0_14.png","color0_Plane_Large_face0_attack_0_15.png"],down_right:["color0_Plane_Large_face0_attack_0_0.png","color0_Plane_Large_face0_attack_0_1.png","color0_Plane_Large_face0_attack_0_2.png","color0_Plane_Large_face0_attack_0_3.png"],down:["color0_Plane_Large_face0_attack_0_0.png","color0_Plane_Large_face0_attack_0_1.png","color0_Plane_Large_face0_attack_0_2.png","color0_Plane_Large_face0_attack_0_3.png","color0_Plane_Large_face0_attack_0_4.png","color0_Plane_Large_face0_attack_0_5.png","color0_Plane_Large_face0_attack_0_6.png","color0_Plane_Large_face0_attack_0_7.png","color0_Plane_Large_face0_attack_0_8.png","color0_Plane_Large_face0_attack_0_9.png","color0_Plane_Large_face0_attack_0_10.png","color0_Plane_Large_face0_attack_0_11.png","color0_Plane_Large_face0_attack_0_12.png","color0_Plane_Large_face0_attack_0_13.png","color0_Plane_Large_face0_attack_0_14.png","color0_Plane_Large_face0_attack_0_15.png"],down_left:["color0_Plane_Large_face0_attack_0_0.png","color0_Plane_Large_face0_attack_0_1.png","color0_Plane_Large_face0_attack_0_2.png","color0_Plane_Large_face0_attack_0_3.png"],left:["color0_Plane_Large_face0_attack_0_0.png","color0_Plane_Large_face0_attack_0_1.png","color0_Plane_Large_face0_attack_0_2.png","color0_Plane_Large_face0_attack_0_3.png"],up_left:["color0_Plane_Large_face0_attack_0_0.png","color0_Plane_Large_face0_attack_0_1.png","color0_Plane_Large_face0_attack_0_2.png","color0_Plane_Large_face0_attack_0_3.png"]}}};_.extend(n.variables,a);var r={"map.click":"checkMapClick"};_.extend(n.handlers.subscribe,r);n.checkMapClick=function(e){if(n.selected){n.variables.goal=e;n.generatePath()}};return n}});define("scripts/app/controllers/gameController",["eventmanager","actor.unit.local"],function(e,t){gameController=function(){var e=t({coordinates:{x:30,y:30}});e.init();var n=t({coordinates:{x:25,y:28}});n.init()};return["$scope",gameController]});define("scripts/app/controllers/CanvasController",["eventmanager"],function(e){canvasController=function(){e.publish("game.init")};return["$scope",canvasController]});define("commandQueue",[""],function(){function e(e){a.push(e)}function t(){a=[]}function n(){return a}var a=[];return{add:e,get:n,clear:t}});define("command",["commandQueue","eventmanager"],function(e,t){function n(t){e.add(t)}function a(){var n=e.get();_.forEach(n,function(e){t.publish(e.event,e.parameters)});e.clear()}t.subscribe("command",function(e){n(e)});t.subscribe("new.gamecycle",function(){a()})});define("gamecycle",["eventmanager","command"],function(e){function t(){n()}function n(){setTimeout(n,200);e.publish("new.gamecycle")}e.subscribe("game.init",function(){t()})});define("text!assetsList",[],function(){return'{\n  "0" : {\n    "name": "mapTiles",\n    "type": "atlas",\n    "configuration": "./art/panama.json",\n    "file": "./art/panama.png"\n  }\n}'});define("spriteSheet",[""],function(){var e=function(e,t){var n=[],a=e,r=t,o=function(){_.forEach(a.frames,function(e){var t=e,n=.5*-t.frame.w,a=.5*-t.frame.h;if(t.trimmed){n=t.spriteSourceSize.x-.5*t.sourceSize.w;a=t.spriteSourceSize.y-.5*t.sourceSize.h}i(t.filename,t.frame.x,t.frame.y,t.frame.w,t.frame.h,n,a)})},i=function(e,t,a,r,o,i,c){var s={id:e,x:t,y:a,w:r,h:o,cx:null===i?0:i,cy:null===c?0:c};n.push(s)};o();return{img:r,sprites:n}};return e});define("assetLoader",["spriteSheet","underscore","jQuery"],function(e){var t=function(t){var n=this;_.forEach(t.config,function(a){n.queue++;switch(a.type){case"atlas":n.loadAtlas(a,function(r){t.loaded.atlas.push({name:a.name,sprite:new e(r.configuration,r.file)});n.queue--});break;case"music":}});return t},n=function(){return this.queue>0?!1:!0},a=function(e,t){jQuery.getJSON(e.configuration,function(t){e.configuration=t}).then(function(){var n=new Image;n.src=e.file;e.file=n;t(e)})};return{preloadassets:t,preloadComplete:n,loadAtlas:a}});define("assets",["text!assetsList","assetLoader","eventmanager"],function(e,t,n){function a(){var e=setInterval(function(){if(t.preloadComplete()){n.publish("assets.loaded");clearInterval(e)}},1e3)}var r={config:{},loaded:{atlas:[],music:[]}};r.config=JSON.parse(e);r=t.preloadassets(r);a();return r});define("RequestAnimationFrame",[""],function(){window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/16.5)}}()});define("canvas",["eventmanager","world","standardlib"],function(e,t,n){var a={},r=function(){a.canvas=document.getElementById("mapCanvas");a.context=a.canvas.getContext("2d");a.canvas.width=t.width*t.tileWidth+2*t.padding.x;a.canvas.height=t.height*t.tileHeight+2*t.padding.y;a.canvas.addEventListener("contextmenu",function(t){var r=a.canvas.relmouseCoordinates(t);r=n.worldPosToGridPos(r.x,r.y,a.canvas.width);e.publish("map.click",r)},!1)};e.subscribe("game.init",function(){r()});return{terrain:a}});define("map",["eventmanager","canvas","world","standardlib","assets","underscore","jQuery"],function(e,t,n,a,r){function o(){i();s()}function i(){t.terrain.context.clearRect(0,0,t.terrain.canvas.width,t.terrain.canvas.height);for(var e={x:0,y:0},a=0;n.height>a;a++)for(var r=0;n.width>r;r++)n.outOfBound(e.y+a,e.x+r)||c(1===n.mapData[e.y+a][e.x+r]?{sprite:"trees_2.png",x:e.x+r,y:e.y+a}:{sprite:"landscapeTiles_067.png",x:e.x+r,y:e.y+a})}function c(e){var o,i,c;_.findIndex(r.loaded.atlas,function(t){o=_.findWhere(t.sprite.sprites,{id:e.sprite});c=t.sprite.img;!_.isEmpty(t)});if(!_.isEmpty(o)){i=a.twoDToIso(e.x,e.y);i.x=i.x*n.tileWidth+t.terrain.canvas.width/2-(o.w-n.tileWidth)/2-n.tileWidth/2;i.y=n.padding.y+i.y*n.tileHeight+(o.w/2-o.h);t.terrain.context.drawImage(c,o.x,o.y,o.w,o.h,i.x,i.y,o.w,o.h)}}function s(){var e=window.innerWidth/2,a=window.innerHeight/2,r={};r.x=-(n.center.x*n.tileWidth+t.terrain.canvas.width/2-e);r.y=-((n.center.y-1)*n.tileHeight+n.tileHeight/2)+a;$(t.terrain.canvas).css("margin-left",r.x).css("margin-top",r.y)}function l(){s(n.center)}e.subscribe("new.frame",function(){l()});e.subscribe("game.init",function(){o()})});define("actors",["eventmanager","standardlib","world","actorList","assets","jQuery","underscore"],function(e,t,n,a,r){function o(){_.each(a.getCleanUpList(),function(e){$("canvas."+e.uuid).remove()});a.clearCleanUpList();_.each(a.getActorList(),function(e){if(l(e.coordinates))if(e.rendered)i(e);else{$(".ActorsWrapper").append('<canvas id="'+e.uuid+'"></canvas>');e.canvas=document.getElementById(e.uuid);e.canvas.width=e.width;e.canvas.height=e.height;e.canvas.context=e.canvas.getContext("2d");e.rendered=!0;i(e)}else if(e.rendered){$("canvas#"+e.uuid).remove();e.rendered=!1;e.canvas=""}})}function i(e){c(e);s(e)}function c(e){var a=window.innerWidth/n.tileWidth,r=window.innerHeight/n.tileHeight,o=t.twoDToIso(e.coordinates.x,e.coordinates.y),i=n.center,c=o.y-i.y+r/2,s=c*n.tileHeight-n.tileHeight/2-n.padding.y;$(e.canvas).css("top",s);var _=o.x-(i.x-a/2),l=_*n.tileWidth-n.tileWidth/2;$(e.canvas).css("left",l)}function s(e){"undefined"==typeof e.sprite[e.state][e.direction][e.spriteIndex]&&(e.spriteIndex=0);u({sprite:e.sprite[e.state][e.direction][e.spriteIndex],canvas:e.canvas});e.spriteIndex++}function l(e){var a=t.twoDToIso(e.x,e.y),r=n.center,o=Math.ceil(window.innerWidth/(n.tileWidth/2)),i=Math.ceil(window.innerHeight/(n.tileHeight/2));return a.x>=r.x-o/2&&a.x<=r.x+o/2&&a.y>=r.y-i/2&&a.y<=r.y+i/2?!0:!1}function u(e){var t,n;_.findIndex(r.loaded.atlas,function(a){t=_.findWhere(a.sprite.sprites,{id:e.sprite});n=a.sprite.img;!_.isEmpty(a)});if(!_.isEmpty(t)){e.canvas.context.clearRect(0,0,e.canvas.width,e.canvas.height);e.canvas.context.drawImage(n,t.x,t.y,t.w,t.h,0,0,t.w,t.h)}}e.subscribe("new.frame",function(){o()})});define("animate",["eventmanager","RequestAnimationFrame","map","actors"],function(e){function t(){e.publish("new.frame");window.setTimeout(t,50)}e.subscribe("game.init",function(){t()});return{}});define("mouse",["canvas","eventmanager"],function(e,t){HTMLCanvasElement.prototype.relmouseCoordinates=function(e){var t=0,n=0,a=0,r=0,o=this;do{t+=o.offsetLeft-o.scrollLeft;n+=o.offsetTop-o.scrollTop}while(o===o.offsetParent);a=e.pageX-t;r=e.pageY-n;return{x:a,y:r}};var n=function(){};t.subscribe("game.init",function(){n()})});define("input",["eventmanager","mouse","keypress"],function(e){var t=[{keys:"up",prevent_repeat:!0,on_keydown:function(){e.publish("pan.up",1)},on_keyup:function(){e.publish("pan.up",0)}},{keys:"down",prevent_repeat:!0,on_keydown:function(){e.publish("pan.down",1)},on_keyup:function(){e.publish("pan.down",0)}},{keys:"left",prevent_repeat:!0,on_keydown:function(){e.publish("pan.left",1)},on_keyup:function(){e.publish("pan.left",0)}},{keys:"right",prevent_repeat:!0,on_keydown:function(){e.publish("pan.right",1)},on_keyup:function(){e.publish("pan.right",0)}}];keypress.register_many(t)});define("scripts/app",["scripts/app/controllers/uiController","scripts/app/controllers/gameController","scripts/app/controllers/CanvasController","angular","angular-ui-router","gamecycle","assets","animate","input"],function(e,t,n){var a=angular.module("panama",["ui.router"]);a.config(["$stateProvider",function(e){e.state("menu",{templateUrl:"templates/menu.html"}).state("game",{"abstract":!0,templateUrl:"templates/game.html",controller:"gameController"}).state("game.content",{views:{canvas:{templateUrl:"templates/game.canvas.html",controller:"canvasController"},actor:{templateUrl:"templates/game.ui.html",controller:"uiController"}}})}]);a.controller("uiController",e);a.controller("gameController",t);a.controller("canvasController",n);a.run(["$state",function(e){e.transitionTo("game.content")}]);angular.element(document).ready(function(){angular.bootstrap(document,["panama"])});return a});