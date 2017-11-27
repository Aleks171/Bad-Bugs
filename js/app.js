// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    var rowHeight = 69,
    row = randomRow()*rowHeight;
    console.log(row);
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.location = {
        x: 001,
        y: row
    };
    this.locationYCorrector = 2.1;
    
};

var randomRow = function() {
       var randomRow = Math.floor(Math.random()*3 + 1);
       return randomRow;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.location.x += 1;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.location.x, this.location.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.location = {
        x: 202,
        y: 404
    };
    this.handleInput = function(key) {
        switch (key) {
            case 'up':
                this.location.y = this.location.y - 85;
                break;
            case 'down':
                this.location.y = this.location.y + 85;
                break;
            case 'left':
                this.location.x = this.location.x - 101;
                break;
            case 'right':
                this.location.x = this.location.x + 101;
                break;
        }
    }
}
Player.prototype = Object.create(Enemy.prototype);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemy = new Enemy();
var player = new Player();
allEnemies.push(enemy);
//allEnemies.push(player);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});