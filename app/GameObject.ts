export default class GameObject {
    protected startX:number;
    protected startY:number;
    protected _x:number;
    protected _y:number;
    protected _width:number;
    protected _height:number;
    protected visible:boolean;
    protected ctx:CanvasRenderingContext2D;
    protected active:boolean = false;

    constructor(protected canvas:HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.initialise();
    }

    public get x() {
        return this._x;
    }

    public get y() {
        return this._y;
    }

    public get width() {
        return this._width;
    }

    public get height() {
        return this._height;
    }

    spawn(x:number = 0, y:number = 0) {
    }

    isActive() {
        return this.active
    }

    initialise():void {
        this.startX = this.canvas.width / 2;
        this.startY = this.canvas.height / 2;
        this._x = this.startX;
        this._y = this.startY;
        this.visible = true;
    }

    draw():void {
    }

    updatePosition(timeFactor:number):void {
    }

    destroy():void {
        this.active = false;
        this.visible = false;
    }

    randomColour():string {
        return '#' + (function co(lor) {
                return (lor +=
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 15 + 1)])
                && (lor.length == 6) ? lor : co(lor);
            })('');
    }
}