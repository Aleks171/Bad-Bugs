// Enemies our player must avoid
var Enemy = function(positionY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    var bugWidth = 110;
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.location = {
        x: -bugWidth,
        y: positionY
    };
    this.speed = speed;
    this.getBugWidth = function() {
        return bugWidth;
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.location.x += this.speed;
};
Enemy.prototype.checkCollision = function(player) {
    if ((player.location.x >= (this.location.x - this.getBugWidth()/2)) && 
        (player.location.x <= (this.location.x + this.getBugWidth()/2)) &&
        player.location.y === this.location.y) {
        return true;
    } else {
        return false;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.location.x, this.location.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(limitX, limitY, moveStepX, moveStepY) {
    this.sprite = 'images/char-boy.png';
    this.playerWidth = 101;
    this.limitX = limitX;
    this.limitY = limitY;
    this.moveStepX = moveStepX;
    this.moveStepY = moveStepY;
    this.location = {
        x: (this.limitX - this.playerWidth)/2,
        y: this.limitY - moveStepY/2
    };
    this.handleInput = function(key) {
        switch (key) {
            case 'up':
                if ((this.location.y - this.moveStepY) < -this.moveStepY) {
                    break;
                } else {
                    this.location.y = this.location.y - this.moveStepY;
                    break;
                }
            case 'down':
                if ((this.location.y + this.moveStepY) > this.limitY) {
                    break;
                } else {
                    this.location.y = this.location.y + this.moveStepY;
                    break;
                }
            case 'left':
                if ((this.location.x - this.moveStepX) < 0) {
                    break;
                } else {
                    this.location.x = this.location.x - this.moveStepX;
                    break;
                }
            case 'right':
                if ((this.location.x + this.moveStepX) >= this.limitX) {
                    break;
                } else {
                    this.location.x = this.location.x + this.moveStepX;
                    break;
                }
        }
    };
    this.getLocationX = function() {
        return this.location.x;
    };
    this.getLocationY = function() {
        return this.location.y;
    };
}
Player.prototype = Object.create(Enemy.prototype);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemy = new Enemy();



allEnemies.push(enemy);
//allEnemies.push(player);


