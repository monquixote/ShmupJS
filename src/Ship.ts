import GameObject from "./GameObject";
import Projectile from "./Projectile";
import {PlayerInput, KeyInput} from "./Input";

export default class Ship extends GameObject {
   
    private input:PlayerInput = new KeyInput();
    public projectiles:Projectile[] = [];
    private lastShot:number = 0;
    private static baseSpeed:number = 7;
    private img;

    constructor(canvas:HTMLCanvasElement) {
        super(canvas);
        this._width = canvas.width / 10;
        this._height = canvas.height / 15;
        this.startX = this.width;
        this.startY = this.canvas.height / 2;
        this.img = document.getElementById("uni");
        this.spawn();
    }

    spawn() {
        this._x = this.startX;
        this._y = this.startY;
        this.visible = true;
    }

    draw():void {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.drawImage(this.img, this._x, this._y, this.width, this.height);
        this.ctx.closePath();
        this.projectiles.forEach((projectile)=> {
            projectile.draw()
        });
    }

    updatePosition(timeFactor) {
        let speed = Ship.baseSpeed * timeFactor;
        if (this.input.right && this._x < this.canvas.width - this.width) {
            this._x += speed;
        }
        else if (this.input.left && this._x > 0) {
            this._x -= speed;
        }
        if (this.input.down && this._y < this.canvas.height - this.height) {
            this._y += speed;
        }
        else if (this.input.up && this._y > 0) {
            this._y -= speed;
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
        let proj = this.projectiles.find( proj => !proj.isActive()) 
        if(! proj) {
            proj = new Projectile(this.canvas);
            this.projectiles.push(proj);
        }
        proj.setLocation(this._x + this.width, this._y + (this.height / 2));
        proj.spawn();
    }
}