export default class GameObject {
    protected startX:number;
    protected startY:number;
    public x:number;
    public y:number;
    public width:number;
    public height:number;
    protected visible:boolean;
    protected ctx:CanvasRenderingContext2D;
    protected active:boolean = false;

    constructor(protected canvas:HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.initialise();
    }

    spawn(x:number = 0, y:number = 0) {
    }

    isActive() {
        return this.active
    }

    initialise():void {
        this.startX = this.canvas.width / 2;
        this.startY = this.canvas.height / 2;
        this.x = this.startX;
        this.y = this.startY;
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