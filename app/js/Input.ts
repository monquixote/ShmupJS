class PlayerInput {
    public right:boolean = false;
    public left:boolean = false;
    public up:boolean = false;
    public down:boolean = false;
    public fire:boolean = false;
}

class KeyInput extends PlayerInput {
    private rightKey:number = 39;
    private leftKey:number = 37;
    private upKey:number = 38;
    private downKey:number = 40;
    private fireKey:number = 32;

    constructor() {
        super();
        document.addEventListener("keydown", this.keyHandler.bind(this, true), false);
        document.addEventListener("keyup", this.keyHandler.bind(this, false), false);
    }

    keyHandler(keydown:boolean, e) {
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
    }
}