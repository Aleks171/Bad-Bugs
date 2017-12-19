(function(global) {
    var app = global.App || {};
    var Resources = app.utils.Resources;

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
            x: (this.limitX % 2 === 0) ? this.limitX/2 : this.limitX/2 - this.moveStepX/2,
            y: this.limitY - this.moveStepY/2
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
                x: (this.limitX % 2 === 0) ? this.limitX/2 : this.limitX/2 - this.moveStepX/2,
                y: this.limitY - this.moveStepY/2
            };
        };
        this.addLives = function() {
            for (var i = 0, startPositionX = this.getLimitX() - this.getLimitX()/3, startPositionY = -15; i < this.initialLivesQuantity; i += 1) {
                var life = new Life(startPositionX, startPositionY, ctx),
                    lifeWidth = life.getSpriteWidth()/2;
                this.getLives().push(life);
                startPositionX += lifeWidth;
            }
            this.currentAmountOfLives = this.initialLivesQuantity;
        };
        this.getLives = function() {
            return this.lives;
        };
        this.getCurrentAmountOfLives = function() {
            return this.currentAmountOfLives;
        };
        this.removeLife = function() {
            this.getLives().pop();
            this.currentAmountOfLives -= 1;
        };
        this.attachKeysForPlayer = function() {
            this.instantiateInput();
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
        };
        this.holdInput = function(time) {
            this.handleInput = null;
            global.setTimeout(function() {
                that.instantiateInput();
            }, time);
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
            if (this.getCurrentAmountOfLives() < 0) {
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