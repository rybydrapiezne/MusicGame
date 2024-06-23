import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GetHit')
export class GetHit extends Component {
    onLoad() {
        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact) {
        if (otherCollider.node.name === 'Projectile') {
            console.log('Projectile collided with the player');
            // Handle collision with the player (e.g., reduce player health)
            // Destroy the projectile
            setTimeout(() => {
                otherCollider.node.destroy();
            }, 5);


        }
    }

}


