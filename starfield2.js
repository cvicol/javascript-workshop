function Starfield() {
	this.canvas = null;
	this.width = 0;
	this.height = 0;
	this.star = 1;
	this.stars = 100;
	this.minVelocity = 15;
	this.maxVelocity = 30;
	this.intervalId = 0;
	this.fps = 30;
}

Starfield.prototype.initialise = function(div) {
	//	Create the canvas.
	this.width = window.innerWidth;
	this.height = window.innerHeight;
    var self = this;
	window.addEventListener('resize', function resize(event) {
		self.width = window.innerWidth;
		self.height = window.innerHeight;
		self.canvas.width = self.width;
		self.canvas.height = self.height;
		self.draw();
	});
	var canvas = document.createElement('canvas');
	div.appendChild(canvas);
	this.canvas = canvas;
	this.canvas.width = this.width;
	this.canvas.height = this.height;
};

Starfield.prototype.start = function() {
	var stars = [];
	for(var i = 0; i< this.stars; i ++) {
		stars[i] = new Star(Math.random()*this.width, Math.random()*this.height, Math.random()*3+1, (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
    }
	this.stars = stars;
	var self = this;
	this.interval = setInterval(function(){ self.updatePosition();self.draw(); }, 1000/this.fps);
	
};

Starfield.prototype.updatePosition= function() {
	var dt = 1 / this.fps;	
	
	//	If the star has moved from the bottom of the screen, spawn it at the top.
	for(var i = 0; i< this.stars.length; i++) {
		var currentStar = this.stars[i];
		currentStar.y += dt * currentStar.velocity;
		if(currentStar.y > this.height) {
		      this.stars[i] = new Star(Math.random()*this.width, 0, Math.random()*3+1, 
		 		(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
			}
		}	
}

Starfield.prototype.draw = function() {
	//	Get the drawing context.
	var ctx = this.canvas.getContext("2d");
	//	Draw the background.
 	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, this.width, this.height);
	//	Draw stars.
	ctx.fillStyle = '#ffffff';
	for(var i=0; i< this.stars.length; i++) {
	   ctx.fillRect(this.stars[i].x, this.stars[i].y, this.stars[i].size, this.stars[i].size);
    }
	
}

function Star(x, y, size, velocity) {
	this.x = x;
	this.y = y; 
	this.size = size;
	this.velocity = velocity;
}