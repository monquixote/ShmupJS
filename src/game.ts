import Ship from './Ship'
import GameObject from "./GameObject"
import Star from "./Star";
import Enemy from "./Enemy";

const canvas = <HTMLCanvasElement> document.getElementById("myCanvas");
canvas.style.background = 'black';
const ctx = canvas.getContext("2d");

export default class Game {
    ship:Ship = new Ship(canvas);
    enemies:Enemy[] = [];
    stars:Star[] = [];
    private running:boolean = false;
    private score:number = 0;
    private lastTimestamp:number;
    private interval:number;
    private timeFactor:number = 1;

    constructor() {
        this.drawTitle();
        document.addEventListener("keydown", key => {
            if (key.keyCode == 32) {
                if(!this.running) {
                    this.start();
                }
            }
        }, false);
    }

    spawnEnemy() {
        if (Math.random() > 0.95) {
            let enemy = this.enemies.find(enemy => !enemy.isActive());
            if (!enemy) {
                enemy = new Enemy(canvas);
                this.enemies.push(enemy);
            }
            enemy.spawn();
        }
    }

    spawnStar() {
        if (Math.random() > 0.9) {
            let star = this.stars.find(star => !star.isActive())
            if(!star) {
                star = new Star(canvas);
                this.stars.push(star);
            }
            star.spawn();
        }
    }

    calcTime(timestamp) {
        this.interval = timestamp - this.lastTimestamp;
        this.lastTimestamp = timestamp;
        this.timeFactor = this.interval / 16; //Fiddle factor for time
    }

    gameLoop(timestamp) {
        this.calcTime(timestamp);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.stars.forEach(star => {
            star.updatePosition(this.timeFactor);
            star.draw();
        });
        this.spawnStar();
        this.ship.updatePosition(this.timeFactor);
        this.ship.draw();
        this.enemies.forEach((enemy)=> {
            enemy.updatePosition(this.timeFactor);
            enemy.draw();
        });
        this.spawnEnemy();
        this.collisionDetection();
        this.drawScore();
        if (this.running) {
            requestAnimationFrame((timestamp)=> {
                this.gameLoop(timestamp)
            });
        }
    }

    drawScore() {
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "20px sans-serif";
        ctx.fillText(`Score: ${this.score} FPS: ${Math.floor(1000 / this.interval)}`, 10, 25);
    }

    drawTitle() {
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "50px sans-serif";
        ctx.save();
        ctx.fillText(`SPACE UNICORN`, canvas.width / 4 , canvas.height / 2);
        ctx.restore();
    }

    start() {
        this.enemies = [];
        this.stars = [];
        this.score = 0;
        this.running = true;
        this.ship.spawn();

        //Prepopulate starfield
        for (let i = 0; i < 200; i++) {
            this.spawnStar();
            this.stars.forEach((star)=> {
                star.updatePosition(this.timeFactor);
            });
        }
        this.lastTimestamp = performance.now();
        this.gameLoop(performance.now());
    }

    stop() {
        this.running = false;
        this.drawTitle();
    }

    collisionDetection() {
        this.enemies.forEach((enemy)=> {
            if (enemy.isActive()) {
                this.ship.projectiles.forEach((projectile)=> {
                        if (projectile.isActive() && Game.collision(projectile, enemy)) {
                            enemy.destroy();
                            projectile.destroy();
                            this.score++;
                        }
                    }
                );
                if (Game.collision(this.ship, enemy)) {
                    enemy.destroy();
                    this.ship.destroy();
                    this.stop();
                }
            }
        });
    }

    static collision(a:GameObject, b:GameObject) {
        return !!(a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.height + a.y > b.y);
    }
}

const game = new Game();
//game.start();