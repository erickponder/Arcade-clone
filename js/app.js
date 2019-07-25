let game = true;

var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.height = 65;
    this.width = 95;
    this.collision = false;
};

Enemy.prototype.update = function(dt) {
    //Where to start enemy
    if (this.x > ctx.canvas.width + this.width ) {
        this.x = -200 * Math.floor(Math.random() * 4) + 1;
    } else {
        this.x += 150 * dt;
    }
    
    //COLLISION
    if (collision(player.x, player.y, player.width, player.height, this.x, this.y, this.width, this.height)){
        this.collision = true;
        
        if(player) {
            player.x = 202;
            player.y = 400;
        }
    } else {
        this.collision = false;
    }
    
};


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//PLAYER DATA
var Player = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.height = 75;
    this.width = 65;
};

Player.prototype.update = function() {
    if (game && player.y == -15) {
        game = false;
        won();
        
    }
    console.log(player.y)
};

Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


Player.prototype.handleInput = function(direction) {
    const horizontal = 101,
          vertical = 83;
    
    if (direction === 'left' && this.x - horizontal >= 0) {
        this.x -= horizontal;
    } else if (direction === 'right' && this.x + horizontal < ctx.canvas.width) {
        this.x += horizontal;
    } else if (direction === 'down' && this.y + vertical < ctx.canvas.height -200 ) {
        this.y += vertical;
    } else if (direction === 'up' && this.y >= 0) {
        this.y -= vertical;
    }
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


const enemyPosition = [55, 140, 230]

//Set player starting position and character image
let player = new Player(202, 400, 'images/char-cat-girl.png');
let allEnemies = enemyPosition.map((y, index) => {
    return new Enemy((-200 * (index + 1)), y);
});

//What to do when finished with game
function won() {
    reset();
    setTimeout(function() {alert('You have won the game!!'); }, 10);
}

function reset(){
    allEnemies = [];
    
}


//COLLISION
function collision(px, py, pw, ph, ex, ey, ew, eh){
    return (Math.abs(px - ex)* 2 < pw + ew) && (Math.abs(py-ey) * 2 < ph + eh)
}
