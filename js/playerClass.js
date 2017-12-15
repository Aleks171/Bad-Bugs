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
        this.getSprite = function() {
            return this.sprite;
        };
        this.getLocationX = function() {
            return this.location.x;
        };
        this.getLocationY = function() {
            return this.location.y;
        };
        this.getMoveStepX = function() {
            return this.moveStepX;
        };
        this.getMoveStepY = function() {
            return this.moveStepY;
        };
        this.getLimitX = function() {
            return this.limitX;
        };
        this.getLimitY = function() {
            return this.limitY;
        };
        this.resetLocation = function() {
            this.location = {
                x: (this.getLimitX() - this.getMoveStepX())/2,
                y: this.getLimitY() - this.getMoveStepY()/2
            };
        };
        this.addLives = function() {
            for (var i = 0, startPositionX = 354, startPositionY = -15; i < this.initialLivesQuantity; i += 1) {
                var life = new Life(startPositionX, startPositionY, ctx),
                    lifeWidth = life.getWidth()/2;
                this.getLives().push(life);
                startPositionX += lifeWidth;
            }
        };
        this.getLives = function() {
            return this.lives;
        };
        this.removeLife = function() {
            this.getLives().pop();
        };
        this.restoreLives = function() {
            this.addLives();
        };
        this.attachKeysForPlayer = function() {
            this.instantiateInput();
            global.setTimeout(function() {
                global.addEventListener('keyup', function(e) {
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
            }, 3500);
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
                        if ((this.getLocationY() - this.getMoveStepY()) < -this.getMoveStepY()) {
                            break;
                        } else {
                            this.location.y = this.getLocationY() - this.getMoveStepY();
                            break;
                        }
                    case 'down':
                        if ((this.getLocationY() + this.getMoveStepY()) > this.getLimitY()) {
                            break;
                        } else {
                            this.location.y = this.getLocationY() + this.getMoveStepY();
                            break;
                        }
                    case 'left':
                        if ((this.getLocationX() - this.getMoveStepX()) < 0) {
                            break;
                        } else {
                            this.location.x = this.getLocationX() - this.getMoveStepX();
                            break;
                        }
                    case 'right':
                        if ((this.getLocationX() + this.getMoveStepX()) >= this.getLimitX()) {
                            break;
                        } else {
                            this.location.x = this.getLocationX() + this.getMoveStepX();
                            break;
                        }
                }
            };
        };
        this.render = function() {
            this.ctx.drawImage(Resources.get(this.getSprite()), this.getLocationX(), this.getLocationY());
            this.renderLives();

        };
        this.renderLives = function() {
            this.getLives().forEach(function(life) {
                life.render();
            });
        };
        this.isOutOfLives = function() {
            if (this.getLives().length === 0) {
                return true;
            } else {
                return false;
            }
        };
        this.initLives = function() {
            this.addLives();
        };
    };
    app.Player = Player;
    global.App = app;
})(this);