import GameObject from './GameObject';
export default class Enemy extends GameObject {
    private colour = this.randomColour();
    private speed = Math.random() - 0.5;

    constructor(canvas:HTMLCanvasElement) {
        super(canvas);
        this._width = canvas.width / 15;
        this._height = canvas.height / 20;
    }

    draw() {
        if (this.visible) {
            this.ctx.beginPath();
            this.ctx.rect(this._x, this._y, this.width, this.height);
            this.ctx.fillStyle = this.colour;
            this.ctx.fill();
            this.ctx.closePath();
        }
    }

    spawn() {
        this.active = true;
        this.visible = true;
        this._x = this.canvas.width;
        this._y = this.canvas.height * Math.random();
        this.colour = this.randomColour();
    }

    updatePosition(timeFactor) {
        if (this.active) {
            this._x -= 12 * timeFactor * this.speed;
            if (this._x < 0) {
                this.active = false;
                this.visible = false;
            }
        }
    }
}