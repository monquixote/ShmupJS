import GameObject from "./GameObject.js";
export default class Projectile extends GameObject {
    private colour:string = this.randomColour();
    public static rate:number = 200;
    public static radius = 5;

    constructor(protected canvas:HTMLCanvasElement) {
        super(canvas);
        this.visible = false;
        this._height = Projectile.radius * 2; //used for collision detection
        this._width = Projectile.radius * 2;
    }

    spawn(x, y) {
        this.active = true;
        this.visible = true;
        this._x = x;
        this._y = y;
    }

    draw():void {
        if (this.visible) {
            this.ctx.beginPath();
            this.ctx.arc(this._x, this._y, Projectile.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = this.colour;
            this.ctx.fill();
            this.ctx.closePath();
        }
    }

    updatePosition(timeFactor) {
        if (this.active) {
            this._x += 9 * timeFactor;
        }
        if (this._x > this.canvas.width) {
            this.active = false;
            this.visible = false;
        }
    }
}