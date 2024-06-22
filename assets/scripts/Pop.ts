import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, NodeEventType } from 'cc';
import { MouseHandler } from './MouseHandler';
import { CursorMove } from './CursorMove';
const { ccclass, property } = _decorator;

@ccclass('Pop')
export class Pop extends Component {
    @property
    isMouseDown: boolean = false;
    @property({ type: Node })
    mouseDoer = null;
    protected start(): void {
        let collider = this.getComponent(Collider2D);
        collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);


    }
    private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (this.isMouseDown == true) {
            console.log('Projectile collided with the hitbox');
            otherCollider.node.destroy();

        }
        console.log("prosze.........")
    }
    protected update(dt: number): void {
        if (this.isMouseDown == true) {
            console.log("siur");
        }
        if (this.mouseDoer) {
            this.isMouseDown = this.mouseDoer.getComponent(CursorMove).isLeftDown;

        }
    }
}


