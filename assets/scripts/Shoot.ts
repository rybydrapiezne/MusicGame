import { _decorator, Component, instantiate, Node, Prefab, RigidBody2D, Vec2, Vec3 } from 'cc';
import { Pop } from './Pop';
import { PopRight } from './PopRight';
const { ccclass, property } = _decorator;

@ccclass('Shoot')
export class Shoot extends Component {
    @property({ type: Prefab })
    note = null;
    @property
    canBeShot: boolean = false;
    @property({ type: Node })
    crosshair = null;
    @property({ type: Node })
    leftPop = null;
    @property({ type: Node })
    rightPop = null;
    protected lateUpdate(dt: number): void {
        if (this.leftPop) {
            this.canBeShot = this.leftPop.getComponent(Pop).canBeShot;
        }
        if (this.rightPop && !this.canBeShot) {
            this.canBeShot = this.rightPop.getComponent(PopRight).canBeShot;
        }
    }
    update(deltaTime: number) {

        if (this.canBeShot == true) { this.shot(); }
    }
    private shot() {
        this.canBeShot = false;
        this.leftPop.getComponent(Pop).canBeShot = false;
        this.rightPop.getComponent(PopRight).canBeShot = false;
        if (!this.note || !this.crosshair)
            return;
        const projectile = instantiate(this.note);
        projectile.setParent(this.node.parent);
        projectile.setPosition(this.node.getPosition());

        const crosshairPos = this.crosshair.getPosition();
        const playerPos = this.node.getPosition();
        const direction = new Vec3(crosshairPos.x - playerPos.x, crosshairPos.y - playerPos.y);
        direction.normalize();

        const speed = 20;
        const rigidbody = projectile.getComponent(RigidBody2D);
        if (rigidbody) {
            rigidbody.linearVelocity = new Vec2(direction.x * speed, direction.y * speed);
        }



    }
}


