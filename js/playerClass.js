(function(global) {
    var app = global.App || {};
    var Player = function(limitX, limitY, moveStepX, moveStepY, Life, ctx) {
        var that = this;
        this.ctx = ctx;
        this.sprite;
        this.playerWidth = 81;
        this.limitX = limitX;
        this.limitY = limitY;
        this.moveStepX = moveStepX;
        this.moveStepY = moveStepY;
        this.location = {
            x: (this.limitX - this.moveStepX)/2,
            y: this.limitY - moveStepY/2
        };
        this.initialLivesQuantity = 3;
        this.lives = [];
        this.setSprite = function(src) {
            this.sprite = src;
        };
        this.getLocationX = function() {
            return this.location.x;
        };
        this.getLocationY = function() {
            return this.location.y;
        };
        this.resetLocation = function() {
            this.location = {
                x: (this.limitX - this.moveStepX)/2,
                y: this.limitY - moveStepY/2
            };
        };
        this.addLives = function() {
            for (var i = 0, startPositionX = 354, startPositionY = -15; i < this.initialLivesQuantity; i += 1) {
                var life = new Life(startPositionX, startPositionY, ctx),
                    lifeWidth = life.getWidth()/2;
                this.lives.push(life);
                startPositionX += lifeWidth;
            }
        };
        this.removeLife = function() {
            this.lives.pop();
        };
        this.restoreLives = function() {
            this.addLives();
        };
        this.attachKeysForPlayer = function() {
            this.instantiateInput();
            global.setTimeout(function() {
                document.addEventListener('keyup', function(e) {
                    var allowedKeys = {
                        37: 'left',
                        38: 'up',
                        39: 'right',
                        40: 'down'
                    };
                    if (that.handleInput) {
                       that.handleInput(allowedKeys[e.keyCode]); 
                    }
                });
            }, 4000);
        };
        this.holdInput = function() {
            this.handleInput = null;
            global.setTimeout(function() {
                that.instantiateInput();
            }, 1000);
        };
        this.instantiateInput = function() {
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
        };
        this.render = function() {
            this.ctx.drawImage(Resources.get(this.sprite), this.location.x, this.location.y);
            this.renderLives();

        };
        this.renderLives = function() {
            this.lives.forEach(function(life) {
                life.render();
            });
        };
        this.isOutOfLives = function() {
            if (this.lives.length === 0) {
                return true;
            } else {
                return false;
            }
        };
    };
    app.Player = Player;
    global.App = app;
})(this);