import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FlyDown')
export class FlyDown extends Component {
    update(deltaTime: number) {
        this.node.position=new Vec3(this.node.position.x,this.node.position.y-2)
    }
    protected onLoad(): void {
        this.node.position=new Vec3(this.node.position.x,this.node.position.y-2)
    }
}


