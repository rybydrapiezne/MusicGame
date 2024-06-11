import { _decorator, Component, Collider2D, Contact2DType, IPhysics2DContact, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Projectile')
export class Projectile extends Component {
    onLoad() {
        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact) {
        if (otherCollider.node.name === 'Player') {
            console.log('Projectile collided with the player');
            // Handle collision with the player (e.g., reduce player health)
            // Destroy the projectile
            this.node.destroy();
        }
    }
}
