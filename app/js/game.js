var GameObject = (function () {
    function GameObject(canvas) {
        this.canvas = canvas;
        this.active = false;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.initialise();
    }
    GameObject.prototype.spawn = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
    };
    GameObject.prototype.isActive = function () {
        return this.active;
    };
    GameObject.prototype.initialise = function () {
        this.startX = this.canvas.width / 2;
        this.startY = this.canvas.height / 2;
        this.x = this.startX;
        this.y = this.startY;
        this.visible = true;
    };
    GameObject.prototype.draw = function () {
    };
    GameObject.prototype.updatePosition = function (timeFactor) {
    };
    GameObject.prototype.destroy = function () {
        this.active = false;
        this.visible = false;
    };
    GameObject.prototype.randomColour = function () {
        return '#' + (function co(lor) {
            return (lor +=
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 15 + 1)])
                && (lor.length == 6) ? lor : co(lor);
        })('');
    };
    return GameObject;
})();
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PlayerInput = (function () {
    function PlayerInput() {
        this.right = false;
        this.left = false;
        this.up = false;
        this.down = false;
        this.fire = false;
    }
    return PlayerInput;
})();
var KeyInput = (function (_super) {
    __extends(KeyInput, _super);
    function KeyInput() {
        _super.call(this);
        this.rightKey = 39;
        this.leftKey = 37;
        this.upKey = 38;
        this.downKey = 40;
        this.fireKey = 32;
        document.addEventListener("keydown", this.keyHandler.bind(this, true), false);
        document.addEventListener("keyup", this.keyHandler.bind(this, false), false);
    }
    KeyInput.prototype.keyHandler = function (keydown, e) {
        if (e.keyCode == this.leftKey) {
            this.left = keydown;
        }
        else if (e.keyCode == this.upKey) {
            this.up = keydown;
        }
        if (e.keyCode == this.rightKey) {
            this.right = keydown;
        }
        else if (e.keyCode == this.downKey) {
            this.down = keydown;
        }
        if (e.keyCode == this.fireKey) {
            this.fire = keydown;
        }
    };
    return KeyInput;
})(PlayerInput);
/// <reference path="GameObject.ts" />
var Projectile = (function (_super) {
    __extends(Projectile, _super);
    function Projectile(canvas) {
        _super.call(this, canvas);
        this.canvas = canvas;
        this.colour = this.randomColour();
        this.visible = false;
        this.height = Projectile.radius * 2; //used for collision detection
        this.width = Projectile.radius * 2;
    }
    Projectile.prototype.spawn = function (x, y) {
        this.active = true;
        this.visible = true;
        this.x = x;
        this.y = y;
    };
    Projectile.prototype.draw = function () {
        if (this.visible) {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, Projectile.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = this.colour;
            this.ctx.fill();
            this.ctx.closePath();
        }
    };
    Projectile.prototype.updatePosition = function (timeFactor) {
        if (this.active) {
            this.x += 9 * timeFactor;
        }
        if (this.x > this.canvas.width) {
            this.active = false;
            this.visible = false;
        }
    };
    Projectile.rate = 200;
    Projectile.radius = 5;
    return Projectile;
})(GameObject);
/// <reference path="GameObject.ts" />
/// <reference path="game.ts" />
/// <reference path="input.ts" />
/// <reference path="Projectile.ts" />
var Ship = (function (_super) {
    __extends(Ship, _super);
    function Ship(canvas) {
        _super.call(this, canvas);
        this.input = new KeyInput();
        this.projectiles = [];
        this.lastShot = 0;
        this.width = canvas.width / 10;
        this.height = canvas.height / 15;
        this.img = document.getElementById("uni");
    }
    Ship.prototype.draw = function () {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        this.ctx.closePath();
        this.projectiles.forEach(function (projectile) {
            projectile.draw();
        });
    };
    Ship.prototype.updatePosition = function (timeFactor) {
        var speed = Ship.baseSpeed * timeFactor;
        if (this.input.right && this.x < this.canvas.width - this.width) {
            this.x += speed;
        }
        else if (this.input.left && this.x > 0) {
            this.x -= speed;
        }
        if (this.input.down && this.y < this.canvas.height - this.height) {
            this.y += speed;
        }
        else if (this.input.up && this.y > 0) {
            this.y -= speed;
        }
        if (this.input.fire && this.lastShot + Projectile.rate < Date.now()) {
            this.fireNextProjectile();
            this.lastShot = Date.now();
        }
        this.projectiles.forEach(function (projectile) {
            projectile.updatePosition(timeFactor);
        });
    };
    Ship.prototype.fireNextProjectile = function () {
        for (var i = 0; i < this.projectiles.length; i++) {
            if (!this.projectiles[i].isActive()) {
                this.projectiles[i].spawn(this.x + this.width, this.y + (this.height / 2));
                return;
            }
        }
        var newProj = new Projectile(this.canvas);
        newProj.spawn(this.x + this.width, this.y + (this.height / 2));
        this.projectiles.push(newProj);
    };
    Ship.baseSpeed = 7;
    return Ship;
})(GameObject);
/// <reference path="GameObject.ts" />
var Star = (function (_super) {
    __extends(Star, _super);
    function Star() {
        _super.apply(this, arguments);
    }
    Star.prototype.spawn = function () {
        this.active = true;
        this.visible = true;
        this.x = this.canvas.width;
        this.y = this.canvas.height * Math.random();
        var size = Math.floor(Math.random() * 5);
        this.height = size + 3;
        this.width = size + 3;
        this.speed = size + 1;
    };
    Star.prototype.updatePosition = function (timeFactor) {
        if (this.active) {
            this.x -= this.speed * timeFactor;
        }
        if (this.x < 0) {
            this.active = false;
            this.visible = false;
        }
    };
    Star.prototype.draw = function () {
        if (this.visible) {
            this.ctx.beginPath();
            this.ctx.fillStyle = "'#ffffff'";
            this.ctx.rect(this.x, this.y, this.width, this.height);
            this.ctx.fill();
            this.ctx.closePath();
        }
    };
    return Star;
})(GameObject);
/// <reference path="GameObject.ts" />
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(canvas) {
        _super.call(this, canvas);
        this.colour = this.randomColour();
        this.width = canvas.width / 15;
        this.height = canvas.height / 20;
    }
    Enemy.prototype.draw = function () {
        if (this.visible) {
            this.ctx.beginPath();
            this.ctx.rect(this.x, this.y, this.width, this.height);
            this.ctx.fillStyle = this.colour;
            this.ctx.fill();
            this.ctx.closePath();
        }
    };
    Enemy.prototype.spawn = function () {
        this.active = true;
        this.visible = true;
        this.x = canvas.width;
        this.y = canvas.height * Math.random();
        this.colour = this.randomColour();
    };
    Enemy.prototype.updatePosition = function (timeFactor) {
        if (this.active) {
            this.x -= 7 * timeFactor;
            if (this.x < 0) {
                this.active = false;
                this.visible = false;
            }
        }
    };
    return Enemy;
})(GameObject);
/// <reference path="GameObject.ts" />
/// <reference path="Ship.ts" />
/// <reference path="Star.ts" />
/// <reference path="Enemy.ts" />
var canvas = document.getElementById("myCanvas");
canvas.style.background = 'black';
var ctx = canvas.getContext("2d");
var Game = (function () {
    function Game() {
        var _this = this;
        this.ship = new Ship(canvas);
        this.enemies = [];
        this.stars = [];
        this.running = false;
        this.score = 0;
        this.timeFactor = 1;
        document.addEventListener("keydown", function (key) {
            if (key.keyCode == 49) {
                _this.start();
            }
        }, false);
    }
    Game.prototype.spawnEnemy = function () {
        if (Math.random() * 100 > 95) {
            var enemy;
            for (var i = 0; i < this.enemies.length; i++) {
                if (!this.enemies[i].isActive()) {
                    enemy = this.enemies[i];
                    break;
                }
            }
            if (!enemy) {
                enemy = new Enemy(canvas);
                this.enemies.push(enemy);
            }
            enemy.spawn();
        }
    };
    Game.prototype.spawnStar = function () {
        if (Math.random() * 100 > 90) {
            var star;
            for (var i = 0; i < this.stars.length; i++) {
                if (!this.stars[i].isActive()) {
                    star = this.stars[i];
                    break;
                }
            }
            if (!star) {
                star = new Star(canvas);
                this.stars.push(star);
            }
            star.spawn();
        }
    };
    Game.prototype.calcTime = function (timestamp) {
        this.interval = timestamp - this.lastTimestamp;
        this.lastTimestamp = timestamp;
        this.timeFactor = this.interval / 16; //Fiddle factor for time
    };
    Game.prototype.gameLoop = function (timestamp) {
        var _this = this;
        this.calcTime(timestamp);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.stars.forEach(function (star) {
            star.updatePosition(_this.timeFactor);
            star.draw();
        });
        this.spawnStar();
        this.ship.updatePosition(this.timeFactor);
        this.ship.draw();
        this.enemies.forEach(function (enemy) {
            enemy.updatePosition(_this.timeFactor);
            enemy.draw();
        });
        this.spawnEnemy();
        this.collisionDetection();
        this.drawScore();
        if (this.running) {
            requestAnimationFrame(function (timestamp) {
                _this.gameLoop(timestamp);
            });
        }
    };
    Game.prototype.drawScore = function () {
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "20px sans-serif";
        ctx.fillText("Score: " + this.score + " FPS: " + Math.floor(1000 / this.interval), 10, 25);
    };
    Game.prototype.start = function () {
        var _this = this;
        this.running = true;
        //Prepopulate starfield
        for (var i = 0; i < 200; i++) {
            this.spawnStar();
            this.stars.forEach(function (star) {
                star.updatePosition(_this.timeFactor);
            });
        }
        this.lastTimestamp = performance.now();
        this.gameLoop(performance.now());
    };
    Game.prototype.stop = function () {
        this.running = false;
    };
    Game.prototype.collisionDetection = function () {
        var _this = this;
        this.enemies.forEach(function (enemy) {
            if (enemy.isActive()) {
                _this.ship.projectiles.forEach(function (projectile) {
                    if (projectile.isActive() && Game.collision(projectile, enemy)) {
                        enemy.destroy();
                        projectile.destroy();
                        _this.score++;
                    }
                });
                if (Game.collision(_this.ship, enemy)) {
                    enemy.destroy();
                    _this.ship.destroy();
                    _this.stop();
                }
            }
        });
    };
    Game.collision = function (a, b) {
        return !!(a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.height + a.y > b.y);
    };
    return Game;
})();
var game = new Game();
game.start();
//# sourceMappingURL=game.js.map