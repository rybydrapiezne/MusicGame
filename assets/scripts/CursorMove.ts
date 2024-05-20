import { _decorator, Animation, Camera, Component, EventKeyboard, EventMouse, input, Input, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CursorMove')
export class CursorMove extends Component {
    camera: Camera;
    protected onLoad(): void {
        input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
        this.camera = this.findCamera();
        this.hideCursor();
    }
    private hideCursor() {
        document.body.style.cursor = 'none';
    }
    findCamera(): Camera {
        // Traverse the parent nodes to find the Camera component
        let parentNode = this.node.parent;
        while (parentNode) {
            let camera = parentNode.getComponent(Camera);
            if (camera) {
                return camera;
            }
            parentNode = parentNode.parent;
        }
        return null; // Return null if no Camera component is found
    }
    protected update(dt: number): void {

    }
    private onMouseMove(event: EventMouse) {
        this.setPos(event.getLocation())
    }
    setPos(touchPos: Vec2) {
        let pos = this.camera.screenToWorld(new Vec3(touchPos.x, touchPos.y, 0.5))
        this.node.setWorldPosition(pos)
    }
}
