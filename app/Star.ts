import GameObject from "./GameObject.js";
export default class Star extends GameObject {
    private speed:number;

    spawn() {
        this.active = true;
        this.visible = true;
        this.x = this.canvas.width;
        this.y = this.canvas.height * Math.random();
        let size = Math.floor(Math.random() * 5);
        this.height = size + 3;
        this.width = size + 3;
        this.speed = size + 1;
    }

    updatePosition(timeFactor) {
        if (this.active) {
            this.x -= this.speed * timeFactor;
        }
        if (this.x < 0) {
            this.active = false;
            this.visible = false;
        }
    }

    draw() {
        if (this.visible) {
            this.ctx.beginPath();
            this.ctx.fillStyle = "'#ffffff'";
            this.ctx.rect(this.x, this.y, this.width, this.height);
            this.ctx.fill();
            this.ctx.closePath();
        }
    }
}