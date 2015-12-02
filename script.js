var score = 1;
// Creat the canvas with JS.
var highScore = 0;
var canvas = document.createElement('canvas');

// create context so that we can target the canvas
var context = canvas.getContext('2d');
// Set canvas width and height
canvas.width = 512;
canvas.height = 480;
// put the canvas element in the DOM
var scoreContainer = document.getElementById('score');
scoreContainer.innerHTML = "Score: "+(score - 1);

document.body.appendChild(canvas)

// Make a background Image!

var bgImage = new Image();
var bgReady = false;
bgImage.onload = function(){
	bgReady = true;
}
// handler for keyboard actions.
// We need a listener.

var keysDown = {};

addEventListener('keydown', function (event) {

	keysDown[event.keyCode] = true;

});

addEventListener('keyup', function (event){
	delete keysDown[event.keyCode]
})
// X lower out of bounds = 25;
// X upper out of bounds = 452;
// Y lower out of bounds = 28;
// Y upper out of bounds = 418;
var checkCapture = function(){
	var tolerance = 35;
	var goblinXLow = goblin.x - tolerance;
	var goblinXHigh = goblin.x + tolerance;
	var goblinYLow = goblin.y - tolerance;
	var goblinYHigh = goblin.y + tolerance;
	if((hero.x > goblinXLow)&&(hero.x < goblinXHigh)&&(hero.y > goblinYLow)&&(hero.y < goblinYHigh)){
		
		score++;
		goblin.x = Math.floor(Math.random()*390) + 60;
		goblin.y = Math.floor(Math.random()*360) + 60;
		fireDemon.x = Math.floor(Math.random()*390) + 60;
		fireDemon.y = Math.floor(Math.random()*360) + 60;
		

	}
	if(hero.x > 452){
		hero.x = 26;
	}else if(hero.x < 25){
		hero.x = 451;
	}else if(hero.y > 418){
		hero.y = 29;
	}else if(hero.y < 28){
		hero.y = 417;
	}
	document.getElementById('score').innerHTML = "Score: "+(score-1);
}
var checkDeath = function(){
	var tolerance = 30;
	var fireDemonXLow = fireDemon.x - tolerance;
	var fireDemonXHigh = fireDemon.x + tolerance;
	var fireDemonYLow = fireDemon.y - tolerance;
	var fireDemonYHigh = fireDemon.y + tolerance;
	if((hero.x > fireDemonXLow)&&(hero.x < fireDemonXHigh)&&(hero.y > fireDemonYLow)&&(hero.y < fireDemonYHigh)){
		if(score > highScore){
			highScore = score - 1;
		}
		score = 1;
		hero.x = 230;
		hero.y = 240;
		goblin.x = Math.floor(Math.random()*390) + 60;
		goblin.y = Math.floor(Math.random()*360) + 60;
		fireDemon.x = Math.floor(Math.random()*390) + 60;
		fireDemon.y = Math.floor(Math.random()*360) + 60;
		document.getElementById('score').innerHTML = "Score: "+(score-1);
		document.getElementById('high-score').innerHTML = "High Score: "+highScore;
	}
}

setInterval(checkCapture,1)
setInterval(checkDeath,1)
var update = function(modifier){
	if(38 in keysDown){
		// The user pressed the Up key!
		hero.y -= hero.speed * modifier
	}
	if(40 in keysDown){
		hero.y += hero.speed * modifier
	}
	if(37 in keysDown){
		hero.x -= hero.speed * modifier
	}
	if(39 in keysDown){
		hero.x += hero.speed * modifier
	}

}


//  Draw our stuff!!
	var then = Date.now();

var render = function(){
	if(bgReady){
		context.drawImage(bgImage,0,0)
		context.drawImage(chance,hero.x,hero.y)
		context.drawImage(monster,goblin.x,goblin.y)
		context.drawImage(badMonster,fireDemon.x,fireDemon.y)
	}
}

var main = function(){
	var now = Date.now();
	var delta = now - then;
	update(score/1000)
	render();
	requestAnimationFrame(main);
}

main()

bgImage.src = "background.png";

// Make our Hero
var chance = new Image();
chance.src = "hero.png";
var hero = {
	speed: 500,
	x: 230,
	y: 240
}
// Make our target monster
var monster = new Image();
monster.src = "monster.png"
var goblin = {
	x: Math.floor(Math.random()*390) + 60,
	y: Math.floor(Math.random()*360) + 60

}
// Make our avoid monster
var badMonster = new Image();
badMonster.src = "Goblin_Rogue.png"
var fireDemon = {
	x: Math.floor(Math.random()*390)+60,
	y: Math.floor(Math.random()*360)+60
}


