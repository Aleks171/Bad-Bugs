(function(global) {
    var app = global.App || {};
    var Player = function(limitX, limitY, moveStepX, moveStepY) {
        var that = this;
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
        this.resetLocation = function() {
            this.location = {
                x: (this.limitX - this.playerWidth)/2,
                y: this.limitY - moveStepY/2
            };
        };
        this.init = function() {
            // Key press listener for the player
            document.addEventListener('keyup', function(e) {
            var allowedKeys = {
                37: 'left',
                38: 'up',
                39: 'right',
                40: 'down'
            };

            that.handleInput(allowedKeys[e.keyCode]);
            });
        };
        this.render = function() {
            ctx.drawImage(Resources.get(this.sprite), this.location.x, this.location.y);
        };
    };
    app.Player = Player;
    global.App = app;
})(this);