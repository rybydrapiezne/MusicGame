import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { Pop } from './Pop';
const { ccclass, property } = _decorator;

@ccclass('MakeTiles')
export class MakeTiles extends Component {
    @property(Prefab)
    tile: Prefab;
    // @property(Node)
    // mouseDoer: Node;
    @property
    interval: number = 5;
    protected start(): void {
        this.schedule(this.spawnTile, this.interval);
    }
    spawnTile() {
        var newTile = instantiate(this.tile);
        //newTile.getComponent(Pop).mouseDoer = this.mouseDoer;
        newTile.setPosition(0, 0);
        this.node.addChild(newTile);
        //console.log(newTile.position);
    }

}


