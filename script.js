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
// Make our Hero
var chance = new Image();
chance.src = "hero.png";
var hero = {
	speed: 3,
	x: 230,
	y: 240
}
// Make our target monster
var monster = new Image();
monster.src = "monster.png"
var goblin = {
	x: Math.floor(Math.random()*390) + 60,
	y: Math.floor(Math.random()*360) + 60,
	speed: 1

}
// Make our avoid monster
var badMonster = new Image();
badMonster.src = "Goblin_Rogue.png"
var fireDemon1 = {
	x: Math.floor(Math.random()*390)+60,
	y: Math.floor(Math.random()*360)+60
}
var fireDemon2 = {
	x: Math.floor(Math.random()*390)+60,
	y: Math.floor(Math.random()*360)+60
}



var checkCapture = function(){
	var tolerance = 32;
	var goblinXLow = goblin.x - tolerance;
	var goblinXHigh = goblin.x + tolerance;
	var goblinYLow = goblin.y - tolerance;
	var goblinYHigh = goblin.y + tolerance;
	var fireDemon1XLow = fireDemon1.x - tolerance;
	var fireDemon1XHigh = fireDemon1.x + tolerance;
	var fireDemon1YLow = fireDemon1.y - tolerance;
	var fireDemon1YHigh = fireDemon1.y + tolerance;
	var fireDemon2XLow = fireDemon2.x - tolerance;
	var fireDemon2XHigh = fireDemon2.x + tolerance;
	var fireDemon2YLow = fireDemon2.y - tolerance;
	var fireDemon2YHigh = fireDemon2.y + tolerance;
	var i = 0;
	if((hero.x > goblinXLow)&&(hero.x < goblinXHigh)&&(hero.y > goblinYLow)&&(hero.y < goblinYHigh)){
		
		score++;
		spawnGoblin();

		do{
			spawnFireDemon();
			fireDemon1XLow = fireDemon1.x - tolerance;
			fireDemon1XHigh = fireDemon1.x + tolerance;
			fireDemon1YLow = fireDemon1.y - tolerance;
			fireDemon1YHigh = fireDemon1.y + tolerance;
			fireDemon2XLow = fireDemon2.x - tolerance;
			fireDemon2XHigh = fireDemon2.x + tolerance;
			fireDemon2YLow = fireDemon2.y - tolerance;
			fireDemon2YHigh = fireDemon2.y + tolerance;
			i++;
			console.log(i);
		}while(((hero.x > fireDemon1XLow)&&(hero.x < fireDemon1XHigh)&&(hero.y > fireDemon1YLow)&&(hero.y < fireDemon1YHigh))||((hero.x > fireDemon2XLow)&&(hero.x < fireDemon2XHigh)&&(hero.y > fireDemon2YLow)&&(hero.y < fireDemon2YHigh)))

	}
		if(((hero.x > fireDemon1XLow)&&(hero.x < fireDemon1XHigh)&&(hero.y > fireDemon1YLow)&&(hero.y < fireDemon1YHigh))||((hero.x > fireDemon2XLow)&&(hero.x < fireDemon2XHigh)&&(hero.y > fireDemon2YLow)&&(hero.y < fireDemon2YHigh))){
			if(score > highScore){
				highScore = score - 1;
			}
			alert('You Lose');
			keysDown = {};
			score = 1;
			hero.x = 230;
			hero.y = 240;
			spawnGoblin();
			spawnFireDemon();
		}
		if(hero.x > 452){
			hero.x = 26;
			console.log(hero.x)
		}else if(hero.x < 25){
			hero.x = 451;
		}else if(hero.y > 418){
			hero.y = 29;
		}else if(hero.y < 28){
			hero.y = 417;
		}	
		document.getElementById('score').innerHTML = "Score: "+(score-1);
		document.getElementById('high-score').innerHTML = "High Score: "+highScore;
	
}
function spawnGoblin(){
	goblin.x = Math.floor(Math.random()*390) + 60;
	goblin.y = Math.floor(Math.random()*360) + 60;
}

function spawnFireDemon(){
	fireDemon1.x = Math.floor(Math.random()*390) + 60;
	fireDemon1.y = Math.floor(Math.random()*360) + 60;
	fireDemon2.x = Math.floor(Math.random()*390) + 60;
	fireDemon2.y = Math.floor(Math.random()*360) + 60;
}
var turn = 1;

function moveGoblin(modifier){
	var direction = goblinDirectionChange();
	switch(direction){
		case 'up':
			goblin.y -= goblin.speed + modifier;
			break;
		case 'left':
			goblin.x -= goblin.speed + modifier;
			break;
		case 'right':
			goblin.x += goblin.speed + modifier;
			break;
		case 'down':
			goblin.y += goblin.speed + modifier;
	}
}

function goblinDirectionChange(){
	var direction;
	if(turn == 1){
		direction = 'up';
	}else if(turn == 2){
		direction = 'left';
	}else if(turn == 3){
		direction = 'down';
	}else if(turn == 4){
		direction = 'right';
	}
	return direction;
}
function turnGoblin(){
	turn++;
	if(turn>4){
		turn = 1;
	}
}
setInterval(turnGoblin,1000)
setInterval(checkCapture,1)
var update = function(modifier){
	if(38 in keysDown){
		// The user pressed the Up key!
		hero.y -= hero.speed + modifier
	}
	if(40 in keysDown){
		hero.y += hero.speed + modifier
	}
	if(37 in keysDown){
		hero.x -= hero.speed + modifier
	}
	if(39 in keysDown){
		hero.x += hero.speed + modifier
	}

}


//  Draw our stuff!!
	var then = Date.now();

var render = function(){
	if(bgReady){
		context.drawImage(bgImage,0,0)
		context.drawImage(chance,hero.x,hero.y)
		context.drawImage(monster,goblin.x,goblin.y)
		context.drawImage(badMonster,fireDemon1.x,fireDemon1.y)
		context.drawImage(badMonster,fireDemon2.x,fireDemon2.y)
	}
}

var main = function(){
	var now = Date.now();
	var delta = now - then;
	var mod = score/10;
	update(mod)
	moveGoblin(mod);
	render();
	requestAnimationFrame(main);
}

main()

bgImage.src = "background.png";



