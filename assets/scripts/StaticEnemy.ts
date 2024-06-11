import { _decorator, Component, Node, Prefab, instantiate, Vec3, Vec2, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StaticEnemy')
export class StaticEnemy extends Component {
    @property(Prefab)
    projectilePrefab: Prefab = null;

    @property(Node)
    player: Node = null;

    @property
    fireRate: number = 2.0; // Time in seconds between shots

    private timeSinceLastShot: number = 0;

    protected update(dt: number): void {
        this.timeSinceLastShot += dt;

        if (this.timeSinceLastShot >= this.fireRate) {
            this.shootProjectile();
            this.timeSinceLastShot = 0;
        }
    }

    private shootProjectile() {
        if (!this.projectilePrefab || !this.player) {
            return;
        }

        // Instantiate the projectile
        const projectile = instantiate(this.projectilePrefab);
        projectile.setParent(this.node.parent); // Add projectile to the same parent node

        // Set the initial position of the projectile
        projectile.setPosition(this.node.getPosition());

        // Calculate the direction to the player
        const playerPos = this.player.getPosition();
        const enemyPos = this.node.getPosition();
        const direction = new Vec3(playerPos.x - enemyPos.x, playerPos.y - enemyPos.y);
        direction.normalize();

        // Set the velocity of the projectile
        const speed = 20; // Adjust this value as needed
        const rigidbody = projectile.getComponent(RigidBody2D) as RigidBody2D;
        if (rigidbody) {
            rigidbody.linearVelocity = new Vec2(direction.x * speed, direction.y * speed);
        }
    }
}