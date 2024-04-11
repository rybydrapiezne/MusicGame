import { _decorator, Animation, Component, EventKeyboard, input, Input, KeyCode, Node, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('move')
export class move extends Component {
    @property
    moveSpeed:number = 500.0;
    @property
    maxSpeed:number=500.0

    xspeed:number=0.0;
    yspeed:number=0.0;
    isUp:boolean=false;
    isRight:boolean=false;
    isLeft:boolean=false;
    isDown:boolean=false;
    animComp:Animation;
    position:Vec3; 
     protected onLoad(): void {
        input.on(Input.EventType.KEY_DOWN,this.onKeyDown,this);
        input.on(Input.EventType.KEY_UP,this.onKeyUp,this);
        this.isUp=false;
        this.isDown=false;
        this.isRight=false;
        this.isLeft=false;
        this.animComp=this.node.getComponent(Animation);
        //moveDownAnim.play("moveDownAnimation");
     
    }
    private onKeyDown(event: EventKeyboard)
    {
        switch(event.keyCode){
            case KeyCode.KEY_W:
                this.isUp=true; 
                if(this.animComp)
                    this.animComp.play('animationMoveUp');
                console.log("up");
                break;
            case KeyCode.KEY_S:
                this.isDown=true;
               
                    this.animComp.play('animationMoveDown');
                //console.log(this.animComp.clips.every.name);
                //console.log("up");
                break;
            case KeyCode.KEY_D:
                this.isRight=true;
                if(this.animComp)
                    this.animComp.play('animationMoveRight');
                //console.log("up");
                break;
            case KeyCode.KEY_A:
                this.isLeft=true;
                if(this.animComp)
                    this.animComp.play('animationMoveLeft');
                //console.log("up");
                break;
        }
    }
    private onKeyUp(event: EventKeyboard)
    { 
        //console.log("dupa");
        switch(event.keyCode){
            case KeyCode.KEY_W:
                this.isUp=false;
                //console.log("up");
                break;
            case KeyCode.KEY_S:
                this.isDown=false;
                //console.log("up");
                break;
            case KeyCode.KEY_D:
                this.isRight=false;
                //console.log("up");
                break;
            case KeyCode.KEY_A:
                this.isLeft=false;
                //console.log("up");
                break;
        }
    }
  

    protected update(dt: number): void {
        if(this.isUp){
            //this.yspeed=0;
            this.yspeed=this.moveSpeed;
        }
        else if(this.isDown){
            //this.yspeed=0;
            this.yspeed=-this.moveSpeed;
        }
        else
            this.yspeed=0;
        //console.log(this.yspeed);
        if(this.isRight){
            //this.xspeed=0;
            this.xspeed=this.moveSpeed;
        }
        else if(this.isLeft){
            //this.xspeed=0;
            this.xspeed=-this.moveSpeed;
        }
        else
            this.xspeed=0;
        // if(Math.abs(this.yspeed)>this.maxSpeed)
        //     {
        //         this.yspeed=this.maxSpeed*this.yspeed/Math.abs(this.yspeed);
        //     }
        // if(Math.abs(this.xspeed)>this.maxSpeed)
        //     {
        //         this.xspeed=this.maxSpeed*this.xspeed/Math.abs(this.xspeed);
        //     }
        this.position=new Vec3(this.node.position.x+this.xspeed,this.node.position.y+this.yspeed);
        //console.log(this.yspeed);
        if(this.xspeed==0 && this.yspeed==0)
            this.animComp.play('animationIdle');
        this.node.setPosition(this.position);
        
    }
    
}


