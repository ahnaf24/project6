document.addEventListener('load', function(){
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 800;

class Game {
    constructor(ctx, width, height){
        this.ctx =ctx;
        this.width = width;
        this.height = height;
        this.enemies = [];
        this.enemyInterval = 100;
        this.enemyTImer =0;
        this.enemyTypes = ['worm', 'ghost', spider];
    }
    update(deltaTime){
        this.enemies = this.enemies.filter(object => !object.markedForDelation);
        if(this.enemyTImer > this.enemyInterval){
           this.#addNewEnemy();
           this.enemyTImer = 0;
           console.log(this.enemies)
        }else {
            this.enemyTimer += deltaTime;
        }
       
        this.enemies.forEach(object => object.update());
    }
    draw(){
        this.enemies.forEach(object => object.draw());
    }
    
    #addNewEnemy(){
        const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
        if(randomEnemy == 'worm') this.enemies.push(new Worm(this));
        else if(randomEnemy == 'ghost') this.enemies.push(new Ghost(this));
        else if(randomEnemy == 'spider') this.enemies.push(new Spider(this));

       /* this.enemies.sort(function(a,b){
            return a.y - b.y;
        });*/
    }
}

class Enemy{
    constructor(game){
        this.game = game;
       this.markedForDelation = false;
    }
    update(){
        this.x -= this.vx * deltaTime;
        if(this.x < 0 - this.width) this.markedForDelation = true;
    }
    draw(ctx){
        ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

class Worm extends Enemy {
    constructor(game){
        super(game);
        this.spriteWidth = 229;
        this.spriteHeight = 171;
        this.width = this.spriteWidth/2;
        this.height =  this.spriteHeight/2;
        this.x = this.game.width;
        this.y = this.game.height - this.height;
        this.imapeege = worm; 
        this.vx = Math.random() * 0.1 + 0.1;      
    }
}

class Ghost extends Enemy {
    constructor(game){
        super(game);
        this.spriteWidth = 261;
        this.spriteHeight = 209;
        this.width = this.spriteWidth/2;
        this.height =  this.spriteHeight/2;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.6;
        this.imapeege = ghost; 
        this.vx = Math.random() * 0.2 + 0.1;   
        this.angle = 0; 
        this.curve = Math.random() * 3;  
    }
    update(deltaTime){
        super.update();
        this.y += Math.sin(this.angle) * this.curve;
        this.angle += 0.04;
    }
    draw(ctx){
        ctx.save();
        ctx.globalAlpha = 0.7;
        super.draw(ctx);
        ctx.restore();
    }
}
class Spider extends Enemy {
    constructor(game){
        super(game);
        this.spriteWidth = 310;
        this.spriteHeight = 175;
        this.width = this.spriteWidth/2;
        this.height =  this.spriteHeight/2;
        this.x = Math.random() * this.game.width;
        this.y = this.game.height - this.height;
        this.imapeege = spider; 
        this.vx = 0; 
        this.vy = Math.random() * 0.1 + 0.1;     
        this.maxLength = Math.random() * this.game.height;
    }
    update(deltaTime){
        super.update(deltaTime);
        this.y += this.vy * deltaTime;
        if(this.y > 200) this.vy *= -1;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(this.x + this.width/2, 0);
        ctx.lineTo(this.x + this.width/2, this.y + 10);
        ctx.stroke();
        super.draw(ctx);
    }
}
const game = new Game(ctx, canvas.width, canvas.height);
let lastTime = 1;
function animate(timeStamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    game.update(deltaTime);
    game.draw();
    //some code
    requestAnimationFrame(animate);
};
animate(0);
});


