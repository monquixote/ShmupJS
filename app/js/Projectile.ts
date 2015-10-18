/// <reference path="GameObject.ts" />
class Projectile extends GameObject {
    private colour:string = this.randomColour();
    public static rate:number = 200;
    public static radius = 5;

    constructor(protected canvas:HTMLCanvasElement) {
        super(canvas);
        this.visible = false;
        this.height = Projectile.radius * 2; //used for collision detection
        this.width = Projectile.radius * 2;
    }

    spawn(x, y) {
        this.active = true;
        this.visible = true;
        this.x = x;
        this.y = y;
    }

    draw():void {
        if (this.visible) {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, Projectile.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = this.colour;
            this.ctx.fill();
            this.ctx.closePath();
        }
    }

    updatePosition(timeFactor) {
        if (this.active) {
            this.x += 9 * timeFactor;
        }
        if (this.x > this.canvas.width) {
            this.active = false;
            this.visible = false;
        }
    }
}