import { _decorator, Camera, Component, EventGamepad, input, Input, Node, Vec2, Vec3, game } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GamepadCursorMove')
export class GamepadCursorMove extends Component {
    @property
    cursorSpeed: number = 500.0;

    @property(Node)
    cameraNode: Node;

    private camera: Camera = null;

    protected onLoad(): void {
        input.on(Input.EventType.GAMEPAD_INPUT, this.onGamepadInput, this);
        this.camera = this.findCamera();
        this.hideCursor();
    }

    private hideCursor() {
        document.body.style.cursor = 'default';  // Ensures the default cursor is visible for the main cursor
    }

    findCamera(): Camera {
        if (this.cameraNode) {
            return this.cameraNode.getComponent(Camera);
        }
        return null;
    }

    private onGamepadInput(event: EventGamepad) {
        const gamepad = event.gamepad;
        const rightStick = gamepad.rightStick.getValue();

        if (Math.abs(rightStick.x) > 0.1 || Math.abs(rightStick.y) > 0.1) {
            this.moveCursor(rightStick, game.deltaTime);
        }
    }

    moveCursor(stickValue: Vec2, dt: number) {
        const deltaX = stickValue.x * this.cursorSpeed * dt;
        const deltaY = stickValue.y * this.cursorSpeed * dt;

        let currentPos = this.node.getWorldPosition();
        let newPos = new Vec3(currentPos.x + deltaX, currentPos.y + deltaY, currentPos.z);

        this.node.setWorldPosition(newPos);
    }
}
