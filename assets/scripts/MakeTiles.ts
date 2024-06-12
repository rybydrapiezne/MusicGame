import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MakeTiles')
export class MakeTiles extends Component {
    @property(Prefab)
    tile: Prefab;
    @property
    interval: number = 5;
    protected start(): void {
        this.schedule(this.spawnTile, this.interval);
    }
    spawnTile() {
        var newTile = instantiate(this.tile);
        newTile.setPosition(0, 0);
        this.node.addChild(newTile);
        //console.log(newTile.position);
    }

}


