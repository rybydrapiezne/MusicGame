import { _decorator, Animation, Camera, Component, EventGamepad, EventKeyboard, game, input, Input, KeyCode, Node, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('move')
export class move extends Component {
    @property
    moveSpeed: number = 500.0;
    @property(Node)
    camera: Node;


    xspeed: number = 0.0;
    yspeed: number = 0.0;
    isUp: boolean = false;
    isRight: boolean = false;
    isLeft: boolean = false;
    isDown: boolean = false;
    animComp: Animation;
    position: Vec3;
    protected onLoad(): void {
        input.on(Input.EventType.GAMEPAD_INPUT, this.moveGamePad, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        this.isUp = false;
        this.isDown = false;
        this.isRight = false;
        this.isLeft = false;
        this.animComp = this.node.getComponent(Animation);
        //moveDownAnim.play("moveDownAnimation");

    }
    private moveGamePad(event: EventGamepad) {
        const gamepad = event.gamepad;

        if (gamepad.leftStick.getValue().y > 0.1) {
            this.isUp = true;
            this.isDown = false;
            this.animComp.play('animationMoveUpGamepad');

        }
        else if (gamepad.leftStick.getValue().y < -0.1) {
            this.isDown = true;
            this.isUp = false;
            this.animComp.play('animationMoveDownGamepad');

        }
        else {
            this.isUp = false;
            this.isDown = false;
        }
        if (gamepad.leftStick.getValue().x > 0.1) {
            this.isRight = true;
            this.isLeft = false;
            this.animComp.play('animationMoveRightGamepad');

        }
        else if (gamepad.leftStick.getValue().x < -0.1) {
            this.isLeft = true;
            this.isRight = false;
            this.animComp.play('animationMoveLeftGamepad');

        }
        else {
            this.isRight = false;
            this.isLeft = false;
        }
        console.log(gamepad.leftStick.getValue());
        //console.log(gamepad.leftStick.down.getValue());
        // if (gamepad.leftStick.up.getValue() > 0)
        //     this.isUp = true;
        // else
        //     this.isUp = false;
        // if (gamepad.leftStick.down.getValue() > 0) {
        //     //console.log(gamepad.leftStick.down.getValue());
        //     this.isDown = true;
        // }
        // if (gamepad.leftStick.down.getValue() < 1)
        //     this.isDown = false;
        // if (gamepad.leftStick.right.getValue() > 0) {
        //     this.isRight = true;
        // }
        // if (gamepad.leftStick.right.getValue() < 1) {
        //     this.isRight = false;
        // }
    }
    private onKeyUp(event: EventKeyboard) {

    }


    protected update(dt: number): void {
        if (this.isUp) {
            //this.yspeed=0;
            this.yspeed = this.moveSpeed;
        }
        else if (this.isDown) {
            //this.yspeed=0;
            this.yspeed = -this.moveSpeed;
        }
        else
            this.yspeed = 0;
        //console.log(this.yspeed);
        if (this.isRight) {
            //this.xspeed=0;
            this.xspeed = this.moveSpeed;
        }
        else if (this.isLeft) {
            //this.xspeed=0;
            this.xspeed = -this.moveSpeed;
        }
        else
            this.xspeed = 0;
        // if(Math.abs(this.yspeed)>this.maxSpeed)
        //     {
        //         this.yspeed=this.maxSpeed*this.yspeed/Math.abs(this.yspeed);
        //     }
        // if(Math.abs(this.xspeed)>this.maxSpeed)
        //     {
        //         this.xspeed=this.maxSpeed*this.xspeed/Math.abs(this.xspeed);
        //     }
        this.position = new Vec3(this.node.position.x + this.xspeed, this.node.position.y + this.yspeed);
        this.camera.position = new Vec3(this.camera.position.x + this.xspeed, this.position.y + this.yspeed);
        //console.log(this.yspeed);
        if (this.xspeed == 0 && this.yspeed == 0)
            this.animComp.play('animationIdleGamepad');
        this.node.setPosition(this.position);

    }

}


