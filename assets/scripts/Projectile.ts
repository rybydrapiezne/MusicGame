import { _decorator, Component, RigidBody2D, BoxCollider2D } from 'cc';
const { ccclass } = _decorator;

@ccclass('Projectile')
export class Projectile extends Component {

    protected onDestroy(): void {
        const rigidBody = this.getComponent(RigidBody2D);
        const boxCollider = this.getComponent(BoxCollider2D);

        // Check if components exist before accessing them
        if (rigidBody && rigidBody.enabled) {
            rigidBody.enabled = false;
        }

        if (boxCollider && boxCollider.enabled) {
            boxCollider.enabled = false;
        }

        // Call super.onDestroy if necessary
        super.onDestroy();
    }
}
