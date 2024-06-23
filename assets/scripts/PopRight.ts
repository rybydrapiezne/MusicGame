import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node } from 'cc';
import { CursorMove } from './CursorMove';
const { ccclass, property } = _decorator;

@ccclass('PopRight')
export class PopRight extends Component {
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
            setTimeout(() => {
                otherCollider.node.destroy();
            }, 5);

        }

    }
    protected update(dt: number): void {
        if (this.mouseDoer) {
            this.isMouseDown = this.mouseDoer.getComponent(CursorMove).isRightDown;

        }
    }
}


