import { _decorator, Component, EventMouse, Node, NodeEventType, Prefab } from 'cc';
import { Pop } from './Pop';
const { ccclass, property } = _decorator;

@ccclass('MouseHandler')
export class MouseHandler extends Component {
    @property
    isDown: boolean = false;
    start() {
        this.node.on(NodeEventType.MOUSE_DOWN, (event) => {
            if (event == EventMouse.BUTTON_LEFT)
                this.isDown = true;
        });
        this.node.on(NodeEventType.MOUSE_UP, (event) => {
            if (event == EventMouse.BUTTON_LEFT)
                this.isDown = true;
        });
    }

}


