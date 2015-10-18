/// <reference path="GameObject.ts" />
/// <reference path="game.ts" />
/// <reference path="input.ts" />
/// <reference path="Projectile.ts" />
class Ship extends GameObject {
    private input:PlayerInput = new KeyInput();
    public projectiles:Projectile[] = [];
    private lastShot:number = 0;
    private static baseSpeed:number = 7;
    private img;

    constructor(canvas:HTMLCanvasElement) {
        super(canvas);
        this.width = canvas.width / 10;
        this.height = canvas.height / 15;
        this.img = document.getElementById("uni");

    }

    draw():void {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        this.ctx.closePath();
        this.projectiles.forEach((projectile)=> {
            projectile.draw()
        });
    }

    updatePosition(timeFactor) {
        let speed = Ship.baseSpeed * timeFactor;
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
        this.projectiles.forEach((projectile)=> {
            projectile.updatePosition(timeFactor)
        });
    }

    fireNextProjectile() {
        for (var i = 0; i < this.projectiles.length; i++) {
            if (!this.projectiles[i].isActive()) {
                this.projectiles[i].spawn(this.x + this.width, this.y + (this.height / 2));
                return;
            }
        }
        let newProj = new Projectile(this.canvas);
        newProj.spawn(this.x + this.width, this.y + (this.height / 2));
        this.projectiles.push(newProj);
    }
}