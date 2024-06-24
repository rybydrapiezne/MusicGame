import { _decorator, Component, input, Input, EventGamepad, Label, Node, Prefab, instantiate, Vec3, RigidBody2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GamepadButtonChallenge')
export class GamepadButtonChallenge extends Component {
    @property(Label)
    labelA: Label = null;
    @property(Label)
    labelB: Label = null;
    @property(Label)
    labelX: Label = null;
    @property(Label)
    labelY: Label = null;

    @property(Node)
    buttonsContainer: Node = null; // Parent node containing all labels

    @property(Prefab)
    note: Prefab = null;

    @property(Node)
    shootingPoint: Node = null;

    @property(Node)
    gamepadCursor: Node = null; // Node representing the gamepad cursor

    @property
    bulletSpeed: number = 20;

    private currentButton: string = '';
    private buttonTimeout: any;
    private showButtonInterval: any;
    private canBeShot: boolean = false;

    protected onLoad(): void {
        input.on(Input.EventType.GAMEPAD_INPUT, this.onGamepadInput, this);

        // Initially hide all buttons
        this.hideAllButtons();

        // Start the button show interval
        this.showButtonInterval = setInterval(() => {
            this.showRandomButton();
        }, 3000);
    }

    private onGamepadInput(event: EventGamepad) {
        const gamepad = event.gamepad;
        if (!this.currentButton) return;

        if (this.currentButton === 'A' && gamepad.buttonSouth.getValue() > 0) {
            this.onCorrectButtonClick();
        } else if (this.currentButton === 'B' && gamepad.buttonEast.getValue() > 0) {
            this.onCorrectButtonClick();
        } else if (this.currentButton === 'X' && gamepad.buttonWest.getValue() > 0) {
            this.onCorrectButtonClick();
        } else if (this.currentButton === 'Y' && gamepad.buttonNorth.getValue() > 0) {
            this.onCorrectButtonClick();
        }
    }

    private hideAllButtons() {
        this.labelA.node.active = false;
        this.labelB.node.active = false;
        this.labelX.node.active = false;
        this.labelY.node.active = false;
        this.currentButton = '';
    }

    private showRandomButton() {
        this.hideAllButtons();

        const buttons = ['A', 'B', 'X', 'Y'];
        const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
        this.currentButton = randomButton;

        switch (randomButton) {
            case 'A':
                this.labelA.node.active = true;
                break;
            case 'B':
                this.labelB.node.active = true;
                break;
            case 'X':
                this.labelX.node.active = true;
                break;
            case 'Y':
                this.labelY.node.active = true;
                break;
        }

        // Set a timeout for 2 seconds to hide the button
        this.buttonTimeout = setTimeout(() => {
            this.hideAllButtons();
        }, 2000);
    }

    private onCorrectButtonClick() {
        console.log(`${this.currentButton} button clicked correctly!`);
        clearTimeout(this.buttonTimeout);
        this.hideAllButtons();
        this.canBeShot = true;
        this.shoot();
    }

    private shoot() {
        if (!this.note || !this.shootingPoint || !this.gamepadCursor || !this.canBeShot) return;

        console.log("Shooting...");
        const projectile = instantiate(this.note);
        if (!projectile) {
            console.error("Failed to instantiate the bullet prefab.");
            return;
        }

        projectile.setParent(this.node.parent);
        projectile.setPosition(this.shootingPoint.getPosition());

        const crosshairPos = this.gamepadCursor.getPosition();
        const playerPos = this.shootingPoint.getPosition();
        const direction = new Vec3(crosshairPos.x - playerPos.x, crosshairPos.y - playerPos.y);
        direction.normalize();

        console.log(`Bullet direction: ${direction.x}, ${direction.y}`);

        const rigidbody = projectile.getComponent(RigidBody2D);
        if (rigidbody) {
            rigidbody.linearVelocity = new Vec2(direction.x * this.bulletSpeed, direction.y * this.bulletSpeed);
            console.log(`Bullet velocity: ${rigidbody.linearVelocity.x}, ${rigidbody.linearVelocity.y}`);
        } else {
            console.error("Projectile does not have a RigidBody2D component");
        }

        this.canBeShot = false;
    }

    protected onDestroy(): void {
        clearInterval(this.showButtonInterval);
        clearTimeout(this.buttonTimeout);
    }
}
