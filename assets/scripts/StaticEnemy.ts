import { _decorator, Component, Node, Prefab, instantiate, Vec3, Vec2, RigidBody2D, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StaticEnemy')
export class StaticEnemy extends Component {
    @property(Prefab)
    projectilePrefab: Prefab = null;

    @property([Node])
    players: Node[] = [];

    @property
    fireRate: number = 2.0; // Time in seconds between shots

    private timeSinceLastShot: number = 0;

    onLoad() {
        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    protected update(dt: number): void {
        this.timeSinceLastShot += dt;

        if (this.timeSinceLastShot >= this.fireRate) {
            this.shootProjectiles();
            this.timeSinceLastShot = 0;
        }
    }

    private shootProjectiles() {
        if (!this.projectilePrefab || this.players.length === 0) {
            return;
        }

        for (const player of this.players) {
            // Instantiate the projectile
            const projectile = instantiate(this.projectilePrefab);
            projectile.setParent(this.node.parent); // Add projectile to the same parent node

            // Set the initial position of the projectile
            projectile.setPosition(this.node.getPosition());

            // Calculate the direction to the player
            const playerPos = player.getPosition();
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

    private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact) {
        if (otherCollider.node.name === 'Note') {
            console.log('Projectile collided with the monster');
            // Handle collision with the player (e.g., reduce player health)
            // Destroy the projectile
            setTimeout(() => {
                otherCollider.node.destroy();
            }, 5);
        }
    }
}
